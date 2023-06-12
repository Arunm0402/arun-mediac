<template>
  <div class="flex row items-center q-my-xs">
    <q-btn
      size="xs"
      color="grey-6"
      class="q-pa-xs q-btn--rectangle--left"
      v-touch-repeat:0:300:200:100:50:20.mouse="decrementTime"
      @mouseup="done"
      unelevated
      icon="mdi-minus"
    />

    <TimeStringEditUnit
      :time-in-ms="timeStampRef"
      :timeStampType="timeStampType"
      :cueId="cueId"
      @updateTime="updateTime"
      :indexCount="indexCount"
    />

    <q-btn
      size="xs"
      color="grey-6"
      class="q-pa-xs q-btn--rectangle--right"
      v-touch-repeat:0:300:200:100:50:20.mouse="incrementTime"
      @mouseup="done"
      unelevated
      icon="mdi-plus"
    />
  </div>
</template>

<script lang="ts">
import TimeStringEditUnit from './TimeStringEditUnit.vue'
import { defineComponent, ref, watch } from 'vue'
import { subtitleTSVerifier } from 'src/services/subtitles/subtitleTimeStampVerifier'
import { subtitleController } from 'src/services/subtitles/subtitleController'

export default defineComponent({
  components: {
    TimeStringEditUnit,
  },
  props: {
    timeStamp: { type: Number, default: 0 },
    position: { type: Number },
    cueId: { type: String, required: true },
    timeStampType: { type: String, required: true },
    indexCount: { type: Number,  required: true }
  },
  setup(props, { emit }) {
    const timeStampRef = ref(props.timeStamp * 1000)
    const {
      timeAdjustmentUnit,
    } = subtitleTSVerifier()

    const { setPanel } = subtitleController()

    const unitOfTimeToAdjust = timeAdjustmentUnit

    const incrementTime = () => {
      void setPanel(props.indexCount)
      // if (!isIncrementTimeVerified(props.cueId, props.timeStampType as timeStampInputType, timeStampRef, props.indexCount)){
      //   return
      // }
      timeStampRef.value += unitOfTimeToAdjust
    }

    const decrementTime = () => {
      void setPanel(props.indexCount)
      // if (!isDecrementTimeVerified(props.cueId, props.timeStampType as timeStampInputType, timeStampRef, props.indexCount)){
      //   return
      // }
      timeStampRef.value = timeStampRef.value <= timeAdjustmentUnit ? 0 : timeStampRef.value - unitOfTimeToAdjust
    }

    const done = () => {
      emit('subtitleTimeInput', timeStampRef.value / 1000) // Convert back to seconds
    }

    const updateTime = (newTime: number) => {
      // Whenever the input timestamp changes (inside the component),the TextCue on the video will change as well
      timeStampRef.value = newTime
      done()
    }

    watch(
      () => props.timeStamp,
      (newTime: number) => {
        timeStampRef.value = newTime * 1000
      }
    )

    return {
      timeStampRef,
      updateTime,
      incrementTime,
      decrementTime,
      done,
    }
  }
})
</script>

<style scoped>
.n-icon {
  transition: all 0.1s ease;
}
.n-icon:hover {
  color: #ffbf00;
}
.n-icon:active {
  color: #dd9e00;
}
.q-btn--rectangle--left{
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.q-btn--rectangle--right{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
