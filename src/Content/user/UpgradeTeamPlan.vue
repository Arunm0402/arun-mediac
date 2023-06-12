<template>
  <q-card style="width: 850px; max-width: 90vw;">
    <q-item>
      <q-item-section>
        <q-item-label>
          <h5 class="text-rabbit-purple">
            Upgrading to: Teams Plan
          </h5>
        </q-item-label>
      </q-item-section>
    </q-item>
      <q-separator></q-separator>
      <q-card-section class="row" horizontal>
        <q-card-section class="col-7 col-xs-7">
          <div class="row q-mb-md">
            <label class="col-12 col-xs-12 text-weight-bold text-deep-purple-10 text-h6">Seats</label>
            <div class="col-6">
              <q-select dense outlined :options="options0" label="5 users" v-model="model"/>
            </div>
          </div>
          <div class="row q-mb-md">
            <label class="col-12 col-xs-12 text-weight-bold text-deep-purple-10 text-h6">Billing Period</label>
            <div class="col-6">
              <q-option-group
                type="radio"
                v-model="billing"
                :options="options1"
                color="primary"
                />
            </div>
          </div>
          <div class="row q-mb-md">
            <label class="col-12 col-xs-12 text-weight-bold text-deep-purple-10 text-h6">Payment Method</label>
            <div class="col-6">
              <q-option-group
                type="radio"
                v-model="payment"
                :options="options2"
                color="primary"
                />
            </div>
          </div>

          <div class="row q-mb-md justify-between">
            <label class="col-12 col-xs-12 text-weight-bold text-deep-purple-10 text-h6">Credit Card Details</label>
            <div class="col-12 q-mb-md">
              <q-input outlined dense label="Cardholder name"/>
            </div>
            <div class="col-12 q-mb-md">
               <q-input outlined dense label="Card number"/>
            </div>
            <div class="col-4 col-xs-6 q-mb-md q-pr-sm">
                <q-input outlined dense class="" label="MM/YY"/>
              </div>
              <div class="col-4 col-xs-6 q-mb-md">
                <q-input outlined dense class="" label="CVV"/>
              </div>
          </div>

          <div class="row q-mb-md">
            <label class="col-12 col-xs-12 text-weight-bold text-deep-purple-10 text-h6">Billing Information</label>
            <div class="col-7 q-pr-sm">
               <q-input outlined dense label="Country"/>
            </div>
            <div class="col-5">
              <q-input outlined dense label="Postal Code"/>
            </div>
            <div class="col-12 q-mt-sm">
              <q-input outlined dense label="Address" />
            </div>
          </div>

        </q-card-section>

      <q-separator vertical></q-separator>
      <q-card-section class="col-4 col-xs-5">
        <h6 class="text-rabbit-purple q-mt-none q-mb-sm">What you will get:</h6>


        <!-- Specifications -->
          <div v-for="(spec, index) in selectedData.specifications" :key="index" class="row justify-start q-mt-lg q-ml-md">
              <q-icon size="md" :name="selectedData.icons[index]"/>
              <p class="q-my-none text-weight-bold n-new-line">
                  {{spec}}
              </p>
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
        <div  v-for="(feature, index) in selectedData.features" :key="index" class="col justify-start q-mt-lg q-ml-md">
          <div class="row q-my-none">
            <q-icon size="md" name="mdi-check"/>
            <p class="q-my-none text-weight-bold">
              {{feature}}
            </p>
          </div>
        </div>


      </q-card-section>
      </q-card-section>
  <q-separator q-separator></q-separator>
  <q-card-section>
    <div class="row">
      <div class="col-9">

      </div>
      <div class="col-3 text-center">
        <q-btn
        label="Purchase"
        style="background: #FF8066; color: white;"
        @click = "purhchasePlan()"
        />
      </div>
    </div>
  </q-card-section>

  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { subscriptionController } from 'src/services/subscription/subscriptionController'
import { subscriptionInterface, monthlySubscriptionInterface } from 'src/services/subscription/subscriptionTypes'
import { keycloakController } from 'src/services/auth/keycloakController'

export default defineComponent({
  setup() {
    const billing = ref('annual')
    const payment = ref('creditcard')
    const model = ref(null)
    const subscriptionData = ref(<subscriptionInterface>{})
    const currrUserSubscriptionID = ref(0)
    const { user } = keycloakController()
    const selectedData = ref(<monthlySubscriptionInterface>{})

    const {
      popUpSubscriptionID,
      getSubscriptionByID,
      onDisplaySubscription,
      currentUserSubscriptionID,
      purchaseSubscription,
      getMonthlySubscriptionsToDisplay,
      closeUpgradePlanPopUp
    } = subscriptionController()



    const purhchasePlan = async () => {

      // Constructing payload
      let data = {
        'details': onDisplaySubscription.value.details,
        'app': onDisplaySubscription.value.app,
        'status': 'active', // Active by default
        'period':24, // From user-dropdown
        'sid':popUpSubscriptionID.value,
        'uid':user.value.uid,
        'deactivate_id':currrUserSubscriptionID.value
      }
      console.log(data, 'purhchasePlan-------------');
      await purchaseSubscription(data)

      // Close pop up
      closeUpgradePlanPopUp()

    }

    onMounted( async() => {
      await getSubscriptionByID(popUpSubscriptionID.value)
      subscriptionData.value = onDisplaySubscription.value
      currrUserSubscriptionID.value = currentUserSubscriptionID.value
      selectedData.value = getMonthlySubscriptionsToDisplay(onDisplaySubscription.value.details, currentUserSubscriptionID.value)
    })

    const options0 = [
      '5 users', '3 users'
    ]
    const options1 = [
      {
        label: 'Annual ($48/month) - Save 20%!',
        value: 'annual'
      },
      {
        label: 'Monthly ($60/month)',
        value: 'monthly'
      }
    ]
    const options2 = [
      {
        label: 'Credit Card',
        value: 'creditcard'
      }, {
        label: 'Invoice',
        value: 'invoice'
      }
    ]
    return {
      options0,
      options1,
      billing,
      options2,
      payment,
      model,
      popUpSubscriptionID,
      subscriptionData,
      purhchasePlan,
      selectedData
    }
  },
})
</script>


<style>

</style>
