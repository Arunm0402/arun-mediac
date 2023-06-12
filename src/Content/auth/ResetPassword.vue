<template>
  <div class="col text-center" style="max-width: 300px">
    <h6 class="q-mb-none">Reset Password</h6>
    <p class="text-caption q-mb-md">We'll send you a link to reset your password</p>
    <q-input v-model="email" filled label="Email" color="indigo-10" type="email" class="q-my-md">
      <template v-slot:prepend>
        <q-icon class="text-indigo-10" name="email" />
      </template>
    </q-input>
    <q-btn
      square
      label="Email Me"
      outline
      color="indigo-10"
      size="md"
      class="q-my-md"
      no-caps
      @click='reset'
      v-if="!linkSent"
    />
    <p class="text-caption q-my-md" v-else>
      Reset Password Link sent. Please check your email to reset your password.
    </p>
    <div class="text-center">
      <q-btn type="a" label="Login/Create Account" flat no-caps color="blue" size="12px" :to="{name: 'Login'}" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ResetPassword',
  setup () {
    const email = ref('')
    const linkSent = ref(false)
    // const { resetPassword } = userService()
    const reset = () => {
      console.log('resetting password')
      linkSent.value = true
    }
    return {
      email,
      reset,
      linkSent
    }
  }
})
</script>