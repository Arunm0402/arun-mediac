<template>
<q-btn-dropdown color="primary" label="Download as SRT" icon="download">
      <q-list>
        <q-item v-for="lang in output_languages" clickable v-close-popup @click="useGenerateSrt(videoId, lang.lid)" :key="lang.lid">
          <q-item-section avatar>
            <q-icon name="download" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ lang.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <!-- <q-btn-dropdown color="amber" label="Download as PDF" icon="download">
      <q-list>
        <q-item v-for="lang in output_languages" clickable v-close-popup @click="useDownloadPdf(lang.lid)" :key="lang.lid">
          <q-item-section avatar>
            <q-icon name="download" color="amber" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ lang.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown> -->

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
// import FlatButtonWithIcon from '../../UI/Buttons/FlatButtonWithIcon.vue'
import { subtitleController } from '../../../services/subtitles/subtitleController'

import pdfDownloader from 'src/services/axiom/pdfDownloader'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { languageInterface } from 'src/services/generalTypes'

export default defineComponent({
  components: {
    // FlatButtonWithIcon,
  },
  props: {
    videoId: { type: String, required: true },
    dark: { type: Boolean,  required: true }
  },
  setup(props) {
    const { activeArtifact, getArtifact } = artifactController()

    const output_languages = ref<languageInterface[]>([])

    onMounted(async () => {
      await getArtifact(props.videoId)
      activeArtifact.value.output_language.forEach(lang => {
        if(lang.status == 'COMPLETED'){
          output_languages.value.push(lang)
        }
      })
    })

    const useGenerateSrt = async function (videoId: string, lid:string) {
      const { generateSrt } = subtitleController()
      let srt: BinaryType = await generateSrt(videoId, lid)

      // download the srt response as blob
      const blob = new Blob([srt], { type: 'application/text' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = videoId + '.srt'
      link.click()
      URL.revokeObjectURL(link.href)
    }

    const useDownloadPdf = async function (lid: string, option = '') {
      const { generateSrt } = subtitleController()
      let subtitle: BinaryType = await generateSrt(props.videoId, lid)
      let subtitleStr = subtitle.toString()
      if (option == 'noTimestamp') {
        subtitleStr = subtitleStr.replace(
          /\d\d\:\d\d\:\d\d\,\d\d\d\s\-\-\>\s\d\d\:\d\d\:\d\d\,\d\d\d/g,
          ''
        )
      }
      /**
       * Have to disable PDF downloader's type checking, because the node
       * package is not supporting ts.
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      pdfDownloader(subtitleStr, props.videoId)
    }

    const downloadVideo = async function () {
      const {getSignedUrl} = artifactController()
      const url = await getSignedUrl(props.videoId)
      // const link = document.createElement('a')
      // link.href = url
      // link.click() //this replace current link instead

      window.open(url)
      // await axios.get(url) cors error

    }

    return { useGenerateSrt, useDownloadPdf,downloadVideo, output_languages }
  }
})
</script>

<style scoped>
.n-download-subtitle-btn {
  text-align: center;
  width: 100%;
}
</style>
