<template>
  <q-select
    filled
    multiple
    :options="availableTags"
    use-chips
    stack-label
    label="Tag selection"
    >
    <template v-slot:no-option>
    <q-item>
        <q-item-section class="text-italic text-grey">
        No tags available
        </q-item-section>
    </q-item>
    </template>
    </q-select>
</template>

<script lang="ts">
import { defineComponent, computed} from 'vue'
import { artifactController } from '../../../services/artifacts/artifactsController'
export default defineComponent({
    name: 'TagFilter',
    

    setup(){
        const  {getAvailableTags} = artifactController()

        //Get available tags from existing artifacts
        const availableTags = computed(getAvailableTags)

        return{
            availableTags,
        }
    }
})
</script>
    
<style>

</style>