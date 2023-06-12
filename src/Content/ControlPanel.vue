<template>
  <!-- --------------------- README ------------------- -->
  <!--  This component is for demo purposes.            -->
  <!--  It includes a volume bar, forward, backaward    -->
  <!--  seeking and a playback rate function            -->
  <!--                                                  -->
  <!--  Refer to EditorPage.vue, over there you will    -->
  <!--  have to parse in some functions i.e seekTime,   -->
  <!--  volumeChange and changePlayBackRate.            -->
  <!--                                                  -->
  <!-- So in short to use the ControlPanel , you will   -->
  <!-- only need this file and some other functions in  -->
  <!-- EditorPage.vue.                                  -->
  <!-- ------------------------------------------------ -->
  <div
    class="row justify-between items-center"
    :class="{'bg-rabbit-purple-8': !dark, 'bg-dark': dark}"
  >
    <!-- Volume Controller -->
    <div class="col-3 q-pa-md">
      <div class="row items-center no-wrap">
        <q-btn
          size="md"
          flat
          round
          color="grey-3"
          icon="mdi-volume-low"
          @click="decreaseVolume"
        />
        <q-slider
          v-model="volume"
          :min="0"
          :max="10"
          label
          color="amber-3"
          label-text-color="deep-purple-8"
          dark
          class="q-mx-sm"
          @change="handleVolumeChange"
        />
        <q-btn
          size="md"
          flat
          round
          color="grey-3"
          icon="mdi-volume-high"
          @click="increaseVolume"
        />
      </div>
    </div>

    <div class="col-6 text-center column items-center justify-center">
      <div class="flex row items-center">
        <div>
          <q-btn
            flat
            round
            icon="mdi-rewind"
            @click="seekBackward"
            color="grey-3"
            size="md"
          />
        </div>

        <div class="row items-center q-mx-md q-my-sm">
          <q-btn
            v-if="showPlayBtn"
            flat
            round
            icon="mdi-play"
            color="grey-3"
            @click="onPlay"
            size="xl"
          />
          <q-btn
            v-else
            flat
            round
            icon="mdi-pause"
            color="grey-3"
            @click="onPause"
            size="xl"
          />
          <p class="text-grey-3 q-mb-none q-mx-sm" style="font-size: 1.1rem">
            {{ timestamp }}
          </p>
        </div>

        <div>
          <q-btn
            ref="forward_btn"
            flat
            round
            icon="mdi-fast-forward"
            color="grey-3"
            @click="seekForward"
            style="md"
          />
        </div>
      </div>
    </div>

    <div class="col-3 q-px-lg row justify-end">
      <q-select
        v-model="rate"
        dense
        dark
        borderless
        fla
        :options="rateOptions"
        @update:model-value="handleRateChange"
        options-selected-class="text-amber-4"
        class="q-mr-md"
      >
        <template v-slot:before>
          <q-icon
            color="grey-3"
            class="q-mr-md"
            :name="rate > 1 ? 'mdi-rabbit' : 'mdi-tortoise'"
          />
        </template>
      </q-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import { videoService } from '../../services/video/videoService';
import { VideoController } from 'src/services/video/videoController'

export default defineComponent({
  name: 'ControlPanel',
  props: {
    dark: { type: Boolean,  required: true }
  },
  setup() {
    const { getVolume, updateUserPaused, currentVideo, getTimestamp, currentSpeed, getUserPaused } =
      videoService()
    const { seekTime, changePlayBackRate, volumeChange } = VideoController()
    const rate = reactive(currentSpeed)
    const volume = ref(10)
    const timestamp = ref('00:00:00')
    const showPlayBtn = ref(currentVideo.value.userPaused)

    const increaseVolume = () => {
      const volume = (getVolume.value * 10 + 1) / 10
      volumeChange(volume)
    };

    const decreaseVolume = () => {
      const volume = (getVolume.value * 10 - 1) / 10
      volumeChange(volume)
    };

    const handleVolumeChange = () => {
      volumeChange(volume.value / 10)
    };

    const onPause = () => {
      showPlayBtn.value = true
      updateUserPaused(true)
    };

    const onPlay = () => {
      showPlayBtn.value = false
      updateUserPaused(false)
    };

    const seekForward = () => {
      seekTime(getTimestamp.value + 5)
    };

    const seekBackward = () => {
      seekTime(getTimestamp.value - 5)
    };

    const handleRateChange = (val: number) => {
      changePlayBackRate(val)
    };

    watch(
      () => getTimestamp.value,
      (val) => {
        timestamp.value = new Date(val * 1000).toISOString().substr(11, 8)
      }
    );

    watch(
      () => getVolume.value,
      (val) => {
        volume.value = val * 10;
      }
    );

    watch(
      () => getUserPaused.value,
      (val) => {
        if (val === false) {
          showPlayBtn.value = false
        } else {
          showPlayBtn.value = true
        }
      }
    );

    return {
      timestamp,
      showPlayBtn,
      increaseVolume,
      decreaseVolume,
      onPause,
      onPlay,
      volume,
      seekForward,
      seekBackward,
      handleVolumeChange,
      handleRateChange,
      rate,
      rateOptions: ['2.0', '1.5', '1.0', '0.5', '0.25'],
    };
  },
});
</script>
