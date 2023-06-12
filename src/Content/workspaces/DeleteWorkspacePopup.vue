<template>
  <div class="text-center bg-rabbit-purple">
    <div style="min-width: 500px">
      <q-card style="height: 50vh; width 80vw">
        <q-card-section class="text-center bg-rabbit-purple">
          <h5 class="q-my-none text-white">Delete Workspace</h5>
        </q-card-section>
        <br />
        <q-icon
          name="mdi-delete"
          size="5rem"
          color="rabbit-purple-4"
          class="block q-mx-auto"
        />
        <br />
        <h5 class="q-my-none text-rabbit-purple">
          Are you sure you want to delete
        </h5>
        <h5 class="q-my-none text-rabbit-purple">the workspace?</h5>
        <br />

        <p style="color: grey">
          All saved data will be lost. This cannot be undone.
        </p>
        <div class="dialog_footer">
          <div class="q-gutter-x-xl">
            <q-btn
              label="Cancel"
              color="grey-7"
              outline
              rounded
              flat
              no-caps
              v-close-popup
            />
            <q-btn
              label="Delete Workspace"
              flat
              no-caps
              @click="deleteCurrentWorkspace"
              v-close-popup="2"
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { keycloakController } from 'src/services/auth/keycloakController'
import { workspaceController } from 'src/services/workspace/workspaceController'
import { artifactController } from 'src/services/artifacts/artifactsController'

export default defineComponent({
  name: 'DeleteWorkSpace',
  components: {},
  setup() {
    const router = useRouter()
    const { deleteWorkspace, getSelectedWorkspace, getWorkspaces } =
      workspaceController()
    const { getArtifactsInWorkspace } = artifactController()
    const { user } = keycloakController()
    
    const deleteCurrentWorkspace = async () => {
      console.log('Deleting Workspace')
      const result = getSelectedWorkspace()
      const updates = await deleteWorkspace(result.wid, user.value.uid )
      console.log(updates)
      console.log('opened existing workspace')
      await getWorkspaces(user.value.uid)
      const update = getSelectedWorkspace()
      void getArtifactsInWorkspace(update.wid).then(() => {
        void router.push('/workspaces')
      })

    }

    return {
      deleteCurrentWorkspace
    }
  }
})
</script>
<style lang="scss">
.textbox {
  display: flex;
  align-items: center;
}
.container {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
