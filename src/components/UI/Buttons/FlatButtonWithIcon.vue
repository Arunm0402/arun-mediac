<template>
  <div>
    <q-btn
      size="md"
      flat
      no-caps
      style="white-space: pre"
      :ripple="false"
      class="row no-wrap q-pa-none text-grey-8 s-no-hover"
    >
      <div class="row no-wrap">
        <q-icon right class="q-mr-xs" :name="icon" :color="color" />
        {{ label }}
      </div>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: { type: String, default: 'grey-8' },
    label: { type: String, default: 'Flat button with icon' },
    icon: { type: String, default: 'cloud' },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
