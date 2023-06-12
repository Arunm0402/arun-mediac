<template>
 <q-card flat>
   <q-card-section class="row items-center">
      <div class="text-h6">Speaker Diarization</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section>
        <q-list>
        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >J</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jane Robertson</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>120 sentences</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >B</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Barry Tone</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>199 sentences</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >T</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Thomas Salvador</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>0 sentence</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >S</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sam Paige</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>50 sentences</q-item-label>
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
      <edit-speaker></edit-speaker>
    </q-dialog>
      </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditSpeaker from 'src/components/Content/subtitles/slidepanel/EditSpeaker.vue'

export default defineComponent({
  name: 'SpeakerDiarization',
  components:{
    EditSpeaker
  },
  setup() {
    const openDialog = ref(false)
    const editSpeakerPopup = () => {
      openDialog.value = !openDialog.value
    }
    return {
      editSpeakerPopup,
      openDialog
    }
  },
})
</script>

