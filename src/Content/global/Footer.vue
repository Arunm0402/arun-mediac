<template>
  <div
    class="
      q-pa-md
      row
      justify-between
      items-center
    "
    :class="{'bg-grey-1': !mode, 'text-rabbit-purple': !mode}"
  >
    <div class="">
      <div class="row q-gutter-md q-mb-none">
        <p>
          Powered by
          <a href="https://www.sentient.io/" target="_blank">Sentient.io</a>
        </p>
        <span>|</span>
        <a href="https://www.sentient.io/contact" target="_blank">Contact Us</a>
        <span>|</span>
        <a href="https://sentient.io/privacy.htm" target="_blank"
          >Privacy Policy</a
        >
      </div>
      <div>
        <p class="q-mb-none">
          Copyright ©{{ date.formatDate(Date.now(), 'YYYY') }} Sentient.io
          <small class="text-grey q-ml-md">V1.0.0</small>
        </p>
      </div>
    </div>
    <div>
      <a href="https://www.sentient.io/" target="_blank">
        <img
          src="../../../../src/assets/sentient-logo.png"
          style="height: 5rem"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'NewComponent',
 props: {
    mode: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return { date }
  }
})
</script>

<style lang="scss" scoped></style>
