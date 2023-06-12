<template>
  <div class="bg-white" style="max-width: 100%">
    <div class="row q-gutter-md justify-end items-center no-wrap q-pa-md">
      <div style="width: 1.5rem; height: 1.5rem">
        <!-- Place Holder to force alignment -->
      </div>
      <div class="full-width">
        <h5 class="text-black q-ma-none text-center">Please select uploading method</h5>
      </div>
      <q-btn
        icon="close"
        color="red-9"
        @click="closeWindow()"
        flat
        size="0.75rem"
        style="width: 1.5rem; height: 1.5rem"
      />
    </div>
    <div>
      <q-tabs
        v-model="uploadOption"
        active-bg-color="indigo-10"
        active-color="white"
        class="bg-grey-2"
        breakpoint="999999"
      >
        <q-tab
          v-for="option in UPLOAD_OPTIONS"
          :key="option"
          :label="option"
          :name="option"
          no-caps
        />
      </q-tabs>

      <q-tab-panels v-model="uploadOption">
        <q-tab-panel
          v-for="(option, i) in UPLOAD_OPTIONS"
          :key="option"
          :name="option"
        >
          <slot :name="SLOT_NAMES[i]"></slot>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const UPLOAD_OPTIONS = ['File Uploading']//, 'URL Uploadiong']
const SLOT_NAMES = ['fromFile']//, 'fromUrl']
const uploadOption = ref(UPLOAD_OPTIONS[0])

export default defineComponent({
  setup(_, { emit }) {
    const closeWindow = () => {
      emit('closeWindow')
    }
    return {
      uploadOption,
      UPLOAD_OPTIONS,
      SLOT_NAMES,
      closeWindow
    }
  }
})
</script>

<style lang="scss" scoped></style>
