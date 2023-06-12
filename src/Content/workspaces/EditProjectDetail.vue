<template>
  <div>
    <q-card class="no-margin fit" style="box-shadow: none">
      <q-card-section
        class="text-center"
        style="padding-top: 0; padding-bottom: 0"
      >
        <h5>Project Detail</h5>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-1" />
          <label class="col-3 text-right q-pr-md text-deep-purple-9">Project Name:</label>
          <div class="col-7">
            <q-input required dense outlined v-model="newName"/>
            <p v-if="!nameNotDuplicate" style="color: red; font-size: 12px;">This name has already existed!</p>
            <br v-else>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-1" />
          <label class="col-3 text-right q-pr-md text-deep-purple-9">Tags:</label>
          <div class="col-7 row">
            <EditTags :vid="vid" :unsavedTags = "unsavedTags" @addTag="addTag" @removeTag="removeTag">
            </EditTags>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-4" />
          <div class="col-2">
            <q-btn v-close-popup label="Cancel" />
          </div>
          <div class="col-2">
            <q-btn label="Save" @click="save()" color="grey-8"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, toRef, Ref, onMounted} from 'vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { artifact } from 'src/services/artifacts/artifactTypes'
import EditTags from 'src/components/Content/videocard/EditTags.vue'
import { filenameController } from 'src/services/filename/filenameController'

export default defineComponent({
  components: {
    EditTags
  },
  props: {
    vid: {
      type: Object as PropType<artifact>,
      required: true
    }
  },
  setup(props, {emit}) {
    console.log(props.vid.upload_uri)
    const { editArtifactByName, checkDuplications } = artifactController()
    const newName = ref(props.vid.name)
    const nameNotDuplicate = ref(false)

    const { sanitiseFileName } = filenameController()
    const tags = toRef(props.vid, 'tags')


    const unsavedTags:Ref<Array<string>> = ref([])
    onMounted(()=>{
      tags.value?.forEach(aTag => {
        unsavedTags.value.push(aTag)
      })

      nameNotDuplicate.value = checkDuplications(props.vid.name, props.vid.aid)
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
    const save = async () => {
      console.log(props.vid.aid)
      console.log(newName.value)
      nameNotDuplicate.value = checkDuplications(newName.value, props.vid.aid)
      console.log(nameNotDuplicate.value, 'nameNotDuplicate.value---');
      if (nameNotDuplicate.value) {
        const edit = await editArtifactByName(
          props.vid,
          sanitiseFileName(newName.value),
          unsavedTags.value
        )
        console.log(edit)
        emit('closeDialog', false)
      }
    }


    return {
      newName, nameNotDuplicate,
      tags,
      unsavedTags,
      removeTag,
      addTag,
      save,
    }
  }
})
</script>

<style></style>
