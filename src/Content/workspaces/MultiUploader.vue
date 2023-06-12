<template>
    <q-card style=" max-width: 80vw; min-height: 50vh">
      <q-card-section>
        <h5 class="q-my-none text-center text-rabbit-purple">Upload Videos</h5>
      </q-card-section>

      <q-card-section class="row justify-center q-pt-none">
        <q-uploader
          flat
          :color="mode ? `uploader-dark` : `white`"
          class="full-width"
          @added="filesAdded"
          accept="video, audio/"
          :multiple="true"
        >
          <template v-slot:list="scope">
            <q-card-section horizontal class="justify-center q-ma-none q-pa-none">
              <q-card-section class="col-12 col-md-6 col-sm-12 q-ma-none q-pa-none" v-if="scope.files.length > 0">
                <q-list separator>
                  <q-item clickable v-ripple
                    v-for="file, index in scope.files"
                    :key="file.name"
                    :class="{'bg-rabbit-purple-1': !mode, 'q-mb-sm': true}"
                  >
                    <q-item-section avatar top>
                      <q-avatar square icon="mdi-file-video" color="rabbit-purple" text-color="white"></q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">{{ file.name }}</q-item-label>
                      <q-item-label caption>
                        <span v-if="uploadProgressArray[index]">{{(uploadProgressArray[index].loaded_size * parseFloat(file.__sizeLabel)).toFixed(2) }} / {{ file.__sizeLabel }}</span>
                        <span v-else>{{ file.__sizeLabel }}</span>
                      </q-item-label>
                      <q-linear-progress
                          v-if="uploadProgressArray[index]"
                          :value="uploadProgressArray[index].percentage.toFixed(2)/100"
                          color="rabbit-purple"
                          size="15px"
                        >
                          <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="accent" :label="(uploadProgressArray[index] ? uploadProgressArray[index].percentage.toFixed(2) : 0) + '%'" />
                          </div>
                        </q-linear-progress>
                        <!-- <q-linear-progress
                          v-else
                          :value="0"
                          color="rabbit-purple"
                          size="15px"
                        >
                          <div class="absolute-full flex flex-center">
                            <q-badge color="white" text-color="accent" label="0.00%" />
                          </div>
                        </q-linear-progress> -->
                    </q-item-section>

                    <q-item-section side>
                      <q-icon
                          name="mdi-trash-can-outline"
                          @click="scope.removeFile(file);fileRemoved(file)"
                          size="sm"
                          class="cursor-pointer n-hover-red"
                          color = "red"
                        />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-separator vertical v-if="scope.files.length > 0"></q-separator>
              <q-card-section class="col-12 col-md-6 col-sm-12 q-ma-none q-pa-none">
                <div
                  class="row justify-center text-center q-my-none s-round-6 text-rabbit-purple cursor-pointer n-video-uploader-drop-container">
                  <div
                    class="s-border-dash  full-width full-height s-round-16 q-pa-lg n-video-uploader-drop-area"
                    :class="{'border-rabbit-purple': !mode}"
                    >
                    <!--
                    ┌──────────────────────────────────────────────────────────────────────────────┐
                    │ This q-uploader-add-trigger must place inside .n-video-uploader-drop-area    │
                    │ class, because the outer class need to listen to hover first to show         │
                    │ highlight, below tag will block all the mouse event                          |
                    └──────────────────────────────────────────────────────────────────────────────┘
                    -->

                    <q-icon
                      name="mdi-cloud-upload-outline"
                      size="5rem"
                      color="rabbit-purple-4"
                      class="block q-mx-auto"
                    />
                    <h5 class="q-my-none text-center text-grey-6">
                      Drag and drop
                    </h5>
                    <q-separator class="q-mt-sm q-mb-sm"></q-separator>
                    <q-btn outline rounded color="primary" label="Browse Files" >
                      <q-uploader-add-trigger style="" />
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </template>


        </q-uploader>
      </q-card-section>
      <q-separator />
      <q-card-section>
           <div class="row q-mb-sm">
            <label class="col-md-1 col-form-label q-mr-lg">Tags</label>
            <EditTags class="col" :wid="wid" :unsavedTags = "unsavedTags" @addTag="addTag" @removeTag="removeTag" />
          </div>

          <div class="row q-mt-md q-mb-md q-gutter-sm">
            <div class="">
              <div class="row items-center">
                <label class="col-form-label q-pr-sm">Video Language</label>
                  <q-select dense outlined v-model="input_language" :options="inputLanguages" emit-value
          map-options style="min-width:100px" />
              </div>
            </div>
            <div class="">
              <div class="row items-center">
                <label class="col-form-label text-right q-pr-sm">Transcript Language </label>
                  <q-select dense outlined v-model="output_language" :options="outputLanguages" emit-value
          map-options style="min-width:100px"/>
              </div>
            </div>

             <div class="col-md-4" >
              <!-- <div class="row">
                <label class="col-md-10 col-form-label text-right q-pr-sm q-pt-sm">Email me once video been processed</label>
                <div class="col-md-2">
                  <q-checkbox v-model="sent_email" />
                </div>
               </div> -->
            </div>

          </div>

            <div class="row justify-center items-center q-mt-lg">
              <div class="col-12 text-center">
                <q-btn
                  label="Cancel"
                  color="grey-7"
                  size="1rem"
                  class="q-mr-sm"
                  flat
                  no-caps
                  @click="emit('closeWindow')"
                />
                <q-btn
                  unelevated
                  size="1rem"
                  no-caps
                  icon="mdi-cloud-upload-outline"
                  label="Upload"
                  color="rabbit-purple"
                  @click="upload"
                  :loading="loading"
                  :multiple="true"
                  :disable="selectedFiles.length > 0 ? false : true"
                >
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>

            </div>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue'
