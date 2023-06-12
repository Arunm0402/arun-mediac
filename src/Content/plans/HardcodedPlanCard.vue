<template>
  <div style="width:clamp(300px, 100%, 600px)">
    <div
      class="hardcoded-plan-card bordered q-pa-md q-ma-md column q-col-gutter-sm"
    >
      <!-- Title Section -->
      <div
        class="row items-center justify-between"
        :class="dark ? 'text-rabbit-purple-3' : 'text-rabbit-purple-6'"
      >
        <p style="font-size: 1.75rem">
          {{ planContent.type }}
        </p>

        <!-- Hard coded rules to calculate icons -->
        <q-icon :name="planTypeIcon" size="2.5rem" />
      </div>

      <div
        style="border-top: solid 1px; filter: opacity(20%)"
        class="bordered q-mt-sm q-pa-none"
      ></div>

      <!-- Pricing Section -->
      <div>
        <div class="row">
          <h4 class="q-my-none text-bold text-rabbit-purple">
            {{ planContent.price }}
          </h4>
          <p>{{ planContent.priceInformation }}</p>
        </div>

        <div :class="dark ? 'text-rabbit-purple-3' : 'text-rabbit-purple-6'">
          <p>{{ planContent.audience }}</p>
        </div>
      </div>

      <!-- Get Started Btn -->
      <div class="q-py-md">
        <plan-card-cta-btns
          :label="planContent.button"
          :link="planContent.ctaLink"
        />
      </div>

      <!-- Specifications -->
      <div class="row q-col-gutter-sm items-center">
        <div
          v-for="(spec, idx) in planContent.specifications"
          :key="idx"
          :class="
            planContent.specifications.length == 1
              ? 'col-12'
              : 'col-md-6 col-12'
          "
        >
          <div class="row no-wrap q-col-gutter-sm items-center">
            <q-icon
              :name="spec.icon"
              :size="planContent.specifications.length == 1 ? '1.5rem' : ''"
            />
            <p>{{ spec.text }}</p>
          </div>
        </div>
      </div>

      <div
        style="border-top: solid 1px; filter: opacity(20%)"
        class="bordered q-mt-sm q-pa-none"
      ></div>

      <!-- Features -->
      <div class="row q-col-gutter-sm items-center">
        <div
          v-for="(feat, idx) in planContent.features"
          :key="idx"
          class="col-12"
        >
          <div class="row no-wrap q-col-gutter-sm items-center">
            <q-icon name="check" />
            <p>{{ feat }}</p>
          </div>
        </div>
      </div>

      <!--  -->
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'

import { computed, defineComponent, PropType } from 'vue'
import { planContentInterface } from 'src/services/subscription/subscriptionTypes'
import PlanCardCtaBtns from './PlanCardCtaBtns.vue'

export default defineComponent({
  components: { PlanCardCtaBtns },
  props: {
    planContent: {
      type: Object as PropType<planContentInterface>,
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar()

    const dark = computed(() => $q.dark.isActive)

    const planTypeIcon = computed(() => {
      if (['Teams', 'Enterprise'].includes(props.planContent.type)) {
        return 'mdi-account-group-outline'
      }
      return 'mdi-account-outline'
    })

    return { planTypeIcon, dark }
  }
})
</script>

<style lang="scss" scoped>
.hardcoded-plan-card {
  border: solid 2px;
  border-radius: 8px;
  transition: all 0.15s;
  background-image: url('src/assets/ScribeRabbit-Head-filled-right.svg');
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 170%;
  background-size: 7rem ;
}

.hardcoded-plan-card:hover {
  background-color: rgb(255 203 47 / 7%);
  transform: scale(1.03);
  background-position-y: 100%;
}

.bordered {
  border-color: $rabbit-purple;
}

.body--dark .bordered {
  border-color: $rabbit-purple-3;
}

p {
  font-size: 18px;
  margin: 0;
}
</style>
