<template>
  <div style="width: 110px" ref="inputRef">
    <q-input
      type="text"
      mask="##:##:##,###"
      fill-mask="0"
      debounce="1000"
      class="q-pa-none q-ma-none q-field--outlined--time q-field--dense--time"
      v-model="timeStampStringRef"
      @blur="updateTimeStamp(timeStampStringRef)"      
      tabindex="-1"
      outlined
      dense
      square
    />
  </div>
</template>

<script lang="ts">
import { toSrtTime, toMS } from 'subtitle'
import { defineComponent, ref, watch } from 'vue'
//import { subtitleTSVerifier } from 'src/services/subtitles/subtitleTimeStampVerifier'
//import { timeStampInputType } from 'src/services/subtitles/subtitleTypes'
import { subtitleController } from 'src/services/subtitles/subtitleController'

export default defineComponent({
  props: {
    timeInMs: { type: Number, default: 0 },
    timeStampType: { type: String, required: true },
    cueId: { type: String, required: true },
    indexCount: { type: Number,  required: true }
  },
  setup(props, {emit}) {

    const timeStampStringRef = ref(toSrtTime(Math.round(props.timeInMs)))
    const prevTimeStamp = ref(Math.round(props.timeInMs))
    const inputRef = ref<HTMLElement>()
    //const { isEditTimeVerified } = subtitleTSVerifier()
    const { setPanel } = subtitleController()

    // Whenever the input timestamp changes ,the TextCue on the video will change as well
    const updateTimeStamp = (timestamp: string) => {
      void setPanel(props.indexCount)
      const time = toMS(timestamp)
      emit('updateTime', time)
    }

    watch(
      () => props.timeInMs,
      (newTime: number) => {
        prevTimeStamp.value = newTime
        timeStampStringRef.value = toSrtTime(Math.round(newTime))
      }
    )

    return {
      emit,
      toSrtTime,
      timeStampStringRef,
      updateTimeStamp,
      inputRef
    }
  }
})
</script>

<style>
.n-time-string-edit-unit::selection {
  color: red;
}
.s-time-string-edit-unit input{
  margin: 0px
}

.q-field--dense--time .q-field__control, .q-field--dense--time .q-field__marginal {
    height: 22px;
}
.q-field--outlined--time .q-field__control:before{
  border-left: none;
  border-right: none;
}

</style>
