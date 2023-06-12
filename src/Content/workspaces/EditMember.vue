<template>
  <div>
      <q-card class="no-margin fit" style="box-shadow: none;">
        <q-card-section class="text-center">
          <h6 class="text-rabbit-purple text-weight-bold header q-my-none q-mt-md q-py-none">Members </h6>
        </q-card-section>

        <!-- TODOS: Pack inviteByEmail in to a stand alone component -->
        <q-card-section class="row justify-center">

          <!-- All code below been moved to AddMembersDropDown.vue component -->
          <div class="row no-wrap col-12 col-lg-6 items-center q-px-md" v-if="false">
            <div class="row wrap">
              <p class="text-rabbit-purple q-my-none"> Add member to workspace by email: </p>
            </div>
            <div class="q-mx-sm">
              <q-input v-model="userToAdd" outlined no-caps dense stack-label placeholder="example@email.com" @keyup.enter="addInvite"/>
            </div>
            <div> 
              <q-btn class="bg-green-6" style="min-width:140px" no-caps dense icon="mdi-account-plus" label="Add Members" @click="addInvite"/>
            </div>
          </div>
          <div v-if="['editor', 'owner'].includes(role)" class="row">
            <!-- Add Members -->
            <div class="q-mx-md">
              <AddMembersDropDown 
                v-model:user-to-add="userToAdd" 
                @add-invite="addInvite" 
              />
            </div>

            <!-- Invitation link  -->
            <div class="q-mx-md">
              <InvitationLinkDropDown 
                :invitation-link="invitationLink"
                :error-message="ilidError"
                @enable-invitation="handleEnableInvitation"
                @disable-invitation="handleDisableInvitation"
                @hide="handleInvLinkDropDownHide" 
              />
            </div>
          </div>
          <div v-else>
            <span class="text-grey-6">
              Only work space owner or editor can invite members.
            </span>
          </div>
        </q-card-section>

        <q-card-section padding>
          <WorkspaceMembersTable 
            @remove-invite="(invid)=>{removeAnInvite(invid)}" 
            @change-role="(_uid,role)=>changeRole(_uid, role)" 
          />
        </q-card-section>

        <q-card-section padding>

        </q-card-section>
      </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch, Ref } from 'vue';
import { useQuasar, Notify } from 'quasar'
import { inviteController, store as inviteStore } from 'src/services/invites/inviteController'
// import { authService } from 'src/services/auth/authService'
import { keycloakController } from 'src/services/auth/keycloakController'
import { workspaceController } from 'src/services/workspace/workspaceController'
import { memberDataInterface } from 'src/services/workspace/workspaceTypes'
import inviteLinkController from 'src/services/invite-links/inviteLinkController'
import inviteLinkStore from 'src/services/invite-links/inviteLinkStore'

import InvitationLinkDropDown from 'src/components/Content/workspaces/members/InvitationLinkDropDown.vue'
import AddMembersDropDown from 'src/components/Content/workspaces/members/AddMembersDropDown.vue'
import WorkspaceMembersTable from 'src/components/Content/workspaces/members/WorkspaceMembersTable.vue'

