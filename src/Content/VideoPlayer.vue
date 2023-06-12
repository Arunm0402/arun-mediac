<template>
  <div class="video-container" :class="fontSize">
<p>Change Subtitle Size</p>
    <q-btn-group push>
      <q-btn push @click="()=> fontSize = 'sr__small-font'" label="S" />
      <q-btn push @click="()=> fontSize = 'sr__medium-font'" label="M" />
      <q-btn push @click="()=> fontSize = 'sr__large-font'" label="L" />
    </q-btn-group>
    <video
      id="player"
      class="video-js vjs-default-skin vjs-big-play-centered"
      ref="playerRef"
    ></video>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  watch,
  PropType,
  ref
} from 'vue'
import { videoService } from 'src/services/video/videoService'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import '/src/css/VideoPlayerSubtitles.scss'
import { VideoSegmentService } from 'src/services/video/videoSegmentService'
import { artifact } from 'src/services/artifacts/artifactTypes'
import { userConfigService } from 'src/services/userConfig/userConfigService'
import { hotkeysController } from 'src/services/hotkeys/hotkeysController'
import { VideoController } from 'src/services/video/videoController'

// Placing it temporarily here
const VideoJSConfig = {
  fluid: true,
  liveui: false, // No realtime streams at this stage
  responsive: true,
  autoplay: false,
  controls: true,
  preload: 'auto',
  aspectRatio: '16:9',
  normalizeAutoplay: true,
  html5: {
    nativeTextTracks: false,
    vhs: {
      overrideNative: true
    }
  }
}

