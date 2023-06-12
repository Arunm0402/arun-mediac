<template>
 <q-card class="q-page-dark" style="width: 700px; max-width: 80vw;  ">
    <q-card-section class="row items-center">
      <div class="text-h6">Edit Speaker</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-separator />

  <q-card-section>
    <q-list v-if="speakers.length > 0">
        <q-item  v-for="speaker in speakers" :key="speaker.id">
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >{{ speaker.name.charAt(0) }}</q-btn>
          </q-item-section>
          <q-item-section v-if="editable == speaker.id">
            <speaker-edit-box :speaker="speaker" @success="closeEditBox"></speaker-edit-box>
          </q-item-section>
          <q-item-section v-else class="cursor-pointer">
            <q-item-label @click="openEditBox(speaker.id)">{{ speaker.name }} <q-icon name="edit" /></q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              120 sentences
              <q-btn size="sm" round color="gray" icon="mdi-account-remove" @click="remove(speaker.id)" ></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
    </q-card-section>

  <q-card-actions class="row text-center q-mb-md">
      <div class="col-md-12">
        <q-btn
          label="Close"
          no-caps
          size="md"
          v-close-popup
          >
        </q-btn>
      </div>
    </q-card-actions>

  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { speakerController } from 'src/services/speaker/speakerController'
import SpeakerEditBox from 'src/components/Content/speakers/SpeakerEditBox.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'EditSpeaker',
  components:{
    SpeakerEditBox
  },
  setup() {
    const { speakers, deleteSpeaker } =  speakerController()

    const $q = useQuasar()

    const editable = ref<number | null>(null)

    const openEditBox = (id: number) => {
      editable.value = id
    }

    const closeEditBox = () => {
      editable.value = null
    }


    const remove = (id: number) => {
      const res = deleteSpeaker(id)
      if(res == true){
        $q.notify({
          type: 'positive',
          message: 'Speaker has deleted.',
        })

      }else{
        $q.notify({
          type: 'negative',
          message: 'Something Went Wrong, Please Try Again.',
        })
      }
    }

    return {
      speakers,
      remove,
      editable,
      openEditBox,
      closeEditBox
    }
  },
})
</script>

