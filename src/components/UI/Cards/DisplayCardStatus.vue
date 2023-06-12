<template>
  <div class="row items-center q-px-sm">
    <q-icon :name="icon" size="xs" :color="color" />
    <p class="q-ma-none q-pa-sm" :class="'text-' + color">
      {{ _status }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, requited: true, default: '' }
})

/**
 * Subtitle generated seems from an old ScribeRabbit requirement
 * Copied this here first. Subtitle Generated status represents
 * a group of other status which allows video to be edited
 */
const _status = computed(() => {
  const subtitleGeneratedStatus = [
    'completed',
    'transcribed',
    'translated',
    'editing'
  ]
  if (subtitleGeneratedStatus.includes(props.status.toLowerCase())) {
    return 'Subtitle Generated'
  } else {
    return props.status
  }
})

const icon = computed(() => {
  const iconMap: { [k: string]: string } = {
    pending: 'more_horiz',
    queueing: 'reorder',
    running: 'hourglass_top',
    translated: 'spellcheck',
    transcribed: 'assignment_turned_in',
    completed: 'done_all',
    failed: 'sms_failed',
    uploaded: 'hourglass_top',
    published: 'screen_share',
    'subtitle generated': 'done_all'
  }

  return iconMap?.[_status.value.toLowerCase()] || ''
})

const color = computed(() => {
  const colorMap: { [k: string]: string } = {
    pending: 'grey-5',
    queueing: 'grey-5',
    running: 'grey-5',
    translated: 'grey-5',
    transcribed: 'grey-5',
    completed: 'blue-5',
    failed: 'red-5',
    uploaded: 'grey-5',
    published: 'green-5',
    'subtitle generated': 'blue-5'
  }

  return colorMap[_status.value.toLowerCase()] || 'grey-5'
})
</script>

<style scoped></style>
