<template>
  <q-btn
    label="Login/Sign Up"
    flat
    color="rabbit-purple"
    no-caps
    size="12px"
    class="q-mt-xls q-px-lg q-mb-sm"
    @click="loginSignUp"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginSignUpButton',
  setup() {
    const router = useRouter()

    function loginSignUp() {
      void router.push('/register')
      return console.log('Login SignUp Page')
    }

    return {
      loginSignUp
    }
  }
})
</script>
