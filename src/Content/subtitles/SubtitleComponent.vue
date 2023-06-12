<template>
<FilterUnit :dark="dark" @searchSubtitle="searchSubtitle($event)" />
  <div class="q-pa-none">
  <q-virtual-scroll
      id="subtitle-scroll"
      class="scroll s-editor-body"
      :class="{'bg-grey-9': dark}"
      style="height: calc(100vh - 285px);"
      :items-size="subtitlesSearchQuery.length"
      :items-fn="getSnippets"
      :virtual-scroll-item-size="110"
      scroll-target="#subtitle-scroll"
      ref="subtitles"
    >
      <template v-slot="{ item, index }">
        <q-item :key="item.cueId" dense class="q-pa-none">
            <q-item-section v-if="item.cueId" class="q-pa-none q-ma-none no-wrap">
                 <SubtitleEditingUnit
                :start_time="item?.start_time"
                :end_time="item?.end_time"
                :subtitle_data="item?.subtitle_data"
                :subtitle="item"
                :index="index"
                :cueId="item.cueId"
                :is_active="is_active"
                @subtitleEdit="subsUpdated($event)"
                @focused="resetHotkeyFocus($event)"
                @closeAll="close_all($event)"
                :dark="dark"
              />
            </q-item-section>
          </q-item>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, onBeforeUnmount, ref} from 'vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { subtitle, subsMessage, filter_data } from 'src/services/subtitles/subtitleTypes'
import SubtitleEditingUnit from './SubtitleEditingUnit.vue'
import { subtitleUnitInterface } from 'src/services/video/types'
import { hotkeysController } from 'src/services/hotkeys/hotkeysController'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { VideoController } from 'src/services/video/videoController'
import FilterUnit from './FilterUnit.vue'

const autoSaveTimeout = 30000
export default defineComponent({
  name: 'SubtitleComponent',
  components: {
    SubtitleEditingUnit,
    FilterUnit
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    dark: { type: Boolean,  required: true }
  },
  setup(props , { emit }) {
    const { seekFrom } = VideoController()
    const { modifySubtitle, filterSubtitle, subtitles, subtitlesSearchQuery, setAutoSave, stopAutoSave } = subtitleController()
    // Added these 2 for hotkeys
    // TODO: refactor them for replay hotkey
    const { activateHotkey, initHotkeys, removeHotkey } = hotkeysController()
    const { hotKeyConfig } = userConfigService()
    const segments = reactive({
      snippetsList: <subtitle[]>[]
    })

    const is_active = ref(0)

    onMounted(() => {
      console.log('On Mounted Setting Auto Save')
      void filterSubtitle()
      setAutoSave(autoSaveTimeout)
      initHotkeys()
    })

    onBeforeUnmount(() => {
      stopAutoSave()
    })

    const searchSubtitle = (formData: filter_data) => {
      void filterSubtitle(formData)
    }

    const getSnippets = (from: number, size: number) => {
      if (subtitlesSearchQuery.value.length === 0) {
        console.log('There is literally nothieng to load')
        return
      }
      const end = from + size < subtitlesSearchQuery.value.length ? from + size : subtitlesSearchQuery.value.length

      segments.snippetsList = subtitlesSearchQuery.value.slice(from, end)
      return Object.freeze(segments.snippetsList)
    }

    const subsUpdated = (data: subsMessage) => {
      void modifySubtitle(data, data.cueId as string, true)
    }

    const resetHotkeyFocus = (data: subtitleUnitInterface) => {
      const replay=hotKeyConfig.get('replay') // had to assign in not getting object possibly undefined TS error
      if (replay) {
        removeHotkey('replay')
        activateHotkey('replay', () => {
          seekFrom(data)
        })
      }
    }
    const close_all = (index: number) => {
      is_active.value = index
    }

    return {
      emit,
      is_active,
      close_all,
      subtitles,
      modifySubtitle,
      getSnippets,
      subsUpdated,
      resetHotkeyFocus,
      searchSubtitle,
      subtitlesSearchQuery,
    }
  }
})
</script>
