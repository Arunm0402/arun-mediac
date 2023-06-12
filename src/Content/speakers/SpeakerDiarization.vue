<template>
 <q-card flat>
   <q-card-section class="row items-center">
      <div class="text-h6">Speaker Diarization
        <!-- <q-btn outline round size="sm" icon="mdi-account" @click="addSpeakerPopup" /> -->
        </div>
      <q-space />
      <q-btn icon="close" flat round dense @click="removeSDUi"/>
    </q-card-section>
    <q-card-section>
        <q-list v-if="speakers.length > 0">
        <q-item v-for="speaker in speakers" :key="speaker.id">
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >{{ speaker.name.charAt(0) }}</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ speaker.name }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>120 sentences</q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
    </q-card-section>

    <q-card-actions class="row text-center">
      <div class="col-md-12">
        <q-btn
          icon="mdi-account-settings"
          label="Edit Speaker"
          no-caps
          size="md"
          @click="editSpeakerPopup"
          >
        </q-btn>
      </div>
      <q-dialog v-model="openDialog">
        <edit-speaker @success="closeEditDialog"></edit-speaker>
      </q-dialog>
    </q-card-actions>
    <q-dialog v-model="openAddDialog">
        <add-speaker @success="closeAddDialog"></add-speaker>
    </q-dialog>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import EditSpeaker from 'src/components/Content/speakers/EditSpeaker.vue'
import AddSpeaker from 'src/components/Content/speakers/AddSpeaker.vue'
import { speakerController } from 'src/services/speaker/speakerController'
import { artifactController } from 'src/services/artifacts/artifactsController'

export default defineComponent({
  name: 'SpeakerDiarization',
  components:{
    EditSpeaker,
    AddSpeaker
  },
  setup() {
    const { getSpeakers, speakers } =  speakerController()
    const { setSpeakerDiarizationUi } = artifactController()
    const openDialog = ref(false)
    const openAddDialog = ref(false)
    const editSpeakerPopup = () => {
      openDialog.value = !openDialog.value
    }

    const addSpeakerPopup = () => {
      openAddDialog.value = !openAddDialog.value
    }

    const closeAddDialog = (status: boolean) => {
      openAddDialog.value = status
    }

    const closeEditDialog = (status: boolean) => {
      openDialog.value = status
    }

    onMounted(async () => {
      await getSpeakers()
    })

    const removeSDUi = () => {
      void setSpeakerDiarizationUi(false)
    }

    return {
      editSpeakerPopup,
      openDialog,
      speakers,
      openAddDialog,
      addSpeakerPopup,
      closeAddDialog,
      closeEditDialog,
      removeSDUi
    }
  },
})
</script>

