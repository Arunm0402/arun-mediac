<template>
  <q-btn flat icon="mdi-bell-outline" @click="test" />

          <q-menu>
            <q-list style="max-width: 400px">

              <div class="s-border-top q-pa-sm" v-for="notification in notifications" :key="notification.nid" >

                <q-btn flat no-caps :color="notificationColorMapping[notification.importance]" style="width: 100%; " @click="changeNotifcationStatusToRead(notification.nid)" >
                  {{ notification.content }}

                <!--delete button-->
                <q-btn padding="none" square colour="purple" glossy icon="delete" @click.stop="changeNotifcationStatusToDelete(notification.nid)">
                </q-btn>
                
                </q-btn>


              </div>


            </q-list>
          </q-menu>

</template>


<script lang="ts">
import { useRouter } from 'vue-router'
import { keycloakController } from 'src/services/auth/keycloakController'
import { authService } from 'src/services/auth/authService'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { workspaceController } from 'src/services/workspace/workspaceController'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { workspace } from 'src/services/workspace/workspaceTypes'
import { notificationController } from 'src/services/notification/notificationController'

export default defineComponent({
  components: { },
  props:{
     dark: { type: Boolean,  /*required: true*/ },
    //  uid:{
    //    type: String,
    //    required: true
    //  }
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

  // setup(props) {
  setup() {

    const showWorkSpaceDialog = ref(false)
    const { setWorkspace, workspaces } = workspaceController()
    workspaceController()
    const { signOut, launchPopup, isLoggedIn } = authService()
    const router = useRouter()
    const { user } = keycloakController()
    const { artifacts, getArtifactsInWorkspace, parseStatus } =
      artifactController()
    const { notifications, getNotificationsByUser, updateANotificationStatus, } = notificationController()

    //addedfunction
    const retrieveWorkSpace = async (w: workspace) => {
      void router.push(`/workspaces?wid=${w.wid}`)
      let wid = w.wid;
      if(wid){
        setWorkspace(wid)
        await getArtifactsInWorkspace(wid)
      }

    }
    function userSignOut() {
      void signOut()
      void router.push('/')
    }

    function userSettings() {
      void router.push('/userprofile')
    }

    onMounted(async () => {
      let wid = String(router.currentRoute.value.query.wid);
      if(wid){
        setWorkspace(wid)
        await getArtifactsInWorkspace(wid)
        // await getNotificationsByUser(props.uid)
        await getNotificationsByUser(user.value.uid)
      }
    })
    function test(){
      console.log(notifications.value)
    }
    const notificationColorMapping = {
      'high':'red',
      'medium':'green',
      'low':'blue'
    }
    // testing function change status of the notification
    async function changeNotifcationStatusToRead (nid:string){
      const updateNotif = {
        nid : nid,
        status : 'read'
      }
      const reponse =await updateANotificationStatus(updateNotif)
      console.log('status change to read')
      console.log(nid)
      console.log(reponse)

      await getNotificationsByUser(user.value.uid)
        
      }

      // changing status to delete
      async function changeNotifcationStatusToDelete (nid:string){
      const updateNotif = {
        nid : nid,
        status : 'deleted'
      }
      const reponse =await updateANotificationStatus(updateNotif)
      console.log('status change to delete')
      console.log(nid)
      console.log(reponse)

      await getNotificationsByUser(user.value.uid)

      }


    return {
      user,
      signOut,
      userSignOut,
      launchPopup,
      retrieveWorkSpace, //added
      parseStatus, //added
      userSettings, //added for user profile page
      artifacts, //added
      isLoggedIn,
      showWorkSpaceDialog,
      workspaces: computed(() => workspaces.value), //added
      notifications,
      test,
      notificationColorMapping,
      changeNotifcationStatusToRead,
      changeNotifcationStatusToDelete


    }
  }
})
</script>

<style scoped></style>
