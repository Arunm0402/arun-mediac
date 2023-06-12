<template>
  <div class="text-center bg-rabbit-purple">
    <div style="min-width: 500px">
      <q-card style="height: 50vh; width 60vw">
        <q-card-section class="text-center bg-rabbit-purple">
          <h5 class="q-my-none text-white">Create a new workspace</h5>
        </q-card-section>
        <br />
        <br />
        <div class="container">
          <q-input
            class="textbox"
            outlined
            v-model="workspaceName"
            label="Input workspace name"
            stack-label
            dense
          />
          <br>
          <div class = "container">
            <q-icon-picker
              v-model="values"
              :icons-set="icons"
              style="height: 100px;"
              tooltips
            />
            <!--q-select
              class="textbox"
              outlined
              v-model="teamMembers"
              multiple
              :options="options"
              use-chips
              stack-label
              label="Please select team member"
            -->
          </div>
        </div>
        <p style="color: grey">
          You will be automatically added to the workspace
        </p>
        <div class="dialog_footer">
          <div class="q-gutter-x-xl">
            <q-btn label="Cancel" color="grey-7" flat no-caps v-close-popup />
            <q-btn
              label="Create Workspace"
              flat
              no-caps
              @click="createNewWorkSpace(workspaceName)" v-close-popup
            />
            <!--added v-close-popup here, tried using vue-router but does not work-->
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { keycloakController } from 'src/services/auth/keycloakController'
import { workspaceController } from 'src/services/workspace/workspaceController'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreateWorkSpace',
  components: {},
  setup(_, {emit} ) {
    const router = useRouter()
    const workspaceName = ref('')
    const values = ref('')
    const teamMembers = ref(<string[]>[])
    const { user } = keycloakController()
    const { selectWorkspace , createWorkspace } = workspaceController()

    const createNewWorkSpace = async (name: string) => {
      console.log('creating new workspace')
      console.log(name)
      if (name.toString().length == 0) {
        name = 'workspace'
      }
      const result = await createWorkspace(user.value.uid, name);
      selectWorkspace(result)
      void router.push(`/workspaces?wid=${result.wid}`)
      // selectWorkspace(result)
      // await getArtifactsInWorkspace(result.wid)

      //added functions below
      // console.log(result)
      //emit('closeWindow')
      //await router.push('/workspaces') //not working
    }

    return {
      createWorkspace,
      emit,
      workspaceName,
      teamMembers,
      values,
      options: ['John', 'Mary', 'Alan', 'Tom', 'Jerry'],
      icons: [
        { name: 'camera' },
        { name: 'o_camera' },
        { name: 'r_camera' },
        { name: 's_camera' },
        { name: 'ion-ios-camera' },
        { name: 'fas fa-camera' },
        { name: 'eva-camera' },
        { name: 'mdi-camera' },
        { name: 'ti-camera' },
        { name: 'las la-camera' },
        { name: 'bi-camera' }
      ],
      pagination: {
        itemsPerPage: 10,
        page: 0
      },
      createNewWorkSpace
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