export default defineComponent({
  name: 'VideoPlayer',
  props: {
    videoId: { type: String, required: true },
    vid: {
      type: Object as PropType<artifact>,
      required: true
    },
    url: { type: String, required: true }
  },
  setup(props, ctx) {
    const {
      updateVideoHeight,
      getTimestamp,
      updateTimestamp,
      updateVolume,
      updateUserPaused,
      getUserPaused,
      updateSpeed,
      updateVideoDuration,
    } = videoService()

    const {
      updateSegment,
      updateSegmentPlaying,
      getSegmentEndtime,
      updateIsClicked,
      getIsSegmentPlaying,
      getIsClicked,
      getSegmentCueId,
      getSegmentStartTime,
      clearSegment
    } = VideoSegmentService()

    const { storePlayer, addSubtitles, seekTime, getTrack } = VideoController()


    // This variable acts as a store for the subtitle font size. Refer to the styles at the bottom of the file for more info.
    const fontSize = ref('')
    // hot key information set in config services
    const { hotKeyConfig } = userConfigService()
    const playerRef = ref<HTMLElement>()
    let player: videojs.Player
    let prevTime = 0
    let currTime = 0

    onMounted(async () => {
      if (!props.vid) return
      console.log(props.videoId)
      player = videojs(playerRef.value as HTMLElement, VideoJSConfig)
      storePlayer(player)
      await addSubtitles(props.videoId)
      const track = getTrack.value


      player.ready(() => {
        updateVideoHeight(player.currentHeight())
        player.src(
          `https://services-dev.scriberabbit.com/videos/hlsplay/${props.url}.m3u8`
        )
        player.focus()
      })

      player.on('playerresize', () => {
        ctx.emit('heightChanged', player.currentHeight())
      })

      player.on('componentresize', () => {
        ctx.emit('heightChanged', player.currentHeight())
      })

      player.on('timeupdate', () => {
        // If video is playing, update store
        if (!player.paused()) {
          prevTime = currTime
          currTime = player.currentTime()
          updateTimestamp(currTime)
        }

        // SubtitleEditingUnit play button's logic
        // Once we exceed the segment's endtime, pause the video
        // then check if the segment is playing because the user toggled the segment's play button previously
        if (
          player.currentTime() >= getSegmentEndtime.value &&
          getIsSegmentPlaying.value
        ) {
          if (getIsClicked.value) {
            player.paused()
            updateUserPaused(true)
            updateSegmentPlaying(false)
            updateIsClicked(false)
          } else {
            // continue playing the video since we have not exceed the segment's endtime
            updateSegmentPlaying(false)
          }
        }

        // SubtitleEditingUnit play button's logic
        // Update the segment if the active cue change
        // Qn: Will it be more efficient to do using `oncuechange` event ?
        // It might be but the reason why this block is in `timeupdate` event is because I am which event fires first
        // hence to be safe I have placed this block in `timeupdate` event.
        if (track) {
          let currentCues = track.activeCues

          if (currentCues !== null && currentCues.length !== 0) {
            // In rare cases where there are > 1 cue in the same time, take the last cue
            let idx = currentCues.length > 1 ? currentCues.length : 0
            console.log(track, track.activeCues, currentCues[idx], 'currentCues[idx]----------');
            let data = {
              start_time: currentCues[idx].startTime,
              end_time: currentCues[idx].endTime,
              subtitle_id: currentCues[idx].id
            }
            if (getSegmentCueId.value !== data.subtitle_id){
              updateSegment(data)
              updateSegmentPlaying(true)
            }
          }
          // There are no active cues playing. Hence we will just clear the store and reset other boolean variables
          else if (currentCues !== null && currentCues.length === 0) {
            clearSegment()
            updateSegmentPlaying(false)
            updateIsClicked(false)
          }
        }
      })

      // This function emits the current time once the video has finished playing
      player.on('ended', () => {
        ctx.emit('ended', player.currentTime())
      })
      // Pause function
      player.on('pause', () => {
        updateUserPaused(true)
      })
      // Play function
      player.on('play', () => {
        updateUserPaused(false)
      })
      // Seek function
      player.on('seeking', () => {
        // This check is necessary to ensure that the player remains in the pause state
        // if we seek from timestamp : '00:00:00' to another timestamp

        if (prevTime === 0 && !getIsClicked) {
          currTime = player.currentTime()
          updateTimestamp(currTime)
          player.pause()
        } else {
          currTime = player.currentTime()
          updateTimestamp(currTime)
          /*
            This logic is for the play button in SubtitleEditingUnit
            If the user disrupts the playing of the segment by seeking via the VideoPlayer or ControlPanel (i.e seek + 5 seconds / - 5 seconds),
            the video will continue to play even if the currentTime() >= segmentEndTime / currentTime() <= segmentStartTime (hence 1st and 2nd condition)
          */
          if (
            getSegmentStartTime.value <= player.currentTime() &&
            player.currentTime() <= getSegmentEndtime.value &&
            getIsClicked
          ) {
            void player.play()
          } else {
            // Reset segment and boolean variables
            clearSegment()
            updateSegmentPlaying(false)
            updateIsClicked(false)
          }
        }
      })

      player.on('volumechange', () => {
        updateVolume(player.volume())
      })

       player.on('loadeddata', () => {
        updateVideoDuration(player.duration())
      })

    })

    onBeforeUnmount(() => {
      if (player) {
        player.dispose()
      }
    })

    const { activateHotkey, initHotkeys } = hotkeysController()
    if (hotKeyConfig.get('rewind')) {
      activateHotkey('rewind', () => {
        // seek 10s before
        seekTime(getTimestamp.value - 10)
      })
    }

    if (hotKeyConfig.get('fastForward')) {
      activateHotkey('fastForward', () => {
        // seek 10s later
        seekTime(getTimestamp.value + 10)
      })
    }

    const muteToggle = () => {
      // mute and unmute | - SYSTEM volume
      if (player.muted()) {
        player.volume(1)
        player.muted(false)
      } else {
        player.volume(0)
        player.muted(true)
      }
    }
    if (hotKeyConfig.get('mute')) {
      activateHotkey('mute', muteToggle)
    }
    const increaseSpeed = () => {
      // play faster
      const currentRate = player.playbackRate()
      if (currentRate === 2) {
        console.log('Maximum rate reached')
      } else {
        player.playbackRate(currentRate + 0.25)
        // so apparently player.playbackRate() here doesn't update
        updateSpeed(currentRate + 0.25)
      }
    }
    if (hotKeyConfig.get('increaseSpeed')) {
      activateHotkey('increaseSpeed', increaseSpeed)
    }
    const decreaseSpeed = () => {
      // play slower
      const currentRate = player.playbackRate()
      if (currentRate === 0.25) {
        console.log('Minumum rate reached')
      } else {
        player.playbackRate(currentRate - 0.25)
        updateSpeed(currentRate - 0.25)
      }
    }
    if (hotKeyConfig.get('decreaseSpeed')) {
      activateHotkey('decreaseSpeed', decreaseSpeed)
    }
    initHotkeys()

    watch(
      () => getUserPaused.value,
      async (userPaused) => {
        if (userPaused === true) {
          player.pause()
        } else {
          if (player.paused()) {
            await player.play()
          }
        }
      }
    )


    return {
      playerRef,
      fontSize
    }
  }
})
</script>

<style>
/* Refer to https://github.com/sentient-io/SG-ScribeRabbit-frontend/issues/14 */

/* SEE src/css/VideoPlayerSubtitles.scss for more information */
</style>
