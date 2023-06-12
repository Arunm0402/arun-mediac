<template>
  <div class="q-pr-sm q-py-sm relative-position "
    :class="[
    `equalHeight${subtitle_id}`,
    ((selectedCuId == subtitle_id) && dark) ? 'bg-grey-8' : '',
    !dark ? 'n-subtitle-editing-unit' : '',
    !text_id ? 'blankItem' : ''
    ]">
    <!-- <div>
      {{ subtitle_id }} // text_id:  {{ text_id }} / aid: {{ aid }}
    </div> -->
    <div v-if="text_id">
    <div class="transfer__arrow" v-if="(selectedCuId == subtitle_id) && indexCount == 1 && !isSlideToggle">
      <q-btn color="grey-5" text-color="black" icon="mdi-transfer-right" size="xs" @click="shareTranslate('send')" />
      <br/>
      <q-btn color="grey-4" text-color="black" icon="mdi-transfer-left" size="xs" @click="shareTranslate('receive')" />
    </div>
    <div class="row justify-center n-top-controls" :class="{'n-subtitle-utility-controls': !dark}" v-if="selectedCuId == subtitle_id">
      <div class="col-md-2">
      </div>
      <div class="col-md-6 text-center">
         <SmallRoundedButton
            label="Merge Above"
            icon="mdi-arrow-collapse-up"
            @click.prevent="mergeSubtitleRow(text_id, 'above')"
          />
          <SmallRoundedButton
            label="New Line Above"
            icon="mdi-plus-circle-outline"
            @click.prevent="addSubtitleRow(text_id, vid, 'above')"
          />
      </div>
      <div class="col-md-4 text-center">
         <slot name="split">
          <q-btn color="grey-6" icon="mdi-arrow-split-horizontal" @click.prevent="addSubtitleRow(text_id, vid, 'split')" size="sm" class="text-capitalize" label="Split Line"/>
        </slot>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div  class="col-md-3">
        <div class="row">
          <div class="column justify-center s-border-right q-ml-sm q-mr-sm">
            <q-btn
              v-if="showPlayBtn"
              icon="mdi-motion-play-outline"
              style="height: 100%; margin: 0"
              class="cursor-pointer text-rabbit-purple-5 q-px-xs"
              flat
              size="md"
              @click="handleBtn(start_time, end_time, subtitle.subtitle_id)"
            />
            <q-btn
              v-else
              icon="mdi-motion-pause-outline"
              style="height: 100%; margin: 0"
              class="cursor-pointer text-rabbit-purple-5 q-px-xs"
              flat
              size="md"
              @click="handlePause()"
            />
          </div>
          <div class="column col-grow q-ml-sm q-mr-sm" v-if="selectedCuId == subtitle_id">
            <TimeAdjustmentUnit
              timeStampType="startTime"
              :timeStamp="start_time"
              :cueId="text_id"
              @subtitleTimeInput="changeTime('start_time', $event)"
              :dark="dark"
              :indexCount="indexCount"
            />
            <TimeAdjustmentUnit
              timeStampType="endTime"
              :timeStamp="end_time"
              :cueId="text_id"
              @subtitleTimeInput="changeTime('end_time', $event)"
              :dark="dark"
              :indexCount="indexCount"
            />
          </div>
          <div v-else class="column col-grow  q-ml-sm q-mr-sm my-card-click" @click="toggleCard">
              <q-chip outline square color="grey-6" text-color="white" :label="ms_start_time" size="sm" class="block"></q-chip>
              <q-chip outline square color="grey-6" text-color="white" :label="ms_end_time" size="sm" class="block"></q-chip>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <q-card :dark="dark" class="my-card-click" @click="toggleCard" flat bordered v-if="selectedCuId != subtitle_id">
          <q-card-section >
            <!-- {{ subtitle_data.length > limit ? subtitle_data.substring(0, limit) + '...' :  subtitle_data}} -->
            {{ subtitle_data }}
          </q-card-section>
        </q-card>
        <q-card v-else :dark="dark" class="my-card" flat bordered>
          <q-card-section>
            <SubtitleTextEditUnit
                :subtitleText="subtitle_data"
                class="col-grow self-center"
                @subtitleTextInput="change('subtitle_data', $event)"
                @focused="focused(start_time, end_time, text_id)"
              />
          </q-card-section>
          <q-separator :dark="dark"></q-separator>
          <q-card-actions>
            <SubtitleStatusUnit
                :start-time="start_time"
                :end-time="end_time"
                :subtitleText="subtitle_data"
                class="n-subtitle-status-unit"
              />
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-md-1 text-center col-vertical-middle">
        <q-icon
            color="red"
            size="xs"
            label="Basic Menu"
            name="mdi-trash-can-outline"
            class="vertical-middle cursor-pointer"
            @click="deleteText(text_id, lid)"
          />
          <q-icon color="red" v-if="isAlert" name="mdi-alert-circle-outline q-ml-sm" class="q-mr-xs" >
            <q-tooltip>
              <p v-if="track_alert && track_alert.cpl" class="q-pa-none q-mb-sm">
                CPL: Characters per line exceeded limitation
              </p>
              <p v-if="track_alert && track_alert.cps" class="q-pa-none q-mt-sm q-mb-none">
                CPS: Characters per second exceeded limitation
              </p>
            </q-tooltip>
          </q-icon>
      </div>
    </div>
    <div style="min-height:30px">
    <div
      class="row n-subtitle-utility-controls n-bottom-controls q-mt-sm"
      v-if="selectedCuId == subtitle_id"
      >
      <div class="col-md-4">
      </div>
      <div class="col-md-6 text-center">
        <SmallRoundedButton
        label="Merge Below"
          icon="mdi-arrow-collapse-down"
          class="n-merge-below"
          @click.prevent="mergeSubtitleRow(text_id, 'below')"
        />
        <SmallRoundedButton
          label="New Line Below"
          icon="mdi-plus-circle-outline"
          @click.prevent="addSubtitleRow(text_id, vid, 'below')"
        />
      </div>
    </div>
  </div>
  </div>
    <div class="speakerList">
      <!-- <SpeakerList /> -->
    </div>
  </div>
  <q-separator dark />
