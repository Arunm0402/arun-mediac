<template>
  <div class="q-pa-none">
    <q-virtual-scroll
        :scroll-target="`#scroll-area-with-virtual-scroll-${indexCount} > .scroll`"
        class="scroll s-editor-body"
        :class="{'bg-grey-9': isDark}"
        :items-size="indexCount == 1 ? subtitlesSearchQuery.length : slidePanelSubtitles.length"
        :items-fn="getSnippets"
        separator
      >
        <template v-slot="{ item, index }">
          <q-item v-if="item.aid && item.subtitle_id" :key="item.subtitle_id" dense class="q-pa-none">
              <q-item-section class="q-pa-none q-ma-none no-wrap">
                  <SlideSubtitleEditingUnit
                  :start_time="item?.start_time"
                  :end_time="item?.end_time"
                  :subtitle_data="item?.subtitle_data"
                  :subtitle="item"
                  :subtitle_id="item.subtitle_id"
                  :index="index"
                  :text_id="item?.text_id"
                  :lid="item.lid"
                  :aid="item.aid"
                  @subtitleEdit="subsUpdated($event, item.text_id)"
                  @focused="resetHotkeyFocus($event)"
                  :dark="isDark"
                  :indexCount="indexCount"
                />
              </q-item-section>
            </q-item>
        </template>
      </q-virtual-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, onBeforeUnmount} from 'vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { subtitle, subsMessage } from 'src/services/subtitles/subtitleTypes'
import SlideSubtitleEditingUnit from './SlideSubtitleEditingUnit.vue'
import { subtitleUnitInterface } from 'src/services/video/types'
import { hotkeysController } from 'src/services/hotkeys/hotkeysController'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { VideoController } from 'src/services/video/videoController'
import { translationScroll } from 'src/services/translate/translationScroll'
import { translateController } from 'src/services/translate/translateController'
import { modeConfigController } from 'src/services/userSettings/modeConfigController';

const autoSaveTimeout = 30000
export default defineComponent({
  name: 'SubtitleTranslationComponent',
  components: {
    SlideSubtitleEditingUnit,
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    indexCount: { type: Number,  required: true },
    dark: { type: Boolean,  required: true }
  },
  setup(props , { emit }) {
    const { seekFrom } = VideoController()
    const { modifySubtitle, subtitles, setAutoSave, stopAutoSave, setPanel } = subtitleController()
    const {   subtitlesSearchQuery, slidePanelSubtitles } = translateController()
    // Added these 2 for hotkeys
    // TODO: refactor them for replay hotkey
    const { activateHotkey, initHotkeys, removeHotkey } = hotkeysController()
    const { isDark } = modeConfigController()
    const { hotKeyConfig } = userConfigService()
    const { isSlideToggle } = translationScroll()
    const panelItems = ref<subtitle[]>([])
    const segments = reactive({
      snippetsList: <subtitle[]>[]
    })

     onMounted(() => {
      console.log('On Mounted Setting Auto Save')
      setAutoSave(autoSaveTimeout)
      initHotkeys()
    })
    onBeforeUnmount(() => {
      stopAutoSave()
    })

    const getSnippets = (from: number, size: number) => {
      const item = props.indexCount == 1 ?  subtitlesSearchQuery.value : slidePanelSubtitles.value
      if (item.length === 0) {
        console.log('There is literally nothing to load')
        return
      }
      const end = from + size < item.length ? from + size : item.length

      segments.snippetsList = item.slice(from, end)

      return Object.freeze(segments.snippetsList)

    }

    const subsUpdated = (data: subsMessage, text_id: string) => {
      void setPanel(props.indexCount)
      console.log('data: ', data)
      console.log('text_id: ', text_id)
      void modifySubtitle(data, text_id, true)
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



    return {
      emit,
      subtitles,
      modifySubtitle,
      getSnippets,
      subsUpdated,
      resetHotkeyFocus,
      subtitlesSearchQuery,
      slidePanelSubtitles,
      isDark,
      isSlideToggle,
      panelItems
    }
  }
})
</script>
