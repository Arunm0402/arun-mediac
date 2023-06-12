<template>
  <div
    class="content-center justify-evenly row"
  >
    <plan-card
      class="n-pricing-card col-lg col-md-5 col-sm-5 q-gutter-xs"
      v-for="plan in subscriptionsRef"
      :key="`${plan.id}`"
      v-bind="plan"
      @openUpgradePopup="openUpgradePopup"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import PlanCard from 'src/components/Content/plans/PlanCard.vue'
import { subscriptionController } from 'src/services/subscription/subscriptionController'
import { monthlySubscriptionInterface } from 'src/services/subscription/subscriptionTypes'
import { keycloakController } from 'src/services/auth/keycloakController'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MonthlyPlans',
  components:{
    PlanCard
  },
  setup() {
    const { user } = keycloakController()
    const subscriptionsRef = ref(<monthlySubscriptionInterface[]>[])
    const userSubscriptionIDRef = ref(-1)
    const router = useRouter()

    const {
      getAllActiveSubscriptions,
      monthlySubscriptions,
      filteredMonthlySubscriptions,
      getCurrUserSubscription,
      currentUserSubscription,
      currentUserSubscriptionID,
      openUpgradePlanPopUp,
      } = subscriptionController()

    const openUpgradePopup = ( subscriptionID: number ) => {
      // Todo : subscriptionID == currentUserID hover (css)

      /*
        If the user has not log out and visits the landing page and presses the swtich/upgrade/custom button,
        direct them back to the purchase page
      */
      if(user.value.uid && !location.href.includes('purchase')){
        void router.push('/purchase')
      }
      else if (subscriptionID === userSubscriptionIDRef.value){
        console.log('Same plan selected')
      }else if (!user.value.uid){
        void router.push('/register')
      } else {
        openUpgradePlanPopUp(subscriptionID)
      }
    }


    onMounted( async() => {
      await getAllActiveSubscriptions()
      if(user.value.uid){
        /*
          If the user is log in, we generate the content inside the PlanCard
          Change the text inside the button, i.e 'Current Plan', 'Switch Plan'
        */
        await getCurrUserSubscription(user.value.uid)
        subscriptionsRef.value = filteredMonthlySubscriptions.value
        if(currentUserSubscription.value)
          userSubscriptionIDRef.value = currentUserSubscription.value.id
      } else {
        /*
          If the user is not log in and views the landing page, generate the content inside the PlanCard
          i.e button labels, ('Get Started', 'Contact us'), refer to figma for more details
        */
        subscriptionsRef.value = monthlySubscriptions.value
      }
    })

    /*
      Watch for any changes in the currentUserSubscriptionID,
      currentUserSubscriptionID could change if the user switches to another plan

      Once it happens, we need to change the content inside the PlanCard.

      ** Area of improvement ** : onMounted and watch will be called
      when the page loads, need to find a way to reduce duplicate function calls.
    */
    watch(currentUserSubscriptionID,
      () => {
        if(user.value.uid){
          subscriptionsRef.value = filteredMonthlySubscriptions.value
          userSubscriptionIDRef.value = currentUserSubscription.value.id
        }
    })

    return {
      subscriptionsRef,
      userSubscriptionIDRef,
      openUpgradePopup,
    }
  },
})
</script>

<style lang="scss" scoped>
.n-pricing-card{
  border-radius: 1rem;
  border: 0.5px solid #F7F0EF;
  padding: 1.5rem;
}
.n-pricing-card:hover{
  background-color:$rabbit-yellow-1;
}
.n-pricing-card.active{
  background-color:$rabbit-yellow-1;
}
</style>
