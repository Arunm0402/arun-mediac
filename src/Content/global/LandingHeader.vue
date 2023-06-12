<template>
    <div class="row full-width q-py-none items-center">
      <div class="col-12 col-md-3">
        <logo-mode style="width:250px" class="n-header-logo q-ma-md landing-logo" />
      </div>
      <div class="col-9 n-header-navigation">
        <div
          class="
            q-mt-xs q-mr-xl q-pr-lgs
            row
            items-center
            justify-end
            q-gutter-md
          "
          :class="`text-${rabbitPurple}`"
        >
          <slot name="navigation" />
          <q-btn outline rounded no-caps @click="register()" v-if="!isLoggedIn"> Log in / Sign Up </q-btn>
            <q-btn-dropdown v-else flat rounded class="q-ma-none q-pa-none" :class="`text-${rabbitPurpleLight}`">
              <template v-slot:label>
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="rabbit-purple" text-color="white" v-if="user.display_username">
                    {{ user.display_username[0].toUpperCase() }}
                  </q-avatar>
                </q-item-section>
                <q-item-section>{{ user.display_username }}</q-item-section>
              </q-item>
            </template>
            <q-list>
              <q-item clickable v-close-popup @click="userSettings">
                <q-item-section>
                  <q-item-label><q-icon name="mdi-account-cog" /> User Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="userSignOut" :active="true" active-class="text-red">
                <q-item-section>
                  <q-item-label><q-icon name="mdi-logout" /> Log Out</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { modeConfigController } from 'src/services/userSettings/modeConfigController';
import LogoMode from 'src/components/Content/global/LogoMode.vue'
import { keycloakController } from 'src/services/auth/keycloakController'

export default defineComponent({
  props:{
     dark: { type: Boolean,  required: true }
   },
   components:{
     LogoMode
   },
  setup() {
    const router = useRouter()
    const { rabbitPurple, rabbitPurpleLight } = modeConfigController()
    const { signOut, isLoggedIn, user, keyCloakControllerMessages } = keycloakController()

    function register() {
      void router.push('/register')
    }

    const userSignOut = async () => {
      const result =  await signOut()
      if (result === keyCloakControllerMessages['SUCCESS']){
        return void router.push('/')
      }
      alert(result)
    }

    const userSettings = () => {
      void router.push('/userprofile')
    }
    return {
      register,
      isLoggedIn,
      user,
      userSignOut,
      userSettings,
      rabbitPurple,
      rabbitPurpleLight
    }
  }
})
</script>

<style lang="scss" scoped>
.n-header-logo {
  height: 5rem
}
@media screen and (max-width: 1024px) {
  .n-header-navigation {
    display: none;
  }
  .n-header-logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

</style>
