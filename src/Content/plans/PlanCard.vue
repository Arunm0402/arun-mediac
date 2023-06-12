<template>
  <div class="q-ma-sm">
    <!-- Name of plan -->
    <div class="row justify-start ">
      <div class="col q-pt-md">
        <h4 class="text-rabbit-purple q-my-none">
          {{ title }}
        </h4>
      </div>
      <div class="col" style="text-align:right">
        <q-icon
          size="xl"
          :name="icon"
          class="text-rabbit-purple-6 q-my-none q-mr-md q-pt-md"
        />
      </div>
    </div>

    <!-- Pricing & target audience-->
    <div class="row justify-start q-mt-md">
      <h3 class="text-rabbit-purple q-my-none text-weight-bold" >
        {{ price }}
      </h3>
      <span class="q-pl-md n-new-line">
        {{priceInformation}}
      </span>
    </div>
    <h6 class="text-rabbit-purple text-weight-light q-mb-none q-mt-sm">
      {{ audience }}
    </h6>

    <div class="row justify-start q-mt-lg">
      <q-btn
        :label="button"
        rounded
        flat
        no-caps
        size="lg"
        class="bg-rabbit-orange self-center text-white"
        padding="0.5rem 3.5rem"
        @click="emit('openUpgradePopup',id)"
      />
    </div>

  <!-- Specifications -->
    <div v-for="(spec, index) in specifications" :key="index" class="col justify-start q-mt-lg q-ml-md">
      <div class="row">
        <q-icon size="md" :name="icons[index]"/>
        <p class="q-my-none text-weight-bold n-new-line">
            {{spec}}
        </p>
      </div>
    </div>

  <q-separator
    color="rabbit-purple"
    size="0.2rem"
    class="q-mt-md"
    style="
    width:20%;
    "
  />

  <!-- Features -->
  <div  v-for="(feature, index) in features" :key="index" class="col justify-start q-mt-lg q-ml-md">
    <div class="row q-my-none">
      <q-icon size="md" name="mdi-check"/>
      <p class="q-my-none text-weight-bold">
        {{feature}}
      </p>
    </div>
  </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  name: 'PlanCard',
  props: {
    id: {  // refers to subscription id
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    audience: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: ''
    },
    price: {
      type: String,
      default: ''
    },
    priceInformation: {
      type: String,
      default: ''
    },
    specifications: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    icons: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    features: {
      type: Array as PropType<string[]>,
      default: () => []
    },
  },
  setup(_,{emit}) {
    return {
      emit
    }
  },
})
</script>

<style lang="scss" scoped>
.n-new-line {
  white-space: pre-line;
}
</style>
