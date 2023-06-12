<template>
<div id="custom-timeline">
  <div class="row justify-between items-center"
  :class="{'bg-rabbit-purple-8': !dark, 'bg-dark': dark}">
    <!-- Volume Controller -->
    <!-- <div class="col-12 q-pa-md relative-position">
      <q-slider
      v-model="sliderPos"
      :min="0"
      :max="duration"
       label
      :label-value="''"
      label-always
      color="deep-purple-13"
      inner-track-color="transparent"
      selection-color="transparent"
      track-color="transparent"
      @change="setDurationValue"
      class="active-timeline-bar"
    ></q-slider>
    </div> -->
    <div class="col-12 q-pa-md">
      <div class="no-wrap relative-position" v-if="timelineStep">
         <q-badge class="text-grey-5 timeline-badge left-badge absolute-bottom-left">
          {{ msTohhmmss(0) }}
        </q-badge>
        <q-range
          v-model="timelineStep"
          :left-label-value="msTohhmmss(Math.round(timelineStep.min))"
          :right-label-value="msTohhmmss(Math.round(timelineStep.max))"
          label-always
          :min="0"
          :max="duration"
          color="deep-purple-13"
          dark
          drag-range
          class="q-mx-sm"
          id="timelineRange"
        />
         <q-badge class="text-grey-5 timeline-badge right-badge absolute-bottom-right">
          {{ msTohhmmss(duration) }}
        </q-badge>

      </div>
    </div>
  </div>
  <div class="row justify-left items-left" :class="{'bg-rabbit-purple-8': !dark, 'bg-dark': dark}">
    <div class="col-11 q-pl-md q-ma-none">
      <div class="range-slider non-select" id="pointer-range-slider" ref="pointerRangeSlider">
        <span><q-img src="icons/label2.svg" class="non-select"></q-img></span>
      </div>
    </div>
    <div class="col-1 text-center"></div>
    <div v-if="timelineStep" class="col-11 q-pl-md q-mb-sm subtitle-timeline-bar" ref="subtitleTimelineBar" id="subtitleTimelineBar">
      <q-linear-progress size="10px" track-color="grey-6" color="accent" id="elm" ref="elm">
        <div class="absolute-full flex flex-left bg-grey-6 fl-initial" ref="subtitleTimelineTarget" id="subtitleTimelineTarget">
          <SubtitleBadges :timelineStep="timelineStep" :videoId="videoId" :main_track="true" />
        </div>
      </q-linear-progress>
    </div>
    <div class="col-1 text-center">
      <q-btn-group square class="q-mb-sm btn-top-center" v-if="timelineStep">
        <q-btn color="purple-10" size="xs" icon="mdi-magnify-minus-outline" :disable="timelineStep.min == 0 && timelineStep.max == duration" @click="zoomOut"></q-btn>
        <q-btn color="purple-10" size="sm" icon="mdi-magnify-plus-outline" :disable="zoomDisabled" @click="zoomIn"></q-btn>
      </q-btn-group>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import timelineController from 'src/services/timeline/timelineController'
