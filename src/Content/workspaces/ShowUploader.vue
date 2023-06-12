<template>
    <div>
        <q-dialog v-model="showUploader">
            <VideoUploader @closeWindow="closeWindow" :wid="wid" />
        </q-dialog>
    <q-btn
        rounded
        no-caps
        label="Upload Your Video"
        icon="mdi-video-plus-outline"
        color="deep-orange-5"
        @click="showUploader = true"
        style="display:block;margin-left:auto;margin-right:auto;"
      />
    </div>
</template>

<script lang="ts">
import { defineComponent,computed, ref} from 'vue'
import VideoUploader from './MultiUploader.vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { workspaceController } from 'src/services/workspace/workspaceController'

export default defineComponent({
    name: 'ShowUploader',
    components:{
        VideoUploader
    },
    setup(){
        const { getArtifactsInWorkspace } = artifactController()
        const { selectedWorkspace } = workspaceController()

        const showUploader = ref(false)
        const closeWindow = async () => {
            await getArtifactsInWorkspace(selectedWorkspace.value.wid)
            showUploader.value = false
        }
        return{
            showUploader,
            closeWindow,
            wid: computed(() => selectedWorkspace.value.wid)
        }
    }

})
</script>

<style>
@media (min-width: 600px) {
  #edit
  .q-dialog__inner--minimized > div {
    min-width: 60vw;
    min-height: 500px;
    box-shadow: none;
  }

  #setting
  .q-dialog__inner--minimized > div {
    min-width: 60vw;
    min-height: 700px;
    box-shadow: none;
  }
}
</style>
