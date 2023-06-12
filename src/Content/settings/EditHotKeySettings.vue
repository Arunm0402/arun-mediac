<template>
  <div class="fit">
    <!-- 
    SubtitleUserConfigEditContainer been used to adjust the layout.
    Please refer to comments in SubtitleUserConfigEditContainer.vue for more detail
   -->
    <SubtitleUserConfigEditContainer>
      <template #fields>
        <div>
          <div id="hotkeySetup" class="column no-wrap">
            <div>
              <div v-for="(item, key) in temporaryHotkey" :key="key">
                <q-item dense class="q-mb-sm">
                  <q-item-section>
                    <div class="row items-center justify-between">
                      <span class="col-12 col-sm-4">{{ item[1].name }}:</span>
                      <q-input
                        type="text"
                        dense
                        outlined
                        class="col-12 col-sm-8"
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
              </div>
            </div>

            <div class="row no-wrap justify-between q-mt-lg">
              <div class="col-4"></div>
            </div>
          </div></div
      ></template>
      <template #buttons>
        <div class="full-width row justify-center">
          <div>
            <q-btn
              @click="saveHotkeys"
              size="md"
              class="bg-rabbit-purple text-white"
              label="Save Hot Keys"
              no-caps
            />
          </div>
        </div>
      </template>
    </SubtitleUserConfigEditContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { hotkeysController } from 'src/services/hotkeys/hotkeysController'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { hotkey } from 'src/services/userConfig/userConfigTypes'
import { useQuasar } from 'quasar'

import SubtitleUserConfigEditContainer from 'src/components/subtitle-user-config/SubtitleUserConfigEditContainer.vue'

export default defineComponent({
  components: { SubtitleUserConfigEditContainer },
  setup() {
    const {
      eventToArray,
      eventToString,
      pauseHotkeys,
      resumeHotkeys,
      initHotkeys
    } = hotkeysController()
    const { updateHotkeys, hotKeyConfig } = userConfigService()
    // new map creates a shallow copy of original for us. Still work if update is not called apparently. we can update to deep copy if needed
    // const temporaryHotkey = reactive(new Map<string,hotkey>(JSON.parse(JSON.stringify(hotKeyConfig))))
    const $q = useQuasar()
    function showNotify() {
      $q.notify({
        message: 'Congifuration saved successfully.',
        position: 'center',
        color: 'green-6',
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
              /* ... */
            }
          }
        ]
      })
    }

    const temporaryHotkey = hotKeyConfig

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
      showNotify()
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
      recordPress
    }
  }
})
</script>
