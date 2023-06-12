<template>
  <template v-for="(badge, index) in drawTimeline" :key="index">
    <q-badge size="10" v-if="(badge.area && badge.area > 0)" @click="handleBtn(badge)" :start="badge.start_time" :end="badge.end_time" :gap="badge.gap" class="badge-track q-ma-none q-pa-none" :class="{'badge-effect': (badge.subtitle_data), 'active': (badge.subtitle_id && defaultActive == badge.subtitle_id), 'badge-subtitle' : (main_track && badge.subtitle_data)}" :color="badge.subtitle_data ? (badge.track_alert ? 'deep-orange-6' : `purple-10`) : `grey-6`" :style="`width:${badge.area}%;`" >
      <q-tooltip class="bg-black" transition-show="scale" transition-hide="scale" anchor="bottom middle" self="top middle" v-if="badge.subtitle_data">
        {{ badge.subtitle_data }}
      </q-tooltip>
    </q-badge>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, PropType } from 'vue';
import timelineController from 'src/services/timeline/timelineController'
import { timelineBadge, timeSteps } from 'src/services/timeline/timelineTypes'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { translateController } from 'src/services/translate/translateController'
import { userConfigService } from 'src/services/userConfig/userConfigService';

export default defineComponent({
  name: 'SubtitleBadges',
  props: {
    videoId: {
      type: String,
      required: true
    },
    timelineStep:{
      type: Object as PropType<timeSteps>,
      required: true,
    },
    main_track:{
      type: Boolean,
     default: false
    },
  },
  setup(props) {

    const drawTimeline = ref<timelineBadge[]>([]);
    const defaultActive = ref<string>()

    const { arrangeTimeLineData } = timelineController()
    const { subtitles } = subtitleController()
    const {  filterSubtitle } = translateController()
    const { userConfig } = userConfigService()

    onMounted(() => {
      handelClickEvent()
      updateSubtitleTimeline({min: props.timelineStep.min, max: props.timelineStep.max})
    })

    const handelClickEvent = () => {
      const elm = document.getElementById('custom-timeline') as HTMLElement

      elm.addEventListener('click', function (e) {
        const elm = e.target as HTMLElement;
        if(!elm.classList.contains('q-badge') && !elm.classList.contains('q-btn') && !elm.classList.contains('mdi-magnify-plus-outline') && !elm.classList.contains('mdi-magnify-minus-outline') && !elm.classList.contains('q-range') && !elm.classList.contains('q-slider__selection') && !elm.classList.contains('q-slider__track-container') && !elm.classList.contains('non-select') && defaultActive.value != ''){
            defaultActive.value = ''
        }
      });

    }


    watch(
      () => subtitles.value,
      () => {
        updateSubtitleTimeline({min:props.timelineStep.min , max: props.timelineStep.max})
      }
    );

    watch(
      () => props.timelineStep,
      (timeStep) => {
        updateSubtitleTimeline({min:timeStep.min , max: timeStep.max})
      }
    );

    watch(
      userConfig,
      () => {
        updateSubtitleTimeline({min:props.timelineStep.min, max: props.timelineStep.max})
      }
    )

    watch(
      () => defaultActive.value,
      (val) => {
        void filterSubtitle({
              search_type: 1,
              start_time: props.timelineStep.min,
              end_time: props.timelineStep.max,
              keyword: '',
              s_id: val,
            }, 1)
      }
    );

    const updateSubtitleTimeline = (val: {min: number, max: number}) => {
      const badges = arrangeTimeLineData(val)
      drawTimeline.value = badges;

    }


    const handleBtn = (badge: timelineBadge) => {
      if(badge.subtitle_data && badge.gap > 0 && badge.subtitle_id){
        if(defaultActive.value == badge.subtitle_id){
            defaultActive.value = '';
        }else{
          defaultActive.value = badge.subtitle_id
        }
      }
    }

    return {
      drawTimeline,
      handleBtn,
      defaultActive,
    };
  },
});
</script>

<style scoped>
.timeline-label{
    width: 20px;
    color: gray;
    position: absolute;
    top: -12px;
    transition: all 2s ease-in-out;
    -webkit-transition: all 2s ease-in-out; /** Chrome & Safari **/
    -moz-transition: all 2s ease-in-out; /** Firefox **/
    -o-transition: all 2s ease-in-out; /** Opera **/

  }
.timeline-badge{
  background: none;
}
.left-badge{
  top: 27px;
}
.right-badge{
  top: 27px;
}
.badge-track{
  border-radius:0px;
  cursor: pointer;
  height: 10px;
}
.bg-black{
  font-size: 16px !important;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.badge-effect:hover{
  border: 2px solid #72CEC1;
}
.badge-effect.active{
  border: 2px solid #72CEC1;
}
.q-badge{
    padding:0px;
}
#subtitle-timeline-bar{
  width:100%;
  overflow:hidden;
}
.badge-subtitle.selected {
  background: #72CEC1 !important;
}
.cursor-crosshair{
  cursor: crosshair;
}
.fl-initial{
  flex-wrap: initial
}
</style>
