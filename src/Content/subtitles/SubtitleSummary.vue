<template>
  <div class="full-width">
    <div
      class="small-scrollbar"
      style="max-height: 300px; overflow-y: scroll; line-break: auto"
    >
      {{ summary }}
    </div>
    <div class="flex row justify-center q-mt-md">
      <!-- <q-btn
        v-if="summary"
        size="md"
        color="indigo-5"
        no-caps
        outline
        label="Download Summary"
        class="text-center"
        @click="pdfDownloader(summary, videoId + '_summary')"
      /> -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import subtitleSummaryServices from 'src/services/axiom/subtitleSummaryService'
import pdfDownloader from 'src/services/axiom/pdfDownloader'

const { getLocalSummary, fetchSubtitleSummary } = subtitleSummaryServices()
const summary = ref()

export default defineComponent({
  props: {
    /**
     * Assuming the summary of subtitle is fetched via videoId
     */
    videoId: {}
  },
  setup(props) {
    const LOADING_TEXT = '... Loading summary'

    async function initSummary() {
      // First try to get the subtitle from state
      summary.value = getLocalSummary(props.videoId)
      // If there are no state stored summary, make the api call
      if (!summary.value) {
        summary.value = LOADING_TEXT
        summary.value = await fetchSubtitleSummary(props.videoId)
      }
    }

    void initSummary()
    return {
      summary,
      pdfDownloader
    }
  }
})
</script>

<style lang="scss" scoped>
.small-scrollbar::-webkit-scrollbar {
  /* CSS variable doesn't wrok here */
  width: 6px;
  background-color: white;
}

.small-scrollbar::-webkit-scrollbar-thumb {
  background: #e6e6e6;
  border-radius: 99px;
}
</style>
