<template>
  <div class="row">
    <div class="row justify-center q-pa-md full-width">
      <q-input
        style="width: 336px"
        color="rabbit-purple"
        filled
        v-model="email"
        label="Email"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-email" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row justify-center q-pa-md full-width">
    <q-input
      style="width: 336px"
      color="rabbit-purple"
      v-model="password"
      filled
      :type="isPwd ? 'password' : 'text'"
      label="Password"
      @keyup.enter="loginAccount(email, password, mfa)"

    >
      <template v-slot:prepend>
        <q-icon name="mdi-lock" />
      </template>

      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </div>

  <div class="row">
    <div class="row justify-center q-pa-md full-width">
      <q-input
        style="width: 336px"
        color="rabbit-purple"
        filled
        v-model="mfa"
        label="MFA"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-lock" />
        </template>
      </q-input>
    </div>
  </div>

  <div class="row justify-center">
    <q-btn
      label="Forgot Password?"
      flat
      color="rabbit-purple"
      no-caps
      size="12px"
      class="q-mt-xls q-px-lg q-mb-sm"
      @click="forgotPassword"
    />
  </div>
  <div class="row justify-center">
    <q-btn
      size="20px"
      rounded
      no-caps
      class="q-px-xl q-py-xs"
      color="rabbit-purple"
      label="Login"
      @click="loginAccount(email, password, mfa)"
    />
  </div>


  <div class="q-px-lg q-py-lg">
    <q-separator color="text-grey" inset />
  </div>

  <div class="row justify-center">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue'
import { useRouter } from 'vue-router'
// import  { keycloakController } from 'src/services/auth/keycloakController'
import  { apiController } from 'src/services/auth/apiController'

export default defineComponent({
  name: 'LoginTab',
  components: {},
  setup() {
    const username = ref('')
    const password = ref('')
    const mfa_code = ref(0)
    const isPwd = ref(true)
    const router = useRouter()
    const { login, keyCloakControllerMessages } = apiController()

    const loginAccount = async (username: string, password: string, mfa_code: number) => {
      if (username.length === 0 || password.length === 0) {
        alert('Missing fields, please submit again')
      }
      try {
        const result = await login(username, password, mfa_code)
        console.log(result)
        if(result === keyCloakControllerMessages['SUCCESS']){
          console.log('going to assumAdmin')
          // await router.push('/workspaces')
          await router.push('/assumAdmin')
        }
        else{
          alert(result)
        }
      } catch (e) {
        console.log('An error occured :',e)
      }
    }

    function forgotPassword() {
      void router.push('/forgot-password')
    }

    return {
      loginAccount,
      forgotPassword,
      username,
      isPwd,
      password,
      mfa_code
    }
  }
})
</script>
