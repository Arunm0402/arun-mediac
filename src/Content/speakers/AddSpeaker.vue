<template>
 <q-card class="q-page-dark" style="width: 700px; max-width: 80vw;  ">
    <q-card-section class="row items-center">
      <div class="text-h6">Add Speaker</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-separator />
<q-form ref="documentForm" @submit="onSubmit">
  <q-card-section>
      <div class="row q-col-gutter-md justify-center">
          <div class="col-12 col-md-6">
            <div class="q-gutter-y-md column">
              <q-input
                outlined
                v-model="formData.name"
                label="Name *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Name is required field']"
                dense
              />
            </div>
          </div>
        </div>
  </q-card-section>
  <q-card-actions class="row text-center q-mb-md">
      <div class="col-md-12 q-gutter-md">
        <q-btn
          label="Close"
          no-caps
          size="md"
          v-close-popup
          >
        </q-btn>
        <q-btn color="primary" type="submit" :disable="loading">
          <template v-if="loading">
            <q-spinner color="white" /> Saving...
          </template>
          <template v-else>
             <q-icon name="mdi-content-save" size="xs" /> Save
          </template>
        </q-btn>
      </div>
    </q-card-actions>
</q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { speakerController } from 'src/services/speaker/speakerController'
import { responseInterface } from 'src/services/speaker/speakerTypes'
import { QForm, useQuasar } from 'quasar'

export default defineComponent({
  name: 'AddSpeaker',
  components:{
  },
  setup(_, {emit}) {
    const { addSpeakers } =  speakerController()

    const $q = useQuasar()

    const loading = ref(false);

    const documentForm = ref<QForm | null>(null)

    const initialFormData = {
      id: 0,
      name: ''
    };
    const formData = reactive({ ...initialFormData });

    const onSubmit = async () => {

      loading.value = true;
      formData.id = Math.floor(Math.random() * 100);
      const response: responseInterface = await addSpeakers(formData);
      if (response.status == true) {
        loading.value = false;
        $q.notify({
          type: 'positive',
          message: response.message,
        });

        documentForm.value?.resetValidation();
        emit('success', false)
      } else {
        loading.value = false;
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
    };

    const onReset = () => {
      Object.assign(formData, initialFormData);
    };

    return {
      formData,
      onSubmit,
      onReset,
      loading,
      documentForm
    }
  },
})
</script>

