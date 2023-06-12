<template>
        <q-btn-dropdown size='xs' flat>
          <template v-slot:label>
              <q-item-section avatar top class="item-right" style="min-width:40px">
                    <q-btn size="xs" outline round color="gray" >{{ defaultSpeaker?.name.charAt(0) }}</q-btn>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ defaultSpeaker?.name }}</q-item-label>
                </q-item-section>
            </template>
          <q-list v-if="speakers.length > 0">
            <q-item v-for="speaker in speakers" :key="speaker.id" clickable v-close-popup>
                <q-item-section avatar top class="item-right" style="min-width:40px">
                    <q-btn size="xs" outline round color="gray" >{{ speaker.name.charAt(0) }}</q-btn>
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ speaker.name }}</q-item-label>
                </q-item-section>
            </q-item>
        <!-- addSpeakerPopup --
        line 65-67
        open add dialog
        -->
        <q-item >
          <q-item-section class="text-center">
            <q-btn
              icon="mdi-account-plus"
              label="New Speaker"
              no-caps
              size="md"
              @click="addSpeakerPopup">
            </q-btn>
          </q-item-section>
        </q-item>
        </q-list>

        </q-btn-dropdown>

    <q-dialog v-model="openAddDialog">
        <add-speaker @success="closeAddDialog"></add-speaker>
    </q-dialog>


</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import AddSpeaker from 'src/components/Content/speakers/AddSpeaker.vue'
import { speakerController } from 'src/services/speaker/speakerController'
import { speaker } from 'src/services/speaker/speakerTypes'

export default defineComponent({
  name: 'SpeakerDiarization',
  components:{
    AddSpeaker
  },
  setup() {
    const { getSpeakers, speakers } =  speakerController()
    const openDialog = ref(false)
    const openAddDialog = ref(false)

    const defaultSpeaker = ref<speaker | null>(null)

    const editSpeakerPopup = () => {
      openDialog.value = !openDialog.value
    }

    const addSpeakerPopup = () => {
      openAddDialog.value = !openAddDialog.value
    }

    onMounted(async () => {
      await getSpeakers()
      if(speakers.value.length > 0){
        defaultSpeaker.value = speakers.value[0]
      }

    })

    const closeAddDialog = (status: boolean) => {
      openAddDialog.value = status
    }

    return {
      editSpeakerPopup,
      openDialog,
      speakers,
      openAddDialog,
      addSpeakerPopup,
      defaultSpeaker,
      closeAddDialog
    }
  },
})
</script>

<style scoped>
</style>
