<template>
  <VideoTags :unsavedTags="unsavedTags" removable @emitRemoveTag="emitRemoveTag">
    <template v-slot:default="{ item = 'No Tag' }">
      {{ item }}
    </template>
    <template #addTag>
      <div class="">
        <q-btn-dropdown size="sm" class="q-pa-xs" color="rabbit-purple-8" label="Add a tag" icon="mdi-plus-circle-outline" dropdown-icon="none" outline rounded v-model="openMenu">

            <q-item >
              <q-select
                rounded
                outlined
                no-caps
                dense
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                @filter="filterFn"
                @input-value="setModel"
                :options="tagOptions"
                label="Add Tag"
                :model-value="addNewTag"
                @keydown.enter="emitAddTag"
                color = "rabbit-purple-8"
              >
                <template v-slot:prepend >
                  <q-icon
                    name="mdi-plus-circle-outline"
                    size="1.5rem"
                    @click="emitAddTag"
                    color = "rabbit-purple-8"
                  />
                </template>
              </q-select>
            </q-item>

        </q-btn-dropdown>
      </div>


    </template>
  </VideoTags>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef, onMounted} from 'vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import VideoTags from 'src/components/Content/videocard/VideoCardTags.vue'
export default defineComponent({
  components: {
    VideoTags
  },
  emits:['addTag', 'removeTag'],

  props: {
    wid:{
      type: String,
      required: true
    },
    unsavedTags: {
        type: Array,
        required: true
    },
  },

  setup(_, context) {
    const {getAvailableTags } = artifactController()
    const availableTags:ComputedRef<string[]> = computed(getAvailableTags)
    const tagOptions = ref(availableTags.value)

    //add a tag and close dropdown and clear the form
    const addNewTag = ref('')
    const openMenu = ref(false)
    function emitAddTag(){
      console.log('emitAddTag')
      context.emit('addTag', addNewTag.value)
      openMenu.value = false
      addNewTag.value = ''
    }

    onMounted(()=>{
      console.log(getAvailableTags(), 'availableTags.value--------------');
    })

    //remove a tag
    function emitRemoveTag(tag:string){
      context.emit('removeTag', tag)
    }

    //filter for autofill tag
    const filterFn = (userInput:string, update:(n:() => void) => void) => {
      update(() => {
        const needle = userInput.toLowerCase()
        tagOptions.value = availableTags.value.filter((v:string) => v.toLowerCase().indexOf(needle) > -1)
      })
    }
    const setModel = (val:string) => {
      addNewTag.value = val
    }

    // function focusOnInput(){
    //   document.getElementById('tagInput').focus()
    // }

    return {
      emitRemoveTag,
      emitAddTag,
      addNewTag,
      filterFn,
      availableTags,
      tagOptions,
      setModel,
      openMenu,
    }
  }
})
</script>

<style></style>
