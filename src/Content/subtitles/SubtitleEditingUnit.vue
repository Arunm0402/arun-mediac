<template>
  <div class="q-pr-sm q-py-sm relative-position" :class="{'bg-grey-8': activeItem && dark, 'n-subtitle-editing-unit': !dark}">
    <div class="row justify-center n-top-controls" :class="{'n-subtitle-utility-controls': !dark}" v-if="openTextBox">
      <div class="col-md-2">
      </div>
      <div class="col-md-6 text-center">
         <SmallRoundedButton
            label="Merge Above"
            icon="mdi-arrow-collapse-up"
            @click.prevent="mergeRow(cueId, 'above')"
          />
          <SmallRoundedButton
            label="New Line Above"
            icon="mdi-plus-circle-outline"
            @click.prevent="addRow(cueId, vid, 'above', true)"
          />
      </div>
      <div class="col-md-4 text-center">
         <slot name="split">
          <q-btn
            color="grey-6"
            icon="mdi-arrow-split-horizontal"
            @click.prevent="addRow(cueId, vid, 'split', true)"
            size="sm"
            class="text-capitalize"
            label="Split Line"
          />
        </slot>
      </div>
    </div>
    <div class="row q-mt-sm">
      <div  class="col-md-3">
        <div class="row">
          <div class="column justify-center s-border-right q-ml-sm q-mr-sm">
            <q-btn
              v-if = "showPlayBtn"
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
          <div class="column col-grow q-ml-sm q-mr-sm" v-if="openTextBox">
            <TimeAdjustmentUnit
              timeStampType="startTime"
              :timeStamp="start_time"
              :cueId="cueId"
              @subtitleTimeInput="change('start_time', $event)"
              :dark="dark"
            />
            <TimeAdjustmentUnit
              timeStampType="endTime"
              :timeStamp="end_time"
              :cueId="cueId"
              @subtitleTimeInput="change('end_time', $event)"
              :dark="dark"
            />
          </div>
          <div v-else class="column col-grow  q-ml-sm q-mr-sm my-card-click" @click="toggleBox">
              <q-chip outline square color="grey-6" text-color="white" :label="ms_start_time" size="sm" class="block"></q-chip>
              <q-chip outline square color="grey-6" text-color="white" :label="ms_end_time" size="sm" class="block"></q-chip>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <q-card :dark="dark" class="my-card-click"  @click="toggleBox" flat bordered v-if="!openTextBox">
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
                @focused="focused(start_time, end_time, cueId)"
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
            @click="deleteSubtitle(cueId, true)"
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

    <div
      style="min-height:30px"

      >
      <div class="row n-subtitle-utility-controls n-bottom-controls q-mt-sm" v-if="openTextBox">
      <div class="col-md-4">
      </div>
      <div class="col-md-6 text-center">

        <!-- added here by ray  -->


        <SmallRoundedButton
        label="Merge Below"
          icon="mdi-arrow-collapse-down"
          class="n-merge-below"
          @click.prevent="mergeRow(cueId, 'below')"
        />
        <SmallRoundedButton
          label="New Line Below"
          icon="mdi-plus-circle-outline"
          @click.prevent="addRow(cueId, vid, 'below',true)"
        />
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
import { subtitle } from 'src/services/subtitles/subtitleTypes'
import { defineComponent, computed, ref, watch, toRefs } from '@vue/runtime-core'
import { VideoSegmentService } from 'src/services/video/videoSegmentService'
import { videoService } from 'src/services/video/videoService'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { VideoController } from 'src/services/video/videoController'
import timelineController from 'src/services/timeline/timelineController'
import { alerts } from 'src/services/timeline/timelineTypes'
// import SpeakerList from 'src/components/Content/subtitles/SpeakerList.vue'

export default defineComponent({
  components: {
    TimeAdjustmentUnit,
    SubtitleTextEditUnit,
    SmallRoundedButton,
    SubtitleStatusUnit,
    // SpeakerList,
  },
  emits: ['subtitleEdit', 'focused', 'closeAll'],
  props: {
    subtitle: { type: Object as () => subtitle, required: true },
    index: { type: Number, required: true },
    cueId: { type: String, required: true },
    start_time: { type: Number, default: 0 },
    end_time: { type: Number, default: 0 },
    subtitle_data: { type: String, default: '' },
    position: { type: Number },
    is_active: {type: Number, default: 0},
    dark: { type: Boolean,  required: true }
  },
  setup(props, { emit }) {
    const {
      addRow,
      mergeRow,
      deleteSubtitle,
    } = subtitleController()
    const { activeArtifact } = artifactController()
    const { seekFrom } = VideoController()
    const { getSegmentCueId, getIsSegmentPlaying } = VideoSegmentService()
    const { getUserPaused , updateUserPaused } = videoService()
    const { secondsTohhmmss, trackAlert } = timelineController()
    const { is_active } = toRefs(props)
    const openTextBox = ref(false);
    const activeItem = ref(false);
    const track_alert = ref<alerts | null>();
    const limit = 100

    const change = (key: string, data: string) => {
      emit('subtitleEdit', { [key]: data, cueId: props.cueId })
    }

    const showPlayBtn = ref(true)

    const handleBtn = (start_time: number, end_time: number, subtitle_id: string) => {
      seekFrom({start_time, end_time, subtitle_id})
    }
    const handlePause = () => {
      updateUserPaused(true)
    }
    const focused = (start_time: number, end_time: number, cueId: string) => {
      emit('focused', { start_time, end_time, cueId })
    }

    watch(is_active, (newValue) => {
      if(newValue != props.index){
        activeItem.value = false
        openTextBox.value = false;
      }
    })

    watch (
      () => [ getSegmentCueId.value, getUserPaused.value, getIsSegmentPlaying.value ],
      ([ segmentId, userPaused, isSegmentPlaying ]) => {
        if (userPaused || segmentId === '') {
          showPlayBtn.value = true
        } else if (segmentId === props.cueId && isSegmentPlaying) {
          // @TODO - to hover/focus the segment when it is playing
          showPlayBtn.value = false
        } else {
          showPlayBtn.value = true
        }
      }
    )

    const toggleBox = () => {
      // if(activeItem.value === true){
      //   openTextBox.value = true;
      // }else{
      //   emit('closeAll', props.index)
      //   activeItem.value = !activeItem.value
      // }
      openTextBox.value = !openTextBox.value;
      emit('closeAll', props.index)
      activeItem.value = !activeItem.value
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


    return {
      emit,
      change,
      addRow,
      mergeRow,
      deleteSubtitle,
      handleBtn,
      showPlayBtn,
      handlePause,
      focused,
      vid: computed(() => activeArtifact.value.aid),
      ms_start_time: computed(() => secondsTohhmmss(props.start_time)),
      ms_end_time: computed(() => secondsTohhmmss(props.end_time)),
      toggleBox,
      openTextBox,
      activeItem,
      isAlert,
      computedCPL,
      computedCPS,
      track_alert,
      limit,
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
.speakerList{
  position: absolute;
  width: 150px;
  left: 25% !important;
  bottom: 0px;
}
</style>