import { videoService } from 'src/services/video/videoService';
import { timeSteps } from 'src/services/timeline/timelineTypes'
import SubtitleBadges from './SubtitleBadges.vue'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { VideoController } from 'src/services/video/videoController'
export default defineComponent({
  name: 'CustomTimeline',
  components:{
    SubtitleBadges
  },
  props: {
    videoId: {
      type: String,
      required: true
    },
    dark: { type: Boolean,  required: true }
  },
  setup() {
    const { getTimestamp, updateTimestamp, getVideoDuration, updateUserPaused } =  videoService()
    const { zoom_level } =  userConfigService()
    const cd = computed(() => getVideoDuration.value)
    const duration = ref(cd.value * 1000)
    const subtitleTimelineBar = ref<HTMLElement>()
    const subtitleTimelineTarget = ref<HTMLElement | null>(null)
    const pointerRangeSlider = ref<HTMLElement | null>(null)
    const timelineStep = ref<timeSteps | null>(null);
    const timestamp = ref('00:00:00')
    const defaultZoomLevel = ref(1)
    const zoomDisabled = ref(false)
    const timelinePointer = ref(0)
    const maxZoom = ref(zoom_level.value)
    const sliderPos = ref(0)
    const { seekTime } = VideoController()
    watch(
      () => getVideoDuration.value,
      (val) => {
        duration.value = val*1000;
        timelineStep.value = {
          min: 0,
          max: duration.value
        };
      }
    );
 const { msTohhmmss } = timelineController()
    onMounted(() => {
     timelineStep.value = {
          min: 0,
          max: duration.value
        };
        rangeSlider();
   })
    watch(
      () => getTimestamp.value,
      (val) => {
        timestamp.value = new Date(val * 1000).toISOString().substr(11, 8)
        sliderPos.value = val * 1000;
      }
    );
    watch(
      () => timelinePointer.value,
      () => {
        setRangePointer(timelinePointer.value + 22);
      }
    );
    function setDurationValue(value: number) {
        console.log(value, 'setDurationValue-----');
        updateTimestamp(value)
        updateUserPaused(true)
        const time = value/1000
        seekTime(time)
        updateUserPaused(false)
    }
    const scrollZoom = (current: number, old:number) => {
      let is_added = true
      if(current < old){
        is_added = false
      }
      const target = subtitleTimelineTarget.value;
      let range = pointerRangeSlider.value;
      let pointerLeftPosition = 0;
      if(range){
        let dragger = range.children[0] as HTMLElement;
        pointerLeftPosition = dragger?.offsetLeft ?? 0;
      }
      if(target && subtitleTimelineBar.value){
          let bar_width = subtitleTimelineBar.value.getBoundingClientRect().width
          const max_default_range = timelineStep.value?.max ?? duration.value;
          const min_default_range = timelineStep.value?.min ?? 0;
          let pos = ((pointerLeftPosition + 22) / bar_width) * 100;
          const per_zoom = zoom_level.value/100*duration.value;
          let min_range = 0, max_range = 0;
          if(is_added){
             min_range = min_default_range + (pos/100*per_zoom);
             max_range = max_default_range - ((100-pos)/100*per_zoom);
          }else{
             min_range = min_default_range - (pos/100*per_zoom);
             max_range = max_default_range + ((100-pos)/100*per_zoom);
          }
          if((max_range - min_range) > 0){
            timelineStep.value = {  min: (min_range >= 0 && min_range <= duration.value ? min_range : 0), max: max_range >= 0 && max_range <= duration.value ? max_range : duration.value }
            zoomDisabled.value = false;
          }else{
            zoomDisabled.value = true;
            timelineStep.value = {  min: min_range, max: min_range }
          }
          setRangePointer(pointerLeftPosition);
      }
    }
    const setRangePointer = (position: number) => {
      if(subtitleTimelineBar.value && timelineStep.value){
        let rangeTimeline = document.getElementById('timelineRange')
        let bar_width = subtitleTimelineBar.value.getBoundingClientRect().width
        if(rangeTimeline){
            const r_el = rangeTimeline.getElementsByClassName('q-slider__selection')[0] as HTMLElement;
            let pos = (position / bar_width) * 100;
            const badge = document.createElement('div');
            badge.className = 'badge-pointer';
            badge.style.left = `${pos}%`;
            const existBadge = rangeTimeline.getElementsByClassName('badge-pointer')[0] as HTMLElement
            try {
              if (r_el && !existBadge) {
                r_el.appendChild(badge);
              }else {
                existBadge.style.left = `${pos}%`;
              }
            }
            catch(err) {
            }
        }
      }
    }
     const zoomIn = () => {
      const old = defaultZoomLevel.value;
      defaultZoomLevel.value++
      scrollZoom(defaultZoomLevel.value, old)
    }
    const zoomOut = () => {
      const old = defaultZoomLevel.value;
      defaultZoomLevel.value--
      scrollZoom(defaultZoomLevel.value, old)
    }
    const rangeSlider = () => {
      if(pointerRangeSlider.value){
        let range = pointerRangeSlider.value;
        let dragger = range.children[0] as HTMLElement;
        if(dragger){
          let draggerWidth = 15, // width of your dragger
          down = false,
          rangeWidth = 0, rangeLeft = 0;
          dragger.style.width = `${draggerWidth}px`;
          dragger.style.left = `${-draggerWidth}px`;
          dragger.style.marginLeft = `${(draggerWidth / 2)}px`;
          range.addEventListener('mousedown', function(e) {
              rangeWidth = this.offsetWidth;
              rangeLeft = this.offsetLeft;
              down = true;
              updateDragger(e);
              return false;
          });
            document.addEventListener('mousemove', function(e: MouseEvent) {
                void updateDragger(e);
            });
            document.addEventListener('mouseup', function() {
                down = false;
            });
            const updateDragger = (e: MouseEvent) => {
                if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)) {
                    const leftPosition = e.pageX - rangeLeft - draggerWidth
                    dragger.style.left = `${leftPosition}px`;
                    timelinePointer.value = leftPosition;
                }
            }
        }
      }
    }
    return {
      timelineStep,
      msTohhmmss,
      duration,
      subtitleTimelineBar,
      subtitleTimelineTarget,
      pointerRangeSlider,
      zoomIn,
      zoomOut,
      defaultZoomLevel,
      maxZoom,
      zoomDisabled,
      sliderPos,
      setDurationValue,
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
.range-slider {
  width:100%;
  height:20px;
  margin:0;
  position:relative;
  cursor:e-resize;
}
.range-slider:before {
  content:"";
  display:block;
  position:absolute;
  top:9px;
  left:0;
  width:100%;
  height:2px;
}
.range-slider span, .range-slider div.outer-pos {
  display:block;
  height:inherit;
  position:relative;
  z-index:2;
  cursor:inherit;
  width: 15px;
}
.btn-top-center{
  margin-top: -15px;
}
</style>
<style>
.badge-pointer{
  background-color: #72CEC1;
  width: 5px;
  height: 100%;
  position: absolute;
}
#resultBox span{
  color: chocolate;
  padding-left: 5px;
}
#custom-timeline .active-timeline-bar .q-slider__pin--h-standard {
    bottom: -23%;
}
.active-timeline-bar{
  position: absolute;
}
</style>
