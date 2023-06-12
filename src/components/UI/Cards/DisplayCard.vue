<template>
  <div
    v-if="
      status.toLowerCase() == 'published' ||
      userPermissions.includes(permissions.VIEW_UNFINISHED_CONTENT)
    "
    class="col-md-3 col-lg-3 col-sm-12"
  >
    <div>
      <q-card
        flat
        bordered
        class="display-card q-ma-sm"
        :class="{ 'bg-grey-1': !mode }"
      >
        <q-card-section
          class="row full-width justify-center bg-rabbit-purple-2 q-pa-none"
          @mouseenter="showEditBtnOverLay = true"
          @mouseleave="showEditBtnOverLay = false"
        >
          <!--
          Axiom POC, temp solution to display
          editing subtitle button
         -->
          <div
            v-show="showEditBtnOverLay"
            style="position: absolute; z-index: 9; pointer-events: none"
            class="fit row items-center justify-center"
          >
            <div v-if="isEditable">
              <q-btn
                v-if="
                  userPermissions.includes(permissions.VIEW_UNFINISHED_CONTENT)
                "
                label="Start Subtitling"
                color="indigo-10"
                no-caps
                @click="go"
                style="pointer-events: all"
              />
              <q-btn
                v-else
                label="View Video"
                color="indigo-10"
                no-caps
                @click="go"
                style="pointer-events: all"
              />
            </div>
          </div>
          <!-- <p class="q-mt-sm q-mb-none text-rabbit-purple-4">
            Video preview not available for beta version.
          </p> -->
          <!-- <img v-if="headerImage" :src="headerImage" alt="" />
          <img
            v-else
            src="../../../../src/assets/ScribeRabbit-Head-filled.svg"
            style="height: 150px"
            class="q-pa-lg bg-rabbit-purple-2 full-width"
          /> -->

          <q-img
            src="../../../../src/assets/ScribeRabbit-Head-filled.svg"
            class="q-pa-lg bg-rabbit-purple-2 full-width"
            style="height: 200px"
          >
            <div class="absolute-bottom text-left" style="padding: 8px">
              {{ workspaceTitle }}
              <q-tooltip
                class="bg-grey-8"
                anchor="top middle"
                self="bottom middle"
                v-if="title.length > length"
              >
                {{ title }}
              </q-tooltip>
            </div>
          </q-img>
          <div class="column full-width q-pa-sm">
            <div class="row justify-start">
              <VideoTags :vid="vid">
                <template v-slot="{ item = 'No Tag' }">
                  {{ item }}
                </template>
              </VideoTags>
            </div>
            <div class="row justify-end">
              <div class="row justify-between items-center">
                <p
                  class="q-ma-none text-rabbit-purple"
                  v-if="vid.duration || vidSize"
                >
                  - {{ vid.duration }} - {{ vidSize }}
                </p>
                <!-- hover - info icon -->

                <VideoCardDetails :vid="vid" />
              </div>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card-section class="q-mb-none q-pb-none"> </q-card-section> -->
        <!-- <q-card-section class="q-pt-sm"> </q-card-section> -->
        <q-separator></q-separator>
        <slot name="actions">
          <q-card-actions
            class="q-pa-none q-ma-none relative-position"
            horizontal
          >
            <q-card-section class="q-pa-none q-ma-none col-9">
              <!-- Status bar -->
              <div>
                <DisplayCardStatus :status="status" />
              </div>
            </q-card-section>

            <q-separator vertical></q-separator>

            <q-card-section
              class="q-pa-none q-ma-none col-2 text-center absolute-right adjust-mid"
            >
              <q-icon
                name="mdi-dots-horizontal"
                size="sm"
                class="text-rabbit-purple-8 cursor-pointer"
              >
                <q-menu>
                  <q-list class="column">
                    <q-item>
                      <q-btn
                        flat
                        no-caps
                        dense
                        label="Edit Project Detail"
                        icon="mdi-pencil"
                        @click="showEditProject = true"
                        class="text-rabbit-purple-8"
                      />
                    </q-item>
                    <q-item>
                      <q-btn
                        flat
                        no-caps
                        label="Delete Project"
                        icon="mdi-trash-can-outline"
                        class="text-rabbit-purple-8"
                        @click="confirmDelDialog = true"
                      />
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-card-section>
            <q-dialog v-model="confirmDelDialog">
              <q-card>
                <q-card-section class="row items-center q-pa-lg">
                  <q-icon name="mdi-alert-outline" color="warning" size="md" />
                  <span class="q-ml-sm">Confirm delete video.</span>
                </q-card-section>

                <q-card-actions align="center">
                  <q-btn
                    flat
                    no-caps
                    label="Cancel"
                    color="grey-8"
                    v-close-popup
                  />
                  <q-btn
                    flat
                    no-caps
                    label="Delete Video"
                    color="red"
                    v-close-popup
                    @click="del"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="showEditProject">
              <EditProjectDetail
                class="bg-white"
                style="min-width: 700px"
                :vid="vid"
                @closeDialog="closeDialog"
              />
            </q-dialog>
          </q-card-actions>
        </slot>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { artifactController } from 'src/services/artifacts/artifactsController'
