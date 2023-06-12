<template>
    <div class="row" style="width: 100%">
      <div class="col-md-4">
        <span color="grey-9" class="text-grey-6" align="middle">CPS: <span :class="{'text-red-10': alertCPS.length > 0, 'q-pl-sm': true}"> {{ computedCPS }}</span>/{{ cpsConfig }} </span>
      </div>
      <div class="col-md-4 text-center">
        <span color="grey-9" class="text-grey-6" align="middle">CPL: <span :class="{'text-red-10': alertCPL.length > 0, 'q-pl-sm': true}">{{ computedCPL }}</span>/{{ cplConfig }}</span>
      </div>
      <div class="col-md-4 text-right">
        <span color="grey-9" class="text-grey-6" align="middle">Characters: {{ trimmedText.length }}</span>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { userConfigService } from '../../../services/userConfig/userConfigService'

export default defineComponent({
  props: {
    startTime: { type: Number, default: 0 },
    endTime: { type: Number, default: 0 },
    subtitleText: { type: String, default: '' },
  },
  setup(props) {
    const { cpsConfig, cplConfig } = userConfigService()
    const trimmedText = computed(() =>
      props.subtitleText.trim().replace(/\s+/g, ' ')
    )
    const duration = computed(
      () =>
        Math.round(
          ((props.endTime - props.startTime) + Number.EPSILON) * 100
        ) / 100
    )
    const computedCPL = computed(() => {
      const comparer = (prevLineLength: number, nextLineLength: number) =>
        Math.max(prevLineLength, nextLineLength)
      return props.subtitleText
        .split(/\n/g)
        .map((line) => line.length)
        .reduce(comparer)
    })
    const wordCount = computed(() =>
      trimmedText.value !== '' ? trimmedText.value.split(' ').length : 0
    )
    const computedCPS = computed(() =>
      trimmedText.value !== ''
        ? Math.round(trimmedText.value.length / duration.value)
        : 0
    )

    const alertCPS = computed(() => {
      return computedCPS.value > cpsConfig.value
        ? 'Characters per second exceeded limitation'
        : ''
    })
    const alertCPL = computed(() => {
      return computedCPL.value > cplConfig.value
        ? 'Characters per line exceeded limitation'
        : ''
    })
    const computedLines = computed(() =>
      trimmedText.value !== '' ? props.subtitleText.split(/\n/g).length : 0
    )

    return {
      duration,
      wordCount,
      computedCPL,
      computedCPS,
      computedLines,
      trimmedText,
      alertCPS,
      alertCPL,
      cplConfig,
      cpsConfig
    }
  },
})
</script>

<style scoped>
.n-subtitle-status-unit > div {
  max-height: 32px;
  margin-bottom: 0.25rem;
}
.text-right{
  right: 0;
}
</style>
