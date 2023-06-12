<template>
  <div class="row no-wrap items-center">
    <q-btn-dropdown flat no-caps>
      <template v-slot:label>
        <TranscribeProgressBar
          :progress="progressesRef[current].progress"
          :user="progressesRef[current].user"
          :action="progressesRef[current].action"
        />
      </template>
      <div v-for="(progress, index) in progressesRef" :key="index">
        <TranscribeProgressBar
          class="q-pa-md cursor-pointer"
          v-if="index !== current"
          :progress="progress.progress"
          :user="progress.user"
          :action="progress.action"
          @click="current = index"
        />
      </div>
    </q-btn-dropdown>

    <!-- Mark as complete button -->
    <div style="width: 157px">
      <FlatButtonWithIcon
        v-show="progressesRef[current].progress < 1"
        @click="progressesRef[current].progress = 1"
        color="green-6"
        label="Mark as complete"
        icon="mdi-check-all"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import TranscribeProgressBar from './TranscribeProgressBar.vue';
import FlatButtonWithIcon from '../UI/Buttons/FlatButtonWithIcon.vue';
import { progressInterface } from 'src/services/generalTypes';



export default defineComponent({
  components: { TranscribeProgressBar, FlatButtonWithIcon },
  props: {
    progresses: { type: Array, required: true },
    // labels: { type: Array, required: true },
  },
  setup(props) {
    const progressesRef = ref(<progressInterface[]>props.progresses);
    const current = ref(0);

    return { current, progressesRef };
  },
});
</script>

<style scoped></style>
