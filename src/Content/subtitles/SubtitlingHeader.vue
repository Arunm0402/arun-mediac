<template>
  <div class="row justify-between items-center q-px-md q-py-xs">
    <div class="col-4">
      <q-btn outline color="rabbit-purple" label="Back" icon="mdi-arrow-left" @click="redirectTo" />
    </div>
    <div class="col-4 column justify-center items-center">
      <logo-mode class="layout-logo" />
    </div>

    <div class="col-4 row justify-end">
      <div class="row justify-between items-center q-px-sm q-py-xs">
        <switch-mode-header />
      </div>

      <div class="row justify-between items-center q-px-sm q-py-xs s-border-bell-right">
        <q-btn flat icon="mdi-bell-outline"/>
        <q-menu>
          <q-list style="min-width: 400px">
            <div class="s-border-top q-pa-sm">
            </div>
          </q-list>
        </q-menu>
        </div>
      <div>
        <UserListItem v-if="user"
        :user-name="user.display_username" />
        <q-menu>
          <q-list style="min-width: 200px">
            <div class="n-user-settings s-border-top q-pa-sm">
              <q-btn
                flat
                no-caps
                class="text-rabbit-purple full-width"
                width="11"
                label = "User Profile"
                font-size="1.1rem"
                icon="mdi-account-cog"
                @click="userSettings"
                />
            </div>
            <div class="n-logout s-border-top q-pa-sm">
              <q-btn
                flat
                no-caps
                label="Log Out"
                icon="mdi-logout"
                class="text-red full-width"
                width = "11"
                @click="userSignOut"
              />
            </div>
          </q-list>
        </q-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { keycloakController } from 'src/services/auth/keycloakController'
import { defineComponent, computed } from 'vue'
import UserListItem from '../../UI/UserListItem.vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import LogoMode from 'src/components/Content/global/LogoMode.vue'
import SwitchModeHeader from 'src/components/Content/global/SwitchModeHeader.vue'
export default defineComponent({
  components: { UserListItem, LogoMode, SwitchModeHeader },
props:{
     dark: { type: Boolean,  required: true }
   },
  setup() {
    const { signOut,isLoggedIn, user, keyCloakControllerMessages } = keycloakController()
    const router = useRouter()
    const { activeArtifact } =  artifactController()
    const wid = computed(() => activeArtifact.value.wid);

    const userSignOut = async() => {
      const result =  await signOut()
      if (result === keyCloakControllerMessages['SUCCESS']){
        return void router.push('/')
      }
      alert(result)
    }

    const userSettings = () => {
      void router.push('/userprofile')
    }

    const redirectTo = () => {
      if(wid.value){
        void router.push(`/workspaces?wid=${wid.value}`)
      }else{
        void router.push('/workspaces')
      }

    }

    return {
      user,
      signOut,
      userSignOut,
      isLoggedIn,
      userSettings,
      redirectTo,
      artifact: computed(() => activeArtifact.value.wid),
    }
  }
})
</script>

<style scoped>
.n-logout {
  text-align: center;
  display: flex;
}
.n-user-settings {
  text-align: center;
  display: flex;
  line-height: 20px;
  font-size: 15px;
  align-items: center;
}
</style>
