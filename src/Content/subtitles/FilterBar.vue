<template>
<q-separator :dark="dark" />
  <q-card flat class="my-card q-mt-none bg-grey-2">
    <q-card-section class="row justify-between">
      <div :class="[!isSlideToggle ? 'col-6' : 'col-12']">
        <subtitle-filter-unit :dark="dark" :indexCount="1"></subtitle-filter-unit>
      </div>
        <div class="col-6" v-if="!isSlideToggle">
          <subtitle-filter-unit :dark="dark" :indexCount="2"></subtitle-filter-unit>
        </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import {  defineComponent } from 'vue'
import SubtitleFilterUnit from './SubtitleFilterUnit.vue'
import { translationScroll } from 'src/services/translate/translationScroll'


export default defineComponent({
  name: 'FilterBar',
  props:{
    dark: { type: Boolean,  required: true }
  },
  components:{
    SubtitleFilterUnit
  },
   setup() {
    const { isSlideToggle } = translationScroll()
    return {
      isSlideToggle
    }
   }

})
</script>
