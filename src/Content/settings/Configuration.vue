<template>
  <div>
  <q-btn
      icon="mdi-cog-outline"
      label="Configurations"
      no-caps
      no-wrap
      @click="configurationPopup">
    </q-btn>
    <q-dialog v-model="openDialog">
      <configuration-dialog></configuration-dialog>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ConfigurationDialog from 'src/components/Content/settings/ConfigurationDialog.vue'

export default defineComponent({
  name: 'Configuration',
  components:{
    ConfigurationDialog
  },
  setup() {

    const openDialog = ref(false)
    const configurationPopup = () => {
      openDialog.value = !openDialog.value
    }

    return {
      configurationPopup,
      openDialog
    }
  },
})
</script>

