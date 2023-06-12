<template>
  <!-- hover - info icon -->
  <q-icon
    name="mdi-information-outline"
    size="1.15rem"
    class="text-rabbit-purple-6 cursor-pointer"
  >
    <q-tooltip>
      Uploaded on: {{ formattedDateCreated }}
      <br />
      Last Edited on:
      {{ formattedDateModified }}
    </q-tooltip>
  </q-icon>
</template>

<script lang="ts">
import { date } from 'quasar'
import { artifact } from 'src/services/artifacts/artifactTypes'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    vid: {
      type: Object as PropType<artifact>,
      required: true
    }
  },
  setup(props) {
    const formattedDateCreated = date.formatDate(
      props.vid.date_created,
      'DD MMM YYYY HH:mm'
    )
    const formattedDateModified = date.formatDate(
      props.vid.date_modified,
      'DD MMM YYYY HH:mm'
    )
    return { formattedDateCreated, formattedDateModified }
  }
})
</script>

<style></style>
