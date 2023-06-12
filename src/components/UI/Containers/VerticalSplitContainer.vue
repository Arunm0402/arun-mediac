<template>
  <!-- 
  Temporarily disabled the drag function because it's too hard
  to calculate the video ratio. Without know the video display
  ratio, the video will have an ugly scroll bar.
  -->
  <div style="height: 100%">
    <q-splitter disable horizontal style="height: 100%">
      <template v-slot:before>
        <div>
          <slot name="top"></slot>
        </div>
      </template>

      <template v-slot:after>
        <div>
          <slot name="bottom"></slot>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: { draggable: { type: Boolean, default: true } },
  setup() {
    let splitterRef = ref(50);
    return {
      splitterRef,
    };
  },
});
</script>

<style scoped></style>
