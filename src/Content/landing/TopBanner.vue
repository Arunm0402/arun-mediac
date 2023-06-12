<template>
   <!-- Mobile -->
    <div>
      <slot name="title">
        <h3 class="q-my-none q-ml-md text-bold">Video Transcription</h3>
        <h3 class="q-my-none q-mb-lg q-ml-md text-bold">Made Simple</h3>
      </slot>
      <slot name="subtitle">
        <p class="q-my-none q-ml-lg q-pr-md text-h4">
          Meet ScribeRabbit. Helping you transcribe your videos quickly with the power of AI.
        </p>
      </slot>

    <q-btn
        label="Get Started"
        rounded
        outline
        no-caps
        size="lg"
        color="rabbit-purple"
        class="q-px-lg q-ml-lg q-mb-lg q-mt-lg"
        icon-right="mdi-arrow-right"
        @click="redirectToLogin"
      />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { modeConfigController } from 'src/services/userSettings/modeConfigController';

export default defineComponent({
  name: 'TopBanner',
  setup() {
    const router = useRouter()
    const { rabbitPurple } = modeConfigController()
    function redirectToLogin() {
      return router.push('/workspaces')    //login
     }
    return {
      rabbitPurple,
      redirectToLogin
    }
  },
})
</script>

<style lang="scss" scoped></style>
