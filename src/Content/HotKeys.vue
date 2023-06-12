<template>
  <div>
    <div
      v-for="(key, idx) in hotKeyConfig"
      :key="idx"
      class="row no-wrap items-center q-mb-sm"
    >
      <span
        class="
          col-3
          n-hotkey-container
          row
          items-center
          justify-center
          text-rabbit-purple-4
          bg-grey-1
          q-mr-lg
        "
        ><small>{{ key[1].keyDisplay }}</small></span
      >
      <span class="col-7">{{ key[1].description }}</span>
    </div>
    <div class="row justify-center q-pa-md">
      <q-btn
        flat
        label="Edit Hotkeys"
        icon="mdi-keyboard-settings-outline"
        class="bg-rabbit-purple-6 text-white"
        no-caps
        @click="() => (showHotKeySettings = true)"
      />
      <q-dialog v-model="showHotKeySettings" persistent>
        <HotKeySettings
          class="bg-white full-width"
          @close="() => (showHotKeySettings = false)"
        />
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import HotKeySettings from 'src/components/Content/settings/HotKeySettings.vue'

export default defineComponent({
  components: { HotKeySettings },
  setup() {
    const { updateHotkeys, hotKeyConfig } = userConfigService()
    const showHotKeySettings = ref(false)
    const temporaryHotkey = reactive(hotKeyConfig)
    // const editing = ref(false)
    const saveHotkeys = () => {
      console.log('savehotkeys')
      updateHotkeys(temporaryHotkey)
    }

    return { hotKeyConfig, saveHotkeys, showHotKeySettings }
  }
})
</script>

<style scoped>
.n-hotkey-container {
  display: flex;
  border: 1px solid lightgrey;
  height: 2rem;
  border-radius: 8px;
  line-break: anywhere;
}
</style>
