<template>
  <div class="row items-left">
    <div class="col-md-10">
      <div :class="{'bg-grey-9': dark}">
        <q-chip :color="dark ? 'grey-9' : ''" square :class="{'text-teal-5': dark}" class="q-ma-none text-teal-5">
          <q-avatar :color="dark ? 'grey-8' : 'grey-5'" icon="mdi-bullhorn" text-color="white"></q-avatar>
          <q-icon name="mdi-check-all" class="q-mr-sm" />
          <p class="q-ma-none">Subtitle Saved {{displayTime}} ago</p>
        </q-chip>
      </div>
    </div>
    <div class="col-md-2 row justify-start">
      <q-btn
        class="q-ml-md q-ma-none q-px-sm"
        size="0.8rem"
        outline
        icon="mdi-content-save-outline"
        dense
        square
        color="teal-7"
        label="Save Now"
        no-caps
        @click="save"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onMounted, ref } from 'vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'

export default defineComponent({
  name: 'NotificationBar',
  props:{
    dark: { type: Boolean,  required: true }
  },
  setup() {
    const { save, lastSaved } = subtitleController()

    const displayTime = ref('')
    let timer: NodeJS.Timer
    onMounted(() => {
      timer = setInterval(() => {
        const timeDiff = (Date.now() - lastSaved.value) / 1000

        displayTime.value = `${Math.floor(timeDiff / 60)} min ${Math.floor(timeDiff % 60)}s`
      }, 5000)
    })

    onUnmounted(() => {
      clearInterval(timer)
    })
    return {
      save,
      displayTime
    }
  },
})
</script>

<style scoped></style>