</template>

<script lang="ts">
import TimeAdjustmentUnit from './TimeAdjustmentUnit.vue'
import SubtitleTextEditUnit from './SubtitleTextEditUnit.vue'
import SmallRoundedButton from 'src/components/UI/Buttons/SmallRoundedButton.vue'
import SubtitleStatusUnit from './SubtitleStatusUnit.vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { subtitle, directionType } from 'src/services/subtitles/subtitleTypes'
import { defineComponent, computed, ref, watch, onMounted } from '@vue/runtime-core'
import { VideoSegmentService } from 'src/services/video/videoSegmentService'
import { videoService } from 'src/services/video/videoService'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { VideoController } from 'src/services/video/videoController'
import timelineController from 'src/services/timeline/timelineController'
import { alerts } from 'src/services/timeline/timelineTypes'
import { translateController } from 'src/services/translate/translateController'
import { translationScroll } from 'src/services/translate/translationScroll'
// import SpeakerList from 'src/components/Content/subtitles/SpeakerList.vue'

export default defineComponent({
  components: {
    TimeAdjustmentUnit,
    SubtitleTextEditUnit,
    SmallRoundedButton,
    SubtitleStatusUnit,
    // SpeakerList
  },
  emits: ['subtitleEdit', 'focused', 'closeAll'],
  props: {
    subtitle: { type: Object as () => subtitle, required: true },
    index: { type: Number, required: true },
    text_id: { type: String, required: true },
    aid: { type: String, required: true },
    lid: { type: String, required: true },
    subtitle_id: { type: String, required: true },
    start_time: { type: Number, default: 0 },
    end_time: { type: Number, default: 0 },
    subtitle_data: { type: String, default: '' },
    position: { type: Number },
    dark: { type: Boolean,  required: true },
    indexCount: { type: Number,  required: true }
  },
  setup(props, { emit }) {
    const {
      addRow,
      mergeRow,
      setPanel,
      deleteSubtitle,
      deleteVideoSubtitle,
      getPanel
    } = subtitleController()

    const { activeArtifact } = artifactController()
    const { seekFrom } = VideoController()
    const { getSegmentCueId, getIsSegmentPlaying } = VideoSegmentService()
    const { getUserPaused , updateUserPaused } = videoService()
    const { secondsTohhmmss, trackAlert } = timelineController()
    const { selectedCuId, toggleBox, subtitleShareTranslate, equalHeight } = translateController()
    const { isSlideToggle } = translationScroll()
    const track_alert = ref<alerts | null>();
    const limit = 100
    const text_subtitle_data = ref<string>(props.subtitle_data)
    const handle_end_time = ref<number | null>();


    onMounted(() => {
      void setPanel(props.indexCount)
      void equalHeight(props.subtitle_id)
    })

    const change = (key: string, data:Event) => {
      void setPanel(props.indexCount)
      emit('subtitleEdit', { [key]: data })
    }
    const changeTime = (key: string, data:Record<string,number>) => {
      void setPanel(props.indexCount)
      emit('subtitleEdit', { [key]: data })
    }
    const showPlayBtn = ref(true)

    const handleBtn = (start_time: number, end_time: number, subtitle_id: string) => {
      console.log(start_time, end_time, subtitle_id, 'start_time, end_time, subtitle_id----');
      handle_end_time.value = end_time
      seekFrom({start_time, end_time, subtitle_id: subtitle_id})
    }
    const handlePause = () => {
      updateUserPaused(true)
    }
    const focused = (start_time: number, end_time: number, text_id: string) => {
      emit('focused', { start_time, end_time, text_id })
    }

    const deleteText = async (text_id: string, lid: string) => {
      void setPanel(props.indexCount)
      text_subtitle_data.value = ''
      void equalHeight(props.subtitle_id)
      if(text_id == ''){
        await deleteVideoSubtitle(props.subtitle_id)
      }else{
        await deleteSubtitle(text_id, lid, true)
      }

    }

    const addSubtitleRow = async (currentCueId: string, vid: string, direction : directionType) => {
      void setPanel(props.indexCount)
      await addRow(currentCueId, vid, direction, true)
    }

    const mergeSubtitleRow = async (text_id: string, direction : directionType) => {
      void setPanel(props.indexCount)
      await mergeRow(text_id, direction)
    }

  watch(() => props.subtitle_data, (newValue) => {
      text_subtitle_data.value = newValue
    });


    // watch(props.subtitle_data, (first, second) => {
    //   console.log(
    //     'args',
    //     first,
    //     second
    //   );
    //   // Both props are undefined so its just a bare callback func to be run
    // });

    // watch(is_active, (newValue) => {
    //   if(newValue != props.index){
    //     activeItem.value = false
    //     openTextBox.value = false;
    //   }
    // })

    watch (
      () => [ getSegmentCueId.value, getUserPaused.value, getIsSegmentPlaying.value ],
      ([ segmentId, userPaused, isSegmentPlaying ]) => {
        // console.log(segmentId, userPaused, props.subtitle_id, isSegmentPlaying, 'segmentId, userPaused, props.subtitle_id, isSegmentPlaying-----');
        if (userPaused || segmentId === '') {
          showPlayBtn.value = true
        } else if (segmentId === props.subtitle_id && isSegmentPlaying) {
          // @TODO - to hover/focus the segment when it is playing
          showPlayBtn.value = false
        } else {
          showPlayBtn.value = true
        }
      }
    )

    const toggleCard = () => {
      void equalHeight(props.subtitle_id, true)
      toggleBox(props.subtitle_id)
      void equalHeight(props.subtitle_id)
    }

    const trimmedText = computed(() =>
      props.subtitle_data.trim().replace(/\s+/g, ' ')
    )

    const duration = computed(
      () =>
        Math.round(
          ((props.end_time - props.start_time) + Number.EPSILON) * 100
        ) / 100
    )

    const computedCPS = computed(() =>
      trimmedText.value !== ''
        ? Math.round(trimmedText.value.length / duration.value)
        : 0
    )

    const computedCPL = computed(() => {
      const comparer = (prevLineLength: number, nextLineLength: number) =>
        Math.max(prevLineLength, nextLineLength)
      return props.subtitle_data
        .split(/\n/g)
        .map((line) => line.length)
        .reduce(comparer)
    })


  const isAlert = computed(() => {
      track_alert.value = trackAlert(props.subtitle_data, props.start_time, props.end_time);
      return (track_alert.value.cpl == true || track_alert.value.cps == true);
    })

    const shareTranslate = (_type: string) => {
      void subtitleShareTranslate(_type, props.text_id)
    }


    return {
      emit,
      change,
      changeTime,
      addSubtitleRow,
      addRow,
      mergeSubtitleRow,
      deleteSubtitle,
      handleBtn,
      showPlayBtn,
      handlePause,
      focused,
      vid: computed(() => activeArtifact.value.aid),
      ms_start_time: computed(() => secondsTohhmmss(props.start_time)),
      ms_end_time: computed(() => secondsTohhmmss(props.end_time)),
      toggleCard,
      selectedCuId,
      isAlert,
      computedCPL,
      computedCPS,
      track_alert,
      limit,
      isSlideToggle,
      shareTranslate,
      text_subtitle_data,
      deleteText,
      getPanel
    }
  },
})
</script>

