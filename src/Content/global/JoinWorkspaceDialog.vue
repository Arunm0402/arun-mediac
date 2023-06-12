<template>
  <div>
    <div style="min-width: 500px">
      <q-card style="">
        <q-card-section class="text-center">
          <h6 class="q-my-none text-grey-7">Join a workspace</h6>
          <p class="color-text-grey-9">
            Join a workspace by type in invitation code.
          </p>

          <div class="column items-center q-gutter-md q-my-md">
            <q-input
              outlined
              dense
              style="max-width: 280px"
              v-model="ilidModel"
            />
            <q-btn
              no-caps
              outline
              icon="login"
              color="green-8"
              label="Join Workspace"
              :disable="ilidModel.length == 0"
              @click="handleAcceptInviteCode"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import inviteLinkController from 'src/services/invite-links/inviteLinkController'
import { useRouter } from 'vue-router'

const props = defineProps({
  wid: {},
  userEmail: {}
})

const router = useRouter()

const ilidModel = ref('')

const handleAcceptInviteCode = async () => {
  console.log('Handle accept invite code')
  const { useAcceptInviteLink } = inviteLinkController()

  const acceptInviteCodeRes = await useAcceptInviteLink(
    props.wid,
    ilidModel.value,
    props.userEmail
  ).catch((err) => {
    console.log(err)
  })

  const invid = acceptInviteCodeRes.invid as string
  const wid = acceptInviteCodeRes.wid as string

  if (invid) {
    console.log(invid)
    void router.replace({
      name: 'workspaces',
      query: { invid: null, wid: null }
    })
    void router.push({ name: 'workspaces', query: { invid: invid, wid: wid } })
  }
}
</script>

<style scoped></style>
