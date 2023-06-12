<template>
  <!--
  This component has a button with icon, triggers a menu
  menu content to be add in via <template></template>
 -->
    <q-btn
      :icon="icon"
      :label="label"

      flat
      no-caps
      :size="size"
      :color="color"
          >
      <q-menu fit auto-close>
        <slot></slot>
      </q-menu>
    </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: { type: String, default: 'Button Dropdown' },
    color: { type: String, default: 'grey-8' },
    icon: { type: String, default: 'cloud' },
    size: { type: String, default: 'md' },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