// import { artifactController } from 'src/services/artifacts/artifactsController'
import { keycloakController } from 'src/services/auth/keycloakController'
import { filenameController } from 'src/services/filename/filenameController'
import EditTags from 'src/components/Content/videocard/EditTags.vue'
import { workspaceController } from 'src/services/workspace/workspaceController'
import { inputLanguages, outputLanguages } from 'src/Constants/Constant'
import { workspaceLanguageInterface } from 'src/services/generalTypes'

// import { event } from 'quasar'

export default defineComponent({
  name: 'MultiUploader',
  components: {
    EditTags
  },
  props: {
    wid: {
      type: String,
      required: true
    },
    mode: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedFiles = ref(<File[]>[])
    const { getSelectedWorkspace, getUploadPolicy } = workspaceController()
    const currentWorkspace = getSelectedWorkspace()   // current workspace
    // const { getUploadPolicy } = artifactController()
    const { user } = keycloakController()
    const tag = ref('')

    const input_language = ref(currentWorkspace.input_language ?? inputLanguages[0].value)
    const output_language = ref(currentWorkspace.output_language ?? outputLanguages[0].value)

    const short_desc = ref('')
    const loading = ref(false)
    const dense = ref(false)
    const sent_email = ref(false)
    const { sanitiseFileName } = filenameController()

    interface uploadProgressObj {
      loaded : number,
      loaded_size: number,
      total : number,
      percentage : number
    }
    const uploadProgressArray : Ref<uploadProgressObj[]> = ref([])

    const filesAdded = (files: File[]) => {
      selectedFiles.value = selectedFiles.value.concat(files)
    }
    const fileRemoved = (file : File) => {
      // console.log('files before remove: ', selectedFiles.value)
      // console.log('remove this file: ',file)

      const fileIndex = selectedFiles.value.indexOf(file)
      selectedFiles.value.splice(fileIndex,1)
      // console.log('files after remove: ', selectedFiles.value)
    }

     const uploadEnd = () => {
      for (let i = 0; i < uploadProgressArray.value.length; i++){
        if (uploadProgressArray.value[i].percentage !== 100){
          return
        }
      }
      loading.value = false
      emit('closeWindow')
      console.log('all uploads Ended')
    }

    // const uploadProgress = (e: ProgressEvent) => {
    //   console.log('uploadprogress')

    //   console.log(e)

    // }


    // const tags = ref(['defaultTag1', 'defaultTag2']); // to be changed later when defaulttag is known
    const tags: Ref<string[]> = ref([])
    const unsavedTags: Ref<string[]> = ref([])
    onMounted(()=>{
       if(currentWorkspace.tags && currentWorkspace.tags.length > 0){
        tags.value = currentWorkspace.tags
      }
      tags.value?.forEach((tag:string) => {
        unsavedTags.value.push(tag)
      })
      console.log(unsavedTags.value)

    })
    function addTag(tag:string){
      console.log('addTag')
      if(!unsavedTags.value.includes(tag)){
        unsavedTags.value.push(tag)
      }
    }
    function removeTag(tag:string){
      unsavedTags.value = unsavedTags.value.filter((x) => x != tag)
      console.log('removeTag')
    }
    const uploadProgress = (i : number) =>{
      return (e : ProgressEvent) =>{
        uploadProgressArray.value[i].loaded = e.loaded
        uploadProgressArray.value[i].loaded_size = parseFloat((e.loaded/e.total).toFixed(2))
        uploadProgressArray.value[i].total = e.total
        uploadProgressArray.value[i].percentage = parseFloat((e.loaded/e.total*100).toFixed(2))
        console.log(e.loaded, e.total, 'uploadProgressArray------------');
      }
    }


    const upload = async (
      //TO be added when backend accepts these arguments
      // input_language: string[],
      // output_language: string[],
      // tags: string[],
      // short_desc: string[]
    ) => {
      console.log('uploadfiles:', selectedFiles.value)
      loading.value = true
      let output = []
      output.push(output_language.value)
      for (let i = 0; i < selectedFiles.value.length; i++) {
        // console.log(short_desc)
        const policyData = {
          user_id: user.value.uid,
          content_type: selectedFiles.value[i].type,
          file_size: selectedFiles.value[i].size,
          filename: sanitiseFileName(selectedFiles.value[i].name),
          input_language: input_language.value as workspaceLanguageInterface,
          output_language: output as Array<workspaceLanguageInterface>, //only handling 1 language for now
          tags: unsavedTags.value,
          // short_desc: short_desc

        }

        const tempUploadProgress : uploadProgressObj ={
          loaded : 0,
          total : 100,
          percentage : 0,
          loaded_size: 0
        }

        uploadProgressArray.value.push(tempUploadProgress)
        console.log(uploadProgressArray)

        const policy = await getUploadPolicy(props.wid,user.value.uid, policyData)
        console.log(policy)
        const bucketName = policy['url']
          .split('https://storage.googleapis.com/')[1]
          .split('/')[0] //"https://storage.googleapis.com/bucketname/"
        const form = new FormData()
        form.append('bucket', bucketName)
        form.append('Content-Type', selectedFiles.value[i].type)
        // const objectName = selectedFiles.value[i].name

        for (const [key, value] of Object.entries(policy.fields)) {
          form.append(key, value)
        }
        form.append('file', selectedFiles.value[i])
        const request = new XMLHttpRequest()
        request.addEventListener('loadend', uploadEnd)
        request.upload.addEventListener('progress', uploadProgress(i))
        request.open('POST', policy.url)
        request.send(form)

      }
    }
    return {
      emit,
      filesAdded,
      upload,
      loading,
      tag,
      input_language,
      output_language,
      short_desc,
      dense,
      tags: ['Documentary', 'Live Talks', 'Movies'],
      unsavedTags,
      addTag,
      removeTag,
      uploadProgressArray,
      sent_email,
      inputLanguages, outputLanguages,
      fileRemoved,
      selectedFiles
    }
  }
})
</script>

<style lang="scss">
// Below change the header to 0 so it doesn't take extra space
// The q-uploader__dnd is a simi transparient overlay after drag and drop file
.n-video-uploader .q-uploader__header,
.n-video-uploader .q-uploader__dnd {
  height: 0px;
}
.n-video-uploader-drop-area:hover {
  background-color: $rabbit-purple-1;
}
.n-hover-red:hover {
  color: orange;
}
.videoTagging {
  display: flex;
}


</style>
