<template>
  <div class="row justify-between items-center q-px-lg q-py-xs">
    <div class="col-4">
        <q-btn-dropdown outline no-caps label="Workspaces" icon="mdi-view-dashboard" :class="{'text-rabbit-purple-button': !dark}">
          <q-list class="column">
            <q-item class="q-pa-none">
              <!--loop through the number of workspaces in the admin account-->
              <div class="full-width"
                v-if="workspaces.length > 0"
              >
                <q-list class="column q-py-xs full-width text-left">
                  <q-btn
                    v-for="w in workspaces"
                    :key="w.wid"
                    :label="w.workspace_name"
                    no-caps
                    flat
                    color="rabbit-purple"
                    :icon="w.workspace_icon"
                    width="12"
                    @click="retrieveWorkSpace(w)"
                    class="text-rabbit-purple-button full-width text-left"
                    style="align-items:flex-start"
                  />
                </q-list>
              </div>
            </q-item>

            <div class="s-border-top q-pa-sm column">
              <div>
                <q-btn
                  v-if="canAddWorkspace"
                  no-caps
                  color="green-8"
                  label="New Work Space"
                  icon="mdi-plus-circle"
                  class="q-mb-md"
                  @click="showWorkSpaceDialog = true"
                />

                <div v-else class="q-pa-sm q-mb-sm text-grey-7"> 
                  Unable to create new workspace <br/> as workspace limit exceeded. 
                </div>
              </div>

              <q-btn 
                outline 
                no-caps 
                icon="login" 
                color="green-8" 
                label="Join Work Space" 
                @click="showJoinWorkspaceDialog = true"
              />
            </div>
          </q-list>
        </q-btn-dropdown>
    </div>
    <div class="col-4 column justify-center items-center gt-xs">
      <logo-mode class="layout-logo" />
    </div>

    <div class="col-4 row justify-end">
       <div class="row justify-between items-center q-px-sm q-py-xs">
        <switch-mode-header />
      </div>
      <div
        class="
          row
          justify-between
          items-center
          q-px-sm q-py-xs
          s-border-bell-right
          gt-sm
        "
        >

        <NotificationBell />
        <!-- 
        <q-btn flat icon="mdi-bell-outline" />
        <q-menu>
          <q-list style="min-width: 400px">
            <div class="s-border-top q-pa-sm">
              <q-btn
                size="15px"
                flat
                padding="10px"
                no-caps
                label="We are working on this."
                class="text-rabbit-purple full-width"
              />
            </div>
          </q-list>
        </q-menu>
        -->
      </div>
      <div>
        <UserListItem
        :userName="user.display_username"
        class="cursor-pointer" />

        <q-menu>
          <q-list style="min-width: 200px">
            <div class="n-user-settings s-border-top q-pa-sm">
              <q-btn
                flat
                no-caps
                class="text-rabbit-purple full-width"
                width="11"
                label="User Profiles"
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
                width="11"
                @click="userSignOut"
              />
            </div>
          </q-list>
        </q-menu>
      </div>
    </div>
    <!-- Create Work Space Dialog -->
    <q-dialog v-model="showWorkSpaceDialog">
      <CreateWorkSpace />
    </q-dialog>

    <!-- Join workspace by input invite code -->
    <q-dialog v-model="showJoinWorkspaceDialog">
      <JoinWorkspaceDialog :wid="wid" :user-email='user.email_address' />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { keycloakController } from 'src/services/auth/keycloakController'
import { defineComponent, ref, computed, onMounted } from 'vue'
import CreateWorkSpace from 'src/components/Content/workspaces/CreateWorkSpace.vue'
import { workspaceController } from 'src/services/workspace/workspaceController'
import UserListItem from '../../UI/UserListItem.vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { workspace } from 'src/services/workspace/workspaceTypes'
import { subscriptionController } from 'src/services/subscription/subscriptionController'
import LogoMode from 'src/components/Content/global/LogoMode.vue'
import SwitchModeHeader from 'src/components/Content/global/SwitchModeHeader.vue'
import  NotificationBell  from 'src/components/Content/global/NotificationBell.vue'
import JoinWorkspaceDialog from 'src/components/Content/global/JoinWorkspaceDialog.vue'

export default defineComponent({
  components: { 
    UserListItem, 
    CreateWorkSpace, 
    LogoMode, 
    SwitchModeHeader, 
    NotificationBell,
    JoinWorkspaceDialog
    },
  props:{
     dark: { type: Boolean,  /*required: true*/ }
   },

  // methods: {
  //   cancel() {
  //     console.log('Cancel')
  //     this.showWorkSpaceDialog = false
  //   },

  //   createNewWorkSpace() {
  //     console.log('Create new workspace')
  //     this.showWorkSpaceDialog = false
  //   }
  // },

  setup() {
    const showWorkSpaceDialog = ref(false)
    const showJoinWorkspaceDialog = ref(false)
    const { setWorkspace, workspaces, selectedWorkspace, countWorkspacesOwned } = workspaceController()
    const { signOut, isLoggedIn, user, keyCloakControllerMessages } = keycloakController()
    const router = useRouter()
    const { artifacts, getArtifactsInWorkspace, parseStatus } =
      artifactController()

    const { currentUserSubscription, workspaceLimit, getCurrUserSubscription } = subscriptionController()

    const retrieveWorkSpace = async (w: workspace) => {
      void router.push(`/workspaces?wid=${w.wid}`)
      let wid = w.wid;
      if(wid){
        setWorkspace(wid)
        await getArtifactsInWorkspace(wid)
      }

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

    const canAddWorkspace = computed(() => {
      console.log('workspace limit: ', workspaceLimit.value, ' count workspace: ', countWorkspacesOwned.value)
      return workspaceLimit.value < 0 ? true : countWorkspacesOwned.value < workspaceLimit.value
    })

    onMounted(async () => {
      console.log('mounting user header: ', user.value.uid)
      await getCurrUserSubscription(user.value.uid)
      console.log(currentUserSubscription.value)

      let wid = String(router.currentRoute.value.query.wid);
      if(wid){
        setWorkspace(wid)
        await getArtifactsInWorkspace(wid)
      }
    })


    return {
      user,
      signOut,
      userSignOut,
      retrieveWorkSpace,
      parseStatus,
      userSettings,
      artifacts,
      isLoggedIn,
      showWorkSpaceDialog,
      showJoinWorkspaceDialog,
      wid: computed(() => selectedWorkspace.value.wid),
      workspaces: computed(() => workspaces.value), //added
      canAddWorkspace
    }
  }
})
</script>

<style scoped></style>
