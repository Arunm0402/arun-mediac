<template lang="">
  <q-card flat class="my-card q-mt-sm bg-grey-2">
    <q-card-section >
      <div class="q-pa-none">
        <div class="row" v-if="timelineStep">
          <div class="col-2 text-center text-vertical-middle">Search By</div>
          <div class="col-2">
            <q-select :dark="dark" dense color="grey-13" outlined v-model="searchData.search_type" emit-value map-options label-color="grey-13" label="Search Type" :options="options"></q-select>
          </div>
          <div class="col-5 q-ml-md relative-position" v-if="searchData.search_type == 1">
            <q-badge :color="dark ? 'grey-10' : 'grey-1'" :class="{'text-grey-5' : dark, 'text-grey-10': !dark}" class="timeline-badge left-badge absolute-bottom-left">
              {{ msTohhmmss(timelineStep.min) }}
            </q-badge>
            <q-range
              v-model="timelineStep"
              @change="updateSubtitleTimeline"
              :min="0"
              :max="duration"
              :dark="dark"
            />
            <q-badge :color="dark ? 'grey-10' : 'grey-1'" :class="{'text-grey-5' : dark, 'text-grey-10': !dark}" class="timeline-badge right-badge absolute-bottom-right">
            {{ msTohhmmss(timelineStep.max) }}
            </q-badge>
          </div>
          <div class="col-5 q-ml-md relative-position" v-else>
            <q-input dense standout rounded outlined placeholder="Keyword..." label-color="grey-13" v-model="searchData.keyword"></q-input>
          </div>
          <div class='col-2 q-ml-lg'>
            <q-btn color="grey-6" icon="search" size="md" label="Search" @click.prevent="search()" class="q-pa-sm q-pr-md text-capitalize	" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { onMounted, ref, reactive, watch, defineComponent, computed } from 'vue'
import { videoService } from 'src/services/video/videoService';
import timelineController from 'src/services/timeline/timelineController'
import { timeSteps } from 'src/services/timeline/timelineTypes'
import { translateController } from 'src/services/translate/translateController'

export default defineComponent({
  name: 'SubtitleFilterUnit',
  props:{
    dark: { type: Boolean,  required: true },
    indexCount: { type: Number,  required: true },
  },
  emits: ['searchSubtitle'],
  setup(props) {
    const { getVideoDuration } =  videoService()
    const { msTohhmmss } = timelineController()
    const {  filterSubtitle } = translateController()
    const vd = computed(() => getVideoDuration.value)
    const duration = ref(vd.value * 1000)
    const timelineStep = ref<timeSteps | null>();

    const searchData = reactive({
        search_type: 1,
        start_time: 0,
        end_time: 0,
        keyword: '',
      })

    timelineStep.value = {
          min: 0,
          max: duration.value
      };

  onMounted(() => {
     timelineStep.value = {
          min: 0,
          max: duration.value
        };
   })

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

    const updateSubtitleTimeline = (val: {min: number, max: number}) => {
      searchData.start_time = val.min;
      searchData.end_time = val.max;
    }

    const search = () => {
      void filterSubtitle(searchData, props.indexCount)
      //emit('searchSubtitle', searchData);
    }

    return {
      msTohhmmss,
      searchData,
      duration,
      timelineStep,
      updateSubtitleTimeline,
      options: [
        {
          label: 'Timestamp',
          value: 1,
        },
        {
          label: 'Keyword',
          value: 2,
        },
      ],
    search,
    }
  }
})
</script>
<style lang=""></style>
<style scoped>
.q-card {
  border-radius: 0px;
}
.text-vertical-middle{
  line-height: 39px;
}
</style>
