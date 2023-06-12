<template>
  <div>
    <div class="row justify-center">
      <hardcoded-plan-card
        v-for="planContent in planContents"
        :key="planContent.id"
        :plan-content="planContent"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HardcodedPlanCard from './HardcodedPlanCard.vue'
import { planContentInterface } from 'src/services/subscription/subscriptionTypes'

export default defineComponent({
  components: { HardcodedPlanCard },
  setup() {
    const planContents: planContentInterface[] = [
      {
        type: 'Basic',
        price: 'Free',
        audience: 'For student & freelancers',
        id: -1,
        button: 'Get Started',
        ctaLink: '/register',
        specifications: [
          { icon: 'mdi-account-outline', text: 'Single User' },
          { icon: 'mdi-video-outline', text: '3 videos' },
          { icon: 'mdi-timer-outline', text: '1.5 hour' },
          { icon: 'mdi-database', text: '5 GB' }
        ],
        features: ['Single workspace', 'Download .SRT subtitles']
      },
      {
        type: 'Enterprise',
        price: 'Custom Price',
        audience: 'For large business',
        id: -1,
        button: 'Contact Us',
        ctaLink:
          'mailto:scriberabbit@sentient.io?subject=Enterprise Enquiry&body=I would like to know more about ScribeRabbit',
        specifications: [
          {
            icon: 'mdi-star-shooting-outline',
            text: 'All features taliored to requirement'
          }
          // { icon: 'mdi-account-outline', text: 'Taliored to requirement' },
          // { icon: 'mdi-video-outline', text: 'Taliored to requirement' },
          // { icon: 'mdi-timer-outline', text: 'Taliored to requirement' },
          // { icon: 'mdi-database', text: 'Taliored to requirement' }
        ],
        features: [
          'Unlimited Workspaces',
          'Download SRT TXT & PDF subtitles',
          'Invoicing'
        ]
      }
    ]
    return {
      planContents
    }
  }
})
</script>

<style scoped></style>
