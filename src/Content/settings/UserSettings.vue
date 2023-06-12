<template>
  <div>
    <!-- 
    SubtitleUserConfigEditContainer been used to adjust the layout.
    Please refer to comments in SubtitleUserConfigEditContainer.vue for more detail.
   -->
    <SubtitleUserConfigEditContainer>
      <template #fields>
        <div
          v-for="(data, idx) in subtitleSetting"
          :key="idx"
          class="row items-center justify-between q-mb-md"
        >
          <b class="col-12 col-sm-7">{{ data.name }} :</b>
          <q-input
            v-model="data.value"
            outlined
            type="number"
            dense
            color="amber-5"
            class="col-12 col-sm-5"
            :suffix="data.unit"
          >
          </q-input>
        </div>
      </template>

      <template #buttons>
        <div class="row justify-center">
          <q-btn
            label="Save"
            class="col-2 bg-rabbit-purple text-white"
            dense
            no-caps
            @click="updateUserSettings()"
          />
        </div>
      </template>
    </SubtitleUserConfigEditContainer>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { useQuasar } from 'quasar'

import { userConfigService } from '../../../services/userConfig/userConfigService'
import { userConfigInterface } from 'src/services/userConfig/userTypes'
import SubtitleUserConfigEditContainer from 'src/components/subtitle-user-config/SubtitleUserConfigEditContainer.vue'

export default {
  components: {
    SubtitleUserConfigEditContainer
  },
  setup() {
    const $q = useQuasar()

    const {
      updateUserConfig,
      cpsConfig,
      cplConfig,
      timeAdjUnit,
      timeCtlUnit,
      zoom_level
    } = userConfigService()

    function updateUserSettings() {
      const dataToUpdate = {
        cpl: subtitleSetting.cpl.value,
        cps: subtitleSetting.cps.value,
        timeAdjUnit: subtitleSetting.subtitle_time_unit.value,
        timeCtlUnit: subtitleSetting.video_forward_backward_unit.value,
        zoom_level: subtitleSetting.zoom_level.value
      } as userConfigInterface
      console.log(dataToUpdate)
      void updateUserConfig(dataToUpdate)
      showNotify()
    }

    function showNotify() {
      $q.notify({
        message: 'Congifuration saved successfully.',
        position: 'center',
        color: 'green-6',
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
              /* ... */
            }
          }
        ]
      })
    }

    const subtitleSetting = reactive({
      cpl: {
        name: 'Characters/Line (cpl)',
        value: cplConfig.value,
        model: 'cpl',
        unit: 'characters'
      },
      cps: {
        name: 'Characters/second (cps)',
        value: cpsConfig.value,
        model: 'cps',
        unit: 'characters'
      },
      subtitle_time_unit: {
        name: 'Subtitle Time Adjustment Unit',
        value: timeAdjUnit.value,
        unit: 'milliseconds'
      },
      video_forward_backward_unit: {
        name: 'Video Time Control Unit',
        value: timeCtlUnit.value,
        unit: 'seconds'
      },
      zoom_level: {
        name: 'Subtitle zoom level',
        value: zoom_level.value,
        unit: '%'
      }
    })
    return {
      subtitleSetting,
      cpsConfig,
      cplConfig,
      timeAdjUnit,
      timeCtlUnit,
      updateUserConfig,
      updateUserSettings
    }
  }
}
</script>

<style lang="scss" scoped></style>
