<template>
  <div>
    <div class="row items-center no-wrap">
      <p class="n-p">{{ action }}</p>
      <q-linear-progress
        size="12px"
        :value="Progress"
        color="amber-5"
        track-color="grey-4"
        rounded
        style="min-width: 240px"
      >
        <div class="absolute-full flex flex-center">
          <p class="q-ma-none text-black" style="line-height: 0px">
            {{ floatToPercent(Progress) }}
          </p>
        </div>
      </q-linear-progress>
      <p class="n-p">by {{ user }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import { contentHelper } from '../../services/contentHelper';

export default defineComponent({
  props: {
    progress: { type: Number, default: 0.5 },
    user: { type: String, default: 'Progress Label' },
    action: { type: String, default: 'Title' },
  },
  setup(props) {
    const { floatToPercent } = contentHelper();

    function progressClamp(num: number) {
      if (num > 1) {
        return 1;
      } else {
        return num;
      }
    }

    watch(props, () => {
      /** Watching the props change, update progress */
      Progress.value = progressClamp(props.progress);
    });

    const Progress = ref(progressClamp(props.progress));

    return { floatToPercent, Progress };
  },
});
</script>

<style scoped>
.n-p {
  white-space: pre;
  margin: 0px 0.5rem;
}
</style>