export default defineComponent({
  name: 'EditMember',
  components: {
    InvitationLinkDropDown,
    AddMembersDropDown,
    WorkspaceMembersTable
  },
  props: {
    wid: {
      type: String,
      required: true
    },
    mode: {
      type: Boolean,
      //required: true
    }
  },
  setup(props) {
    const {
      activeInvites,
      addNewInvite,
      removeAInvite,
      getInvitesInWorkspace,
    } = inviteController()
    const { user } = keycloakController()
    const { changeUserRole, getUserData, selectedWorkspaceUserData } = workspaceController()

    const {ilid, ilidError, invitationLink} = inviteLinkStore()

    const role = ref('')

    const handleEnableInvitation = () =>{
      console.log('Handling enable invitation')
      const { enableInvitation } = inviteLinkController()
      void enableInvitation(props.wid)
    }

    const handleDisableInvitation = () =>{
      console.log('Handling disable invitation')
      const { disableInviteLink } = inviteLinkController()
      void disableInviteLink(props.wid)
    }

    const addInvite = async () => {
      const invite = {
        wid : props.wid,
        emailAddress : userToAdd.value,
        inviterUid : user.value.uid
      }
      // console.log(invite)
      const response = await addNewInvite(invite, user.value.uid, props.wid)
      console.log(response)
      userToAdd.value = ''
    }
    const userToAdd = ref('')

    const $q = useQuasar() 
    const changeRole = async (uid:string, role:string) =>{
      const currentUserUid = user.value.uid
      console.log('currentUserUid: ', currentUserUid)
      const response = await changeUserRole(uid, currentUserUid, role)

      // update selectedWorkspaceUserData so that memberData is updated
      await getUserData(props.wid)
      console.log(selectedWorkspaceUserData.value)

      let notificationMsg = 'Role successfully changed.' 
      if (response != '200'){
        notificationMsg = 'Something went wrong. Try refreshing.'
      }
      $q.notify({
          group: false,
          message: notificationMsg,
          color: 'purple'
      })
    }
    const removeAnInvite = async (invid:string) => {
      const currentUserUid = user.value.uid
      const response = await removeAInvite(invid, currentUserUid, props.wid)
      console.log(response)

      // update selectedWorkspaceUserData so that memberData is updated
      await getUserData(props.wid)

      Notify.create('Member been removed from the list.')
    }
    const invites = computed(() => inviteStore.invites)

    /**
     * 2022-Nov-20 Moving this memberData to workspaceStore. Because members supposed to be 
     * a state of workspace, instead of a state of this component.
     */
    const memberData: Ref<memberDataInterface[]> = ref([])

    const getMemberData = () =>{
      memberData.value = []
      for(var invite of activeInvites.value){
        // let uid = invite.uid
        let memberEntity = {
          uid: invite.inviteeUid,
          invid: invite.invid,
          name: '',
          role: '',//not used yet
          email: invite.emailAddress,
          photo: '',
          status: invite.status
        }
        for(var workspaceData of selectedWorkspaceUserData.value){
          if(workspaceData.uid == invite.inviteeUid){
            memberEntity.name = workspaceData.name
            memberEntity.role = workspaceData.role
            memberEntity.photo = workspaceData.photo
          }
        }
        memberData.value.push(memberEntity)
      }
      for(var workspaceData of selectedWorkspaceUserData.value){
        if(workspaceData.role == 'owner'){
          memberData.value.push(
            {
              invid: '',
              uid: workspaceData.uid,
              name: workspaceData.name,
              role: workspaceData.role,//not used yet
              email: workspaceData.email,
              photo: workspaceData.photo,
              status: 'owner'
          } as memberDataInterface)
          
        }
      }
      console.log('memberData', memberData)
    }
    watch(invites,()=>{
      getMemberData()
    })
    onMounted(async () =>{
      console.log('Edit member mounted')
      await getInvitesInWorkspace(props.wid)
      // console.log('inviteStore.invites', inviteStore.invites)
      // console.log('inviteStore.activeinvites', inviteStore.activeInvites)
      const workspaceUsers = await getUserData(props.wid) 
      console.log('getuserData:', workspaceUsers)
      role.value = workspaceUsers.find(_user => _user.uid == user.value.uid)?.['role'] || ''
      getMemberData()
    })

    const handleInvLinkDropDownHide = () =>{
      const {clearIlidError} = inviteLinkStore()
      clearIlidError()
    }

    return {
      userToAdd,
      addInvite,
      invites,
      removeAnInvite,
      memberData,
      changeRole,
      handleEnableInvitation,
      handleInvLinkDropDownHide,
      handleDisableInvitation,
      ilid,
      ilidError,
      role,
      invitationLink
      // test
    }
  }
})
</script>

<style scoped>
.thead-sticky tr > *,
.tfoot-sticky tr > * {
  position: sticky;
  opacity: 1;
  z-index: 1;
  background-color: #FFF;
}

.thead-sticky tr:last-child > * {
  top: 0;
}
.q-table__card{
  box-shadow: none
}
</style>