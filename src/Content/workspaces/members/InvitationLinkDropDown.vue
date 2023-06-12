<template>
  <div>
    <!-- {{invitationLink}} -->
    <q-btn-dropdown
      label="Invitation Link"
      outline
      no-caps
      icon="login"
      color="grey-8"
      @hide="emitHide"
    >
      <div class="q-pa-lg">
        <div class="column q-gutter-sm">
          <div v-if="invitationLink">
            <!-- Copy and delete invitation link -->
            <div class="column">
              <div class="row q-gutter-md items-center justify-between">
                <div
                  style="
                    border: 1px solid rgba(128, 128, 128, 0.5);
                    border-radius: 4px;
                    max-width: 30ch;
                    overflow: auto;
                  "
                  class="q-pa-sm bg-grey-2 text-grey-9 local_no-scroll-bar"
                >
                  <p class="q-ma-none" style="white-space: nowrap">
                    {{ invitationLink }}
                  </p>
                </div>
                <div>
                  <!-- Copy Link Button -->
                  <q-btn
                    label="Copy Link"
                    no-caps
                    color="green-7"
                    @click="copyInvitationLink"
                  />
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <!-- Create invitation link -->
            <div class="column q-gutter-md items-center">
              <div>
                <q-btn
                  color="green-7"
                  label="Create Invitation Link"
                  icon="add_link"
                  no-caps
                  @click="emitEnableInvitation"
                />
              </div>
              <p v-if="errorMessage" class="q-mt-md q-mb-none text-red">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>

        <p class="q-mt-md text-grey-8" style="border-radios: 12px">
          Anyone who have the invitation link will be able to access this
          workspace and view the content.
        </p>

        <!-- Delete share link button -->
        <div v-if="invitationLink">
          <div
            class="q-mt-md q-pt-md row justify-between items-center"
            style="border-top: 1px solid rgba(128, 128, 128, 0.25)"
          >
            <q-btn
              dense
              no-caps
              label="Disable Invitation"
              color="red"
              icon="delete_outline"
              flat
              size="12px"
              @click="emitDisableInvitation"
            />
            <small
              class="q-my-none q-ml-md bg-grey-2 text-red-4"
              style="padding: 8px; border-radius: 8px"
            >
              After invitation been disabled, this workspace will still be
              accessable to people who already joined from the current
              invitation code. However, no new users can join this workspace any
              more.
            </small>
          </div>
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard, Notify } from 'quasar'

const props = defineProps({
  invitationCode: {},
  invitationLink: {},
  errorMessage: {}
})

const emit = defineEmits(['enableInvitation', 'hide', 'disableInvitation'])

const emitEnableInvitation = () => {
  emit('enableInvitation')
}

const emitHide = () => {
  emit('hide')
}

const emitDisableInvitation = () => {
  emit('disableInvitation')
}

const copyInvitationLink = () => {
  void copyToClipboard(props.invitationLink).then(() =>
    Notify.create('Invitation Link copied to clipboard.')
  )
}
</script>

<style scoped>
p,
small {
  max-width: 40ch;
  padding: 0;
}

.local_no-scroll-bar::-webkit-scrollbar {
  display: none;
}
.local_no-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