<style lang="scss" scoped>
.s-border-right {
  border-right: 1px solid rgba(255, 255, 255, 0.28);
  border-collapse: collapse !important;
}
.col-vertical-middle{
  line-height: 50px;
}
.my-card-click{
  cursor: pointer;
}
.n-subtitle-editing-unit {
  border-radius: 0.5rem;
  margin: 0.15rem 0px;
  transition: all 0.75s ease;
  background-color: hsl(260, 10%, 98%);
}

.n-subtitle-editing-unit:focus-within,
.n-subtitle-editing-unit:hover {
  border-color: hsl(260, 20%, 50%);
  // background-color: #fcfbf5;
}

// .n-subtitle-utility-controls,
// .n-subtitle-status-unit {
//   height: 0px;
//   transition: height 0.3s ease;
//   opacity: 0;
//   z-index: 9999;
// }


.n-top-controls {
  top: -0.95rem;
}
.n-bottom-controls {
  bottom: -0.95rem;
}
.q-item:first-child .n-top-controls {
  // Align top controls with the upper border outline
  top: -0.75rem;
}
.q-item:last-child .n-bottom-controls {
  // Align bottom controls with the below border outline
  bottom: -0.75rem;
}
.q-item:first-child .n-top-controls .n-merge-above {
  // Hide "Merge above" option for first row
  display: none;
}
.q-item:last-child .n-bottom-controls .n-merge-below {
  // Hide "Merge below" option for the last row
  display: none;
}
.transfer__arrow{
  position: absolute;
  z-index: 999;
  top: 50%;
  right: 0;
  transform: translate(-25%, -49%);
}
.equalHeight{
  min-height: 100px;
}
.speakerList{
  position: absolute;
  width: 150px;
  left: 25% !important;
  bottom: 0px;
}
</style>
