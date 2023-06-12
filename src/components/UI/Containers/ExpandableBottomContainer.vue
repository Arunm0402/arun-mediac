<template>
  <div class="fixed-bottom flex column s-expandable-bottom-container">
    <div class="self-end" v-if="advanced">
      <q-btn
        @click="itemExpanded = !itemExpanded"
        :icon="itemExpanded ? 'mdi-arrow-down' : 'mdi-arrow-up'"
        :label="
          itemExpanded ? 'Hide Advanced Timeline' : 'Show Advanced Timeline'
        "
        flat
        no-caps
        class="q-px-lg text-grey-3 n-advanced-timeline-btn"
        :class="{'bg-rabbit-purple-6': !dark, 'bg-dark': dark}"
      />
    </div>

    <div v-else>

    </div>

    <div class="n-advanced-timeline-static-content">
      <slot name="static"> </slot>
    </div>
    <q-expansion-item
      dense
      v-model="itemExpanded"
      popup
      dark
      header-style="display:none"
      :duration="0"
    >
      <div style="min-height: 80px" class="q-pa-none"
      :class="{'bg-rabbit-purple-6': !dark, 'bg-dark': dark}">

        <slot name="advance-subtitle"> </slot>

      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    dark: { type: Boolean,  required: true },
    advanced: { type: Boolean, required: false, default: true }
  },
  setup() {
    const itemExpanded = ref(false);
    return { itemExpanded };
  },
});
</script>

<style lang="scss" scoped>
.n-advanced-timeline-btn {
  border-radius: 999px 0 0 0;
}
.n-advanced-timeline-static-content {
  box-shadow: 0px -1px 30px -3px rgba(44, 41, 51, 0.5);
}
</style>
