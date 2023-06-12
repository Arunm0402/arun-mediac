<template>
  <!-- <img
      :src="isDark ? 'dark-logo.svg' : 'mc-logo.png'"
      alt="Media Corp Logo"
    /> -->
    <img
            src="~assets/mc-logo.svg"
            alt="Media Crop logo"
          />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { modeConfigController } from 'src/services/userSettings/modeConfigController';

export default defineComponent({
  name: 'LogoMode',
  props: {
    style: {
      // Disabled the type check below to avoid console warning
      // type:String,
      default:''
    },
  },
  setup(){
    const { isDark } = modeConfigController()
    return {
      isDark
    }
  }
});
</script>

<style scoped>
.layout-logo{
  width: 88px;
height: 53px;
}
</style>