import { artifact } from 'src/services/artifacts/artifactTypes'
import { defineComponent, PropType, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import EditProjectDetail from 'src/components/Content/workspaces/EditProjectDetail.vue'
import VideoTags from 'src/components/Content/videocard/VideoCardTags.vue'
import VideoCardDetails from 'src/components/Content/videocard/VideoCardDetails.vue'
import workspacePermissionController from 'src/services/workspace/workspacePermissionController'
import DisplayCardStatus from 'src/components/UI/Cards/DisplayCardStatus.vue'

export default defineComponent({
  props: {
    headerImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Default Video Title'
    },
    //If this props is false, will show the edit video button
    // processing: {
    //   type: Boolean,
    //   default: false
    // },
    aid: {
      type: String,
      required: true
    },
    vid: {
      type: Object as PropType<artifact>,
      required: true
    },
    mode: {
      type: Boolean,
      required: true
    },
    displayEditorUi: {
      type: Boolean,
      required: true
    }
  },
  components: {
    EditProjectDetail,
    VideoTags,
    VideoCardDetails,
    DisplayCardStatus
  },
  setup(props, { emit }) {
    const confirmDelDialog = ref(false)
    const showEditProject = ref(false)
    const { selectArtifact, deleteArtifact, getArtifactsInWorkspace } =
      artifactController()
    const router = useRouter()
    const progress = ref(0.6)
    const length = 90
    const showEditBtnOverLay = ref(false)
    const status = ref(props.vid.status)

    /**
     * Decide if the video content is editable, not user mermission related
     * as long as all backend tasks completed, the video will be editable
     */
    const isEditable = computed(() => {
      const editableStatus = [
        'completed',
        'transcribed',
        'translated',
        'published',
        'editing'
      ]
      return editableStatus.includes(status.value.toLowerCase())
    })

    const { userPermissions, permissions } = workspacePermissionController()

    const go = async () => {
      selectArtifact(props.vid)
      if (props.displayEditorUi) {
        await router.push(`/video-editor/${props.aid}`)
      } else {
        await router.push(`/audience-view/${props.aid}`)
      }
    }

    const del = async () => {
      const msg = await deleteArtifact(props.aid)
      console.log(msg)
      await getArtifactsInWorkspace(props.vid.wid)
    }

    const closeDialog = (status: boolean) => {
      showEditProject.value = status
    }

    watch(
      () => props.vid.status,
      () => {
        status.value = props.vid.status
      }
    )

    return {
      showEditProject,
      confirmDelDialog,
      progress,
      progressLabel: computed(() => (progress.value * 100).toFixed(2) + '%'),
      workspaceTitle: computed(() =>
        props.title.length > length
          ? props.title.substring(0, length) + '...'
          : props.title
      ),
      vidSize: computed(() =>
        props.vid.size >= 1000000000
          ? String(Math.round(props.vid.size / 10000000) / 100) + 'GB'
          : String(Math.round(props.vid.size / 10000) / 100) + 'MB'
      ),
      emit,
      go,
      del,
      closeDialog,
      status,
      length,
      showEditBtnOverLay,
      userPermissions,
      permissions,
      isEditable
    }
  }
})
</script>

<style lang="scss" scoped>
.adjust-mid {
  top: 5px;
  right: 12px;
}
.display-card {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}
.display-card .title {
  height: 5em;
  overflow: hidden;
  white-space: initial;
  text-overflow: ellipsis;
}
</style>
