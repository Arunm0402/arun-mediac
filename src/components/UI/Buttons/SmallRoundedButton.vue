<template>
    <q-btn
      :label="label"
      :icon="icon"
      color="grey-6"
      no-caps
      size="sm"
      class="q-ml-sm"
      tabindex="-1"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    icon: { type: String, default: 'mdi-heart' },
    label: { type: String, default: 'Button Label' },
  },
  setup() {
    return {};
  },
});
</script>

<style>
.n-small-rounded-button {
  padding: 0 0.6rem;
  min-height: 22px !important;
  font-size: 0.7rem !important;
  border: solid 1px hsl(260, 10%, 30%);
  color: hsl(260, 10%, 30%);
  background-color: rgb(255, 255, 255);
}
.n-small-rounded-button i {
  font-size: 0.8rem !important;
}
</style>
