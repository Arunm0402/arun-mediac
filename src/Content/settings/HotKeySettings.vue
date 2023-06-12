<template>
  <div>
    <h6 class="q-ma-none q-pa-sm text-center bg-rabbit-purple text-white">
      Edit Hot Keys
    </h6>
    <div id="hotkeySetup" class="q-pa-lg">
      <template v-for="(item, key) in temporaryHotkey" :key="key">
        <q-item dense class="q-mb-md">
          <q-item-section>
            <div class="row items-center no-wrap justify-between">
              <span class="col-4">{{ item[1].name }}:</span>
              <q-input
                type="text"
                dense
                outlined
                class="col-8 bg-grey-2"
                placeholder="item.name"
                v-model="item[1].keyDisplay"
                @keydown="
                  (e) => {
                    recordPress(e, item[0])
                  }
                "
              />
            </div>
            <small
              class="text-red text-right"
              v-if="hotkeyConflicted(item[1].keyDisplay)"
              >Hot key conflicted.</small
            >
          </q-item-section>
        </q-item>
      </template>

      <div class="row no-wrap justify-between q-mt-lg">
        <q-btn
          class="text-grey-7 q-pa-none q-mr-lg col-4"
          label="Cancel"
          no-caps
          flat
          @click="cancelSaveHotkeys"
        />
        <q-btn
          @click="saveHotkeys"
          class="bg-rabbit-purple text-white col-4"
          label="Save Hot Keys"
          no-caps
        />
        <div class="col-4"></div>
      </div>
    </div>
    <div id="hotkeys">
      <!-- {{ temporaryHotkey }} -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import { hotkeysController } from 'src/services/hotkeys/hotkeysController'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { hotkey } from 'src/services/userConfig/userConfigTypes'

export default defineComponent({
  setup(_, { emit }) {
    const {
      eventToArray,
      eventToString,
      pauseHotkeys,
      resumeHotkeys,
      initHotkeys
    } = hotkeysController()
    const { updateHotkeys, hotKeyConfig } = userConfigService()
    // new map creates a shallow copy of original for us. Still work if update is not called apparently. we can update to deep copy if needed
    const temporaryHotkey = reactive(new Map<string,hotkey>(JSON.parse(JSON.stringify(Array.from(hotKeyConfig)))) )

    onMounted(() => {
      // When making changes to settings we pause the hotkeys
      initHotkeys()
      pauseHotkeys()
    })
    onBeforeUnmount(() => {
      // Unpause hotkeys
      resumeHotkeys()
    })
    const saveHotkeys = () => {
      console.log('savehotkeys')
      updateHotkeys(temporaryHotkey)
      emit('close')
    }

    const cancelSaveHotkeys = () => {
      /**
       * TODO: Need a function to cancel the hot key change, currently it auto updated
       */
      console.log('cancel hot keys')
      emit('close')
    }

    /**
     * item[0] keyname, item[1] proxy to mapped hotkey
     */
    const recordPress = (e: Event, key: string) => {
      e.preventDefault()
      const recorded = eventToArray(e)
      let tempkeys: hotkey = temporaryHotkey.get(key) as hotkey // have to put this if not possible undefined ts error
      if (tempkeys) {
        console.log('set keys')
        tempkeys.keys = recorded
        tempkeys.hotkeyString = eventToString(e)
        tempkeys.keyDisplay = tempkeys.hotkeyString.toUpperCase()
        temporaryHotkey.set(key, tempkeys)
      }
      console.log(temporaryHotkey.get(key))
    }

    const hotkeyConflicted = (newKey: string) => {
      let count = 0
      temporaryHotkey.forEach((currentKey) => {
        newKey.toLowerCase() === currentKey.hotkeyString ? (count += 1) : null
      })
      return count >= 2
    }

    return {
      hotKeyConfig,
      temporaryHotkey,
      hotkeyConflicted,
      saveHotkeys,
      cancelSaveHotkeys,
      recordPress
    }
  }
})
</script>
