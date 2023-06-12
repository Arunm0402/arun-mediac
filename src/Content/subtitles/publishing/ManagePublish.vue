<template>
  <div>
    <div>
      <q-btn
        label="Manage Publish"
        icon="present_to_all"
        no-caps
        no-wrap
        @click="isEditing = true"
      />

      <div>
        <q-dialog v-model="isEditing">
          <div class="local_manage-publish q-pa-lg">
            <!-- {{_artifact}} -->
            <!-- Dialog header -->
            <div class="row justify-between no-wrap items-center">
              <h6 class="q-ma-none" style="white-space: nowrap">
                Manage Publish
              </h6>

              <q-icon
                name="close"
                size="sm"
                class="q-icon cursor-pointer"
                @click="isEditing = false"
              />
            </div>
            <!-- Dialog Content -->
            <div class="q-my-md local_manage-publish-container">
              <ManagePublishToggle />
              <div class="q-pb-sm local_manage-publish-content">
                <ManagePublishToggle
                  item="Video Content"
                  :status="videoStatus"
                  @update-status="(status) => updateVideoStatus(status)"
                />

                <!-- Publish status remark -->
                <div class="local_remarks q-mx-auto q-my-md">
                  <div
                    v-if="videoStatus.toLowerCase() !== 'published'"
                    class="remark-warning q-pa-sm row no-wrap items-center"
                  >
                    <q-icon name="warning" size="sm" class="q-mr-sm" />
                    <p class="q-ma-none">
                      In order to publish subtitles, the video content must be
                      published first
                    </p>
                  </div>
                  <!-- At least 1 language must be published for user to see the content, else video will not load -->
                  <div
                    v-else
                    class="remark-check q-pa-sm row no-wrap items-center"
                  >
                    <q-icon name="done_all" size="sm" class="q-mr-sm" />
                    <p class="q-ma-none">
                      Video content publishend, please make sure at lease one
                      language is published for viewers to view the content.
                    </p>
                  </div>
                </div>

                <ManagePublishToggle
                  v-for="lang in languages"
                  :key="lang.lid"
                  :item="lang.name"
                  :status="lang.status"
                  @update-status="
                    (status) =>
                      updateLanguageStatus(lang.lid, lang.name, status)
                  "
                />
              </div>
            </div>

            <!-- TODO: Let's do the publish all function in next sprint -->
            <!-- <div class="row justify-center">
              <q-btn
                label="Publish All"
                no-caps
                outline
                @click="publishAll()"
              />
            </div> -->
          </div>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
// Types
import { artifact } from 'src/services/artifacts/artifactTypes'

// Components
import ManagePublishToggle from './ManagePublishToggle.vue'

const isEditing = ref(false)

const emit = defineEmits([
  'updateVideoStatus',
  'updateLanguageStatus',
  'publishAll'
])

const props = defineProps({
  artifact: { type: Object as () => artifact, required: true }
})

const videoStatus = computed(() => props.artifact.status)
const languages = computed(() => props.artifact.output_language)
const aid = computed(() => props.artifact.aid)

const updateVideoStatus = (status: string) => {
  // console.log('Updating video status to: ', status)
  emit('updateVideoStatus', aid.value, status)
}

const updateLanguageStatus = (lid: string, name: string, status: string) => {
  // console.log('Update language status: ', lid, name, status)
  emit('updateLanguageStatus', aid.value, lid, name, status)
}

// const publishAll = () => {
//   // console.log('Publish all')
//   emit('publishAll')
// }
</script>

<style lang="scss" scoped>
.local_manage-publish {
  background-color: $grey-1;
  width: clamp(200px, 60vw, 600px);
}

.local_manage-publish-container {
  border-radius: 8px;
  border: 1px solid $grey-4;
}

.local_manage-publish-content {
  height: 100%;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  border-top: 1px solid $grey-4;
}

.local_remarks {
  max-width: 400px;

  .remark-warning {
    border-radius: 8px;
    background-color: $red-1;
    .q-icon {
      color: $red-4;
    }
  }

  .remark-check {
    border-radius: 8px;
    background-color: $green-1;
    .q-icon {
      color: $green-4;
    }
  }
}

.body--dark {
  .local_manage-publish {
    background-color: $grey-10;
    color: $grey-2;
  }

  .q-icon {
    color: $grey-5;
  }

  .remark-warning {
    background-color: $amber-9;

    .q-icon {
      color: white;
    }
  }

  .remark-check {
    background-color: $green-9;

    .q-icon {
      color: white;
    }
  }
}
</style>
