<template>
 <q-card class="q-page-dark" style="width: 700px; max-width: 80vw;  ">
    <q-card-section class="row items-center">
      <div class="text-h6">Configuration</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-scroll-area
        style="height: 50vh; max-width: 100%;"
        class="q-pa-md"
      >
    <q-card flat class="my-card">
      <q-card-section class="bg-grey-9 text-white">
        <div class="text-subtitle2 relative-position">
          Hot Keys Settings
          <q-icon
            :name="slidePanel === 'hot-key' ? 'mdi-menu-up ' : 'mdi-menu-down'"
            style="cursor: pointer; font-size: 1.8em"
            class="absolute-right"
            @click="slideItem('hot-key')"
          />
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="slidePanel === 'hot-key'">
            <q-card-section>
              <edit-hot-key-settings
                class="full-width"
              />
            </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

    <q-card flat class="my-card q-my-xs">
      <q-card-section class="bg-grey-9 text-white">
        <div class="text-subtitle2 relative-position">
          Subtitle Settings
          <q-icon
            :name="slidePanel === 'settings' ? 'mdi-menu-up ' : 'mdi-menu-down'"
            style="cursor: pointer; font-size: 1.8em"
            class="absolute-right"
            @click="slideItem('settings')"
          />
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="slidePanel === 'settings'">
            <q-card-section>
              <UserSettings style="height: 100%" />
            </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

    <!-- <q-card flat class="my-card q-my-xs">
      <q-card-section class="bg-grey-9 text-white">
        <div class="text-subtitle2 relative-position">
          Operation Interface Settings
          <q-icon
            :name="slidePanel === 'speaker-diarization' ? 'mdi-menu-up ' : 'mdi-menu-down'"
            style="cursor: pointer; font-size: 1.8em"
            class="absolute-right"
            @click="slideItem('speaker-diarization')"
          />
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="slidePanel === 'speaker-diarization'">
            <q-card-section class="row">
              <div class="col-md-8 text-subtitle1">
                Speaker Diarization UI
              </div>
              <div class="col-md-4">
                <q-toggle v-model="is_speaker_diarization" />
              </div>
              <div class="col-md-8 text-subtitle1">
                Editor Interface
              </div>
              <div class="col-md-4">
                <q-toggle v-model="editor" />
              </div>
            </q-card-section>
        </div>
      </q-slide-transition>
    </q-card> -->


  </q-scroll-area>
  </q-card-section>

  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import EditHotKeySettings from 'src/components/Content/settings/EditHotKeySettings.vue'
import UserSettings from 'src/components/Content/settings/UserSettings.vue'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { userConfigService } from 'src/services/userConfig/userConfigService'

export default defineComponent({
  name: 'ConfigurationDialog',
  components:{
    EditHotKeySettings,
    UserSettings
  },
  setup() {
    const { loadConfig } = userConfigService()
    const { activeArtifact, setSpeakerDiarizationUi } = artifactController()
    const slidePanel = ref<string | null>('speaker-diarization')
    const slideItem = (key:string) => {
      slidePanel.value = slidePanel.value != key ? key : null
    }

    const is_speaker_diarization = ref(activeArtifact.value.is_speaker_diarization ?? false)


    watch(is_speaker_diarization, (newValue: boolean) => {
        void setSpeakerDiarizationUi(newValue)
      })
    onMounted(()=>{
      loadConfig()
    })

    return {
      slideItem,
      slidePanel,
      is_speaker_diarization,
      editor: ref(false)

    }
  },
})
</script>

