<template>
  <div>
    <div v-if="label == 'Contact Us'">
      <a :href="link" style="text-decoration: none">
        <q-btn
          flat
          rounded
          no-caps
          dense
          size="1.35rem"
          class="cta-button"
          color="rabbit-purple"
          :label="label"
        />
      </a>
    </div>

    <div v-else>
      <q-btn
        flat
        rounded
        no-caps
        dense
        size="1.35rem"
        class="cta-button"
        color="rabbit-purple"
        to="/register"
        ripple
        :label="label"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {},
    link: {}
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.cta-button {
  background-color: rgba(255, 128, 102, 1);
  min-width: 180px;
}

.cta-button:hover {
  filter: brightness(1.1);
}
</style>
