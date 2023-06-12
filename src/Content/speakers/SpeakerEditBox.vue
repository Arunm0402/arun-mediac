<template>
  <q-input
        outlined
        v-model="formData.name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Name is required field']"
        dense
        @change="onSubmit"
      />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue'
import { speakerController } from 'src/services/speaker/speakerController'
import { responseInterface, speaker } from 'src/services/speaker/speakerTypes'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SpeakerEditBox',
  components:{
  },
  props:{
    speaker: {
      type: Object as PropType<speaker>,
      required: true
    }
  },
  setup(props, {emit}) {
    const { editSpeakers } =  speakerController()

    const $q = useQuasar()

    const loading = ref(false);

    const formData = reactive({
      name: props.speaker.name
     });

    const onSubmit = async () => {
      console.log('save record--------------------');
      loading.value = true;
      const response: responseInterface = await editSpeakers(props.speaker.id, formData.name);
      if (response.status == true) {
        loading.value = false;
        $q.notify({
          type: 'positive',
          message: response.message,
        });
        emit('success', false)
      } else {
        loading.value = false;
        $q.notify({
          type: 'negative',
          message: response.message,
        });
      }
    };

    return {
      formData,
      onSubmit,
      loading,
    }
  },
})
</script>

