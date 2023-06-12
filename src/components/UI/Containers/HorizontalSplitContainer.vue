<template>
  <!-- Slots : left, right -->
  <div>
    <q-splitter
      @update:model-value="
        (val) => {
          emit('resize', val);
        }
      "
      unit="%"
      v-model="splitterRef"
    >
      <template v-slot:before>
        <div class="s-editor-body-video-area">
          <slot name="left"></slot>
        </div>
      </template>
      <template v-slot:separator>
        <q-icon name="mdi-arrow-split-vertical" size="30px" />
      </template>
      <template v-slot:after>
        <div id="editorBodySutitleEditor" class="s-editor-body-subtitle-editor">
          <slot name="right"></slot>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const splitterRef = ref(25);

    return {
      splitterRef,
      emit,
    };
  },
});
</script>

<style scoped></style>
