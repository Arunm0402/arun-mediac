<template>
  <img
    class="n-top-banner-image"
    :class="responsive"
    src="~assets/landing-page-images/scribe-rabbit-subtitle-interface.png"
    alt="scribe-rabbit-subtiitle-interface"
    style="
    z-index: 1;
    "
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SubtitleInterface',
  props:{
    responsive: {
      type: String,
      default: 'lt-xl'
    }
  },

})
</script>
