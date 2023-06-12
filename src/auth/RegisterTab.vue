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
        filled
        v-model="firstName"
        label="First Name"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-account" />
        </template>
      </q-input>
    </div>

    <div class="row justify-center q-pa-md full-width">
      <q-input
        style="width: 336px"
        color="rabbit-purple"
        filled
        v-model="lastName"
        label="Last Name"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-account" />
        </template>
      </q-input>
    </div>

  <div class="row justify-center q-pa-md full-width">
    <q-input
      style="width: 336px"
      color="rabbit-purple"
      v-model="password"
      filled
      :type="isPwd1 ? 'password' : 'text'"
      label="Password"
    >
      <template v-slot:prepend>
        <q-icon name="mdi-lock" />
      </template>

      <template v-slot:append>
        <q-icon
          :name="isPwd1 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd1 = !isPwd1"
        />
      </template>
    </q-input>
  </div>

  <div class="row justify-center q-pa-md full-width">
    <q-input
      style="width: 336px"
      color="rabbit-purple"
      v-model="cpassword"
      filled
      :type="isPwd2 ? 'password' : 'text'"
      label="Confirm Password"
      @keyup.enter="registerAccount(email, password, cpassword, firstName, lastName)"

    >
      <template v-slot:prepend>
        <q-icon name="mdi-lock" />
      </template>

      <template v-slot:append>
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd2 = !isPwd2"
        />
      </template>
    </q-input>
  </div>

  <div class="row justify-center">
    <p class="text-center q-my-md">
      By creating an account, you agree to our <br />
      <a href="https://scriberabbit.com/en/sitepolicy/" target="_blank">Terms of Service</a> and <a href="https://scriberabbit.com/en/privacy/" target="_blank">Privacy Policy</a>
    </p>
  </div>
  <div class="row justify-center">
    <q-btn
      size="18px"
      rounded
      no-caps
      class="q-px-lg q-py-xs"
      color="rabbit-purple"
      label="Sign Up"
      @click="handleRegisterAccount()"
      :loading=isLoading
    />
    <br/>

    <p class="text-warning"> {{error}} </p>
  </div>
  <div class="q-px-lg q-py-lg">
    <q-separator color="text-grey" inset />
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="showConfirmWindow" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"> An verification email has been send to {{email}}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
   

</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { keycloakController } from 'src/services/auth/keycloakController'
import { registerUserInterface } from 'src/services/auth/keycloakTypes' 
import { useRouter, useRoute } from 'vue-router'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'RegisterTab',
  components: {},
  setup() {
    const email = ref('')
    const password = ref('')
    const cpassword = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const isPwd1 = ref(true)
    const isPwd2 = ref(true)
    const error = ref('')
    const showConfirmWindow = ref(false)
    const { signUp, keyCloakControllerMessages } = keycloakController()
    const router = useRouter()
    const route = useRoute()
    // const $q = useQuasar()
    // const showNotif  = (email:string) => {
    //     $q.notify({
    //       message: 'An verification email has been send to'+email ,
    //       color: 'black',
    //       actions: [
    //         { label: 'Dismiss', color: 'red',, handler: () => { /* ... */ } }
    //       ]
    //     })
    //   }
    let isLoading = ref(false)

    const registerAccount =  async (
      email: string,
      password: string,
      cpassword: string,
      firstName: string,
      lastName: string
    ) => {
      isLoading.value = true

      if(email.length === 0 || password.length === 0 || cpassword.length === 0 || 
        firstName.length === 0 || lastName.length === 0){
        alert('Missing fields, please submit again')
        return
      }

      if (password !== cpassword){
        alert('Password does not match')
        return
      }

      const username = email.split('@')[0]
      const data : registerUserInterface= {
        'email': email.toLowerCase(),
        'username': username,
        'first_name': firstName,
        'last_name': lastName,
        'password': password,
      }
      //////////////////////////////////////////////////////////////
      const result = await signUp(data)

      if (result === keyCloakControllerMessages['SUCCESS']){
        //alert(`An verification email has been send to ${email}`)
        void router.push({ path: '/register' })
        console.log('testingpassed')
        showConfirmWindow.value = true
        isLoading.value = false
      }
      else{
        alert(result)
      }
      //////////////////////////////////////////////////////////////    
    }

    const handleRegisterAccount = () =>{
      // console.log('Handling register account')
      void registerAccount(
        email.value, 
        password.value, 
        cpassword.value, 
        firstName.value, 
        lastName.value
        )
      // Store ilid from query to LocalStorage
      if (route.query.ilid) LocalStorage.set('ilid', route.query.ilid)
    }
    

    const signInWithGoogle = () => {
      console.log('signing in with google')
    }

    onMounted(() => {
      console.log('Mounting register tab')
    })

    return {
      handleRegisterAccount,
      signInWithGoogle,
      email,
      password,
      cpassword,
      firstName, 
      lastName,
      isPwd1,
      isPwd2,
      error,
      showConfirmWindow,
      isLoading
    }
  }
})
</script>
