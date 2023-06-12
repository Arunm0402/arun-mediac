<template>
  <!-- Feature (Image on the right) -->
  <div class="row justify-center q-pt-xl q-py-md-xl"
  :class="`bg-${bgRabbit}`"
  >
    <div
      class="
      col-12 col-md-6
      column
      justify-center
      items-md-end items-center
      order-last
      "
      style="max-width: 800px"
    >
       <slot name="image1" />
    </div>
    <div
      class="col-12 col-md-6 column justify-center text-rabbit-purple q-pa-md"
      style="max-width: 600px"
    >
       <slot name="feature1" />
    </div>
  </div>

  <!-- Feature 2 (Image on the left) -->
  <div class="row justify-center q-py-none q-py-md-xl"
  :class="`bg-${bgRabbit}`"
  >
    <div
      class="
      col-12 col-md-6
      column
      justify-center
      items-md-start items-center
      order-last order-md-first
      "
      style="max-width: 800px"
    >
      <slot name="image2" />
    </div>
     <div
      class="col-12 col-md-6 column justify-center text-rabbit-purple q-pa-md"
      style="max-width: 600px"
    >
      <slot name="feature2" />
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { modeConfigController } from 'src/services/userSettings/modeConfigController';

export default defineComponent({
  name: 'Features',
  setup() {
    const { bgRabbit } = modeConfigController()
    return {
      bgRabbit
    }
  },
})
</script>

<style lang="scss" scoped></style>
