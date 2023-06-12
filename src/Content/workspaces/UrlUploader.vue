<!-- <template>
  <div class="q-py-sm">
    <div>
      <q-input
        v-model="videoDetailRef.url"
        label="Video URL"
        filled
        dense
        class="q-mb-md"
        :rules="[(val) => !!val || '* Video URL required.']"
      />

      <q-input
        v-model="videoDetailRef.urlPass"
        label="Video Source Password"
        filled
        dense
        class="q-mb-lg"
      />

      <div class="q-px-sm column q-gutter-md">
        <div class="row q-gutter-sm justify-between no-wrap items-center">
          <b>Video Language:</b>
          <q-select
            dense
            outlined
            v-model="videoDetailRef.inputLang"
            :options="inputLanguages"
            emit-value
            map-options
          />
        </div>

        <div class="row q-gutter-sm justify-between no-wrap items-center">
          <b>Transcript Language:</b>
          <q-select
            dense
            outlined
            v-model="videoDetailRef.outputLang"
            :options="outputLanguages"
            emit-value
            map-options
          />
        </div>
      </div>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn
        :disable="videoDetailRef.url == ''"
        no-caps
        rounded
        icon="cloud_upload"
        color="indigo-10"
        label="Upload From URL"
        @click="useProcessUrlUploading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { urlUploadingService } from 'src/services/axiom/urlUploadingService'

import { inputLanguages, outputLanguages } from 'src/Constants/Constant'

export default defineComponent({
  props: {
    wid: {},
    uid: {}
  },
  setup(props, { emit }) {
    const $q = useQuasar()

    const { processUrlUploading } = urlUploadingService()

    const videoDetailRef = reactive({
      url: '',
      urlPass: '',
      inputLang: 'en',
      outputLang: 'en'
    })

    const UPLOAD_SUCCESS_MSG =
      '<b>Upload Success.</b> <br>It may take a while till you see the video in workspace. '
      // <br>The creation of each video on the workspace is only done during policy generation which is only done after video downloads.

    const UPLOAD_FAILED_MSG =
      'Upload failed. Please check your input URL and password.'

    const useProcessUrlUploading = async () => {
      const data = {
        url: videoDetailRef.url,
        password: videoDetailRef.urlPass,
        uid: props.uid as string,
        wid: props.wid as string,
        input_language: videoDetailRef.inputLang,
        output_language: videoDetailRef.outputLang
      }

      $q.loading.show({
        message: 'Processing your video'
      })
      const uploadResponse = await processUrlUploading(data).finally(() => {
        // Emit event to parent component to close the popup window
        emit('closeWindow')
      })

      $q.loading.hide()

      console.log(uploadResponse.status)

      $q.notify({
        message:
          uploadResponse.status == 200 ? UPLOAD_SUCCESS_MSG : UPLOAD_FAILED_MSG,
        position: 'center',
        color: uploadResponse.status == 200 ? 'green-8' : 'amber-8',
        timeout: 0,
        progress: true,
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
              /* ... */
            }
          }
        ],
        html: true
      })
    }

    return {
      videoDetailRef,
      useProcessUrlUploading,
      inputLanguages,
      outputLanguages
    }
  }
})
</script>

<style lang="scss" scoped></style> -->
