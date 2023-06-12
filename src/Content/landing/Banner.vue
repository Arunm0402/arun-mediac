<template>
  <div
    class="bg-rabbit-orange row content-center justify-center"
    style="
    min-height:350px
    "
  >
  <div class="column items-center">
    <h3 class="text-rabbit-purple text-weight-bold text-center q-mb-none">
      Ready to get started?
    </h3>
    <p
      class="text-rabbit-purple text-weight-regular text-h4 q-my-lg q-px-md"
      style="text-align: center">
      Setting up ScribeRabbit is easy. You're just a few clicks away!
    </p>
     <q-btn
      label="Let's Go!"
      rounded
      flat
      no-caps
      size="lg"
      class="bg-rabbit-purple self-center text-white q-px-lg q-mb-lg"
      @click="redirectToLogin"
    />
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Banner',
  setup() {
    const router = useRouter()
    function redirectToLogin() {
      return router.push('/register')    //login
     }
    return {
      redirectToLogin
    }
  },
})
</script>

<style lang="scss" scoped></style>
