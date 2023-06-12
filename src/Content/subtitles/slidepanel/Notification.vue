<template>
  <div class="row items-left">
    <div class="col-md-7 col-xs-12">
      <div>
        <q-chip color="grey-9" square :class="{'text-teal-5': dark}" class="q-ma-none text-teal-5 text-caption">
          <q-avatar :color="dark ? 'grey-8' : 'grey-5'" icon="mdi-bullhorn" text-color="white"></q-avatar>
          <q-icon name="mdi-check-all" class="q-mr-sm" />
          <p class="q-ma-none">Subtitle Saved {{displayTime}} ago</p>
        </q-chip>
      </div>
    </div>
    <div class="col-md-5 col-xs-12 q-gutter-xs text-right">
      <q-btn
        size="sm"
        icon="mdi-content-save-outline"
        square
        color="teal-7"
        label="Save Now"
        no-caps
        @click="save"
      />
    </div>
    <div class="col-12 col-md-12 q-mt-md text-center" v-if="false">
       <q-btn
          size="sm"
          flat
          icon="mdi-undo-variant"
          color="grey-7"
          label="Undo"
          no-caps
          @click="attemptUndo"
        />
        <q-btn
          size="sm"
          flat
          icon="mdi-redo-variant"
          color="grey-7"
          label="Redo"
          no-caps
          @click="attemptRedo"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onMounted, ref } from 'vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { EventController } from 'src/services/events/eventController'

export default defineComponent({
  name: 'Notification',
  props:{
    dark: { type: Boolean,  required: true }
  },
  setup() {
    const { save, lastSaved } = subtitleController()
    const { undo, redo } = EventController()

    const displayTime = ref('')
    let timer: NodeJS.Timer
    onMounted(() => {
      timer = setInterval(() => {
        const timeDiff = (Date.now() - lastSaved.value) / 1000

        displayTime.value = `${Math.floor(timeDiff / 60)} min ${Math.floor(timeDiff % 60)}s`
      }, 5000)
    })

     const attemptUndo = () => {
      void undo()
    }

    const attemptRedo = () => {
      void redo()
    }

    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      save,
      displayTime,
      attemptUndo,
      attemptRedo,
    }
  },
})
</script>

<style scoped></style>
