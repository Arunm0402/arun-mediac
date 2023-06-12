<template>
  <div class="position-index switch-mode" :style="style">
      <q-icon :name="modeIcon" style="font-size: 2.5rem;" class="cursor-pointer" @click="modeToggle" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { modeConfigController } from 'src/services/userSettings/modeConfigController';
import { userConfigService } from 'src/services/userConfig/userConfigService';

export default defineComponent({
  name: 'SwitchMode',
  props: {
    style: {
      type: String,
      default: ''
    },
  },
  setup(){
    const { modeToggle } = userConfigService()
    const { modeIcon } = modeConfigController()
    return {
      modeIcon,
      modeToggle
    }
  }
});
</script>

<style scoped>
.position-index{
  z-index: 9999;
}

@media only screen and (max-width: 600px) {
  .switch-mode {
    margin-top: 30% !important;
  }
}

</style>
