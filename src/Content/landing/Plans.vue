<template>
  <div
    class=" row justify-center content-center q-pt-xl q-mb-xs q-ml-sm q-mr-sm"
  >
    <div class="column items-center">
      <h3 class="text-rabbit-purple text-weight-bold  q-my-none text-center">
         <slot name="Label"></slot>
      </h3>
      <p
        class="text-rabbit-purple q-my-lg text-h4"
        style="text-align: center">
        <slot name="Sublabel"></slot>
      </p>
    </div>
  </div>
  <div
    class="row justify-center content-center text-rabbit-purple q-my-none"
  >
  <q-tabs
    v-model="tab"
    class="n-price-tabs"
    active-bg-color="rabbit-purple"
    active-color="white"
    indicator-color="transparent"
    no-caps
  >
    <q-tab name="Monthly" label="Monthly" class="n-price-tab"/>
    <q-tab name="Annual" label="Annual" class="n-price-tab"/>
  </q-tabs>

  <q-card flat
    class="q-my-md full-width"
  >
    <q-tab-panels v-model="tab" animated class="n-price-tab-panels">
      <q-tab-panel name="Monthly">
        <monthly-plans/>
      </q-tab-panel>

      <q-tab-panel name="Annual">
      </q-tab-panel>
    </q-tab-panels>
    </q-card>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import MonthlyPlans from 'src/components/Content/plans/MonthlyPlans.vue'

export default defineComponent({
  name: 'Pricing',
  components: {
    MonthlyPlans
  },
  setup() {

    const tab = ref('Monthly')

    return {
      tab,
    }
  },
})
</script>
<style lang="scss" scoped>
.n-tab-border {
  border-top-left-radius: 5rem;
  border-bottom-left-radius: 5rem;
  border-top-right-radius: 5rem;
  border-bottom-right-radius: 5rem;
}

.n-price-tab{
  @extend .n-tab-border;
  width:10rem;
  height:3rem;
  margin:0.1rem;
}

.n-price-tabs{
  @extend .n-tab-border;
  outline: 3px solid hsl(260, 90%, 20%);
}
</style>



