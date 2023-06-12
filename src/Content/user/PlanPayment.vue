<template>
  <q-card flat bordered>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
            <p class="q-my-none userheader-2">Current Plan</p>
            <h5 class="plan-header q-mt-md"> {{label}} Standard</h5>
            <p class="q-my-none textbody"> {{subLabel}} </p>

          </div>
          <div class="col-5 text-right">
            <div class="q-my-none userbody">Next Billing : $20 on 31 Dec 2021</div>
            <q-btn
            label="Update Plan"
            flat
            no-caps
            size="lg"
            class="bg-rabbit-orange self-start text-white q-mt-lg q-px-lg q-mb-lg"
            @click="goToUpgradePlanPage()"
          />
        </div>

      <div class="col-2">
          <br/>
          <q-btn
            label="Update Plan"
            flat
            no-caps
            size="md"
            class="bg-rabbit-orange self-start text-white q-mt-xls q-px-lg q-mb-lg"
            @click="goToUpgradePlanPage()"
          />
        <q-btn
            flat
            no-caps
            size="sm"
            class="usertextbutton q-mt-xls q-px-lg q-mb-lg"
            dense
            >
            <span style="text-decoration: underline;font-size:10pt;">Cancel Subscription</span>
        </q-btn>

      </div>

        </div>
      </div>

    <div class="q-pa-md">

    <div class="row">
      <div class="col">
        <p class="q-my-none plan-header-2">Payment Method</p>
      </div>
    </div>
      <div class="row items-center">
        <div class="col-1">
          <q-icon name="mdi-credit-card" size="md"></q-icon>
        </div>
        <div class="col">
          <p class="userbody q-mt-md">****  ####</p>
        </div>
        <div class="col-2">
            <q-btn
              flat
              no-caps
              size="sm"
              class="usertextbutton q-mt-xls q-px-lg q-mb-lg"
            >
              <span style="text-decoration: underline; font-size:12pt;">Remove</span>
            </q-btn>
        </div>
        <div class="col-2">
          <q-btn
              label="Change Card"
              flat
              no-caps
              size="md"
              class="bg-rabbit-orange self-start text-white q-mt-xls q-px-lg q-mb-lg"
            />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { subscriptionController } from 'src/services/subscription/subscriptionController'
import { keycloakController } from 'src/services/auth/keycloakController'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup(){

    const label = ref('')
    const subLabel = ref('')
    const router = useRouter()
    const { user } = keycloakController()
    const {
      getCurrUserSubscription,
      currentUserSubscription
    } = subscriptionController()

    const goToUpgradePlanPage = () => {
      void router.push('/purchase')
    }

    onMounted(async ()=> {
      await getCurrUserSubscription(user.value.uid)
      label.value = currentUserSubscription.value.details.information.label
      subLabel.value = currentUserSubscription.value.details.information.sub_label
    })

    return {
      label,
      subLabel,
      goToUpgradePlanPage
    }
  }
})
</script>


<style lang="scss" scoped>
.textbody {
  font-size: 24px;
  color:#240561;
  font-style: normal;
  font-weight: 600;
  padding-top: 2%;

}

.plan-header {
    font-size: 40px;
    color: #000000;
    font-style: normal;
    font-weight: 700;
}

@media (min-width: 600px) {
  #plan
  .q-dialog__inner--minimized > div {
    min-width: 60vw;
    min-height: 700px;
    box-shadow: none;
  }
}

</style>

