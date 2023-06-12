<template>
  <div class="n-contact-us" :class="`text-${bgRabbit} bg-${bgRabbit}`">
    <div class="row justify-center">
      <h3 class="text-weight-bold text-rabbit-purple">Got Questions?</h3>
    </div>
    <div class="row justify-center q-mx-auto" style="max-width: 1440px">
      <!--  -->
      <div class="column items-center col-sm-6 col-12 text-rabbit-purple">
        <!-- Address -->
        <div class="column q-gutter-md">
          <div class="row q-gutter-md no-wrap">
            <q-icon size="lg" name="mdi-email-outline" />
            <a
              href="mailto:enquiry@sentient.io"
              style="text-decoration: none"
              class="text-rabbit-purple"
            >
              <span style="font-size: 20px">{{ ENQUIRY_EMAIL }}</span>
            </a>
          </div>

          <div class="row q-gutter-md no-wrap">
            <q-icon size="lg" name="mdi-map-marker-outline" />
            <span style="font-size: 20px"
              >3 Fusionopolis Place #03-56 Galaxis Work Lofts <br />Singapore
              138523
            </span>
          </div>
        </div>
      </div>
      <!-- <q-list>
          <q-item class="q-mb-sm">
            <q-item-section avatar>
              <q-avatar>
                <q-icon size="lg" name="mdi-email" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-h5"
                ><a
                  href="mailto:enquiry@sentient.io"
                  class="text-rabbit-purple text-weight-bold text-h5"
                  style="text-decoration: none"
                  >enquiry@sentient.io</a
                ></q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item class="q-mb-sm">
            <q-item-section avatar>
              <q-avatar>
                <q-icon size="lg" name="mdi-map-marker-outline" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-weight-bold text-h5">
                3 Fusionopolis Place <br />
                #03-56 Galaxis Work Lofts <br />
                Singapore 138523
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list> -->

      <div
        class="column col-sm-6 col-12 q-gutter-md justify-center items-center q-pa-md"
      >
        <!-- <q-form
          @submit="submitContactMessage"
          class="full-width column q-gutter-md"
        > -->
        <div class="full-width no-wrap row q-row-gutter-md">
          <div class="col-6 q-pr-md">
            <q-input
              borderless
              dense
              label="Your Name"
              v-model="name"
              class="n-q-input q-pl-sm"
            />
          </div>

          <div class="col-6">
            <q-input
              borderless
              dense
              label="Email"
              v-model="email"
              class="n-q-input q-pl-sm"
            />
          </div>
        </div>

        <!-- <div class="full-width">
          <div class="col">
            <q-input
              borderless
              label="Phone Number"
              v-model="number"
              class="n-q-input q-pl-sm q-ml-sm"
            />
          </div>
        </div> -->
        <div class="full-width">
          <q-input
            borderless
            autogrow
            dense
            type="textarea"
            input-style="min-height:10rem"
            label="Message"
            v-model="message"
            class="n-q-input q-pl-sm"
          />
        </div>
        <div class="self-center">
          <a
            :href="`mailto:${ENQUIRY_EMAIL}?subject=ScribeRabbit Enquiry from ${name}&body=${message}`"
            style="text-decoration: none"
          >
            <q-btn
              rounded
              label="Submit"
              size="lg"
              class="text-white q-mx-sm q-mt-lg"
              :class="`bg-${rabbitPurpleLight}`"
              style="width: 200px"
            />
          </a>
        </div>
        <!-- </q-form> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import { modeConfigController } from 'src/services/userSettings/modeConfigController'

export default defineComponent({
  name: 'GetInTouch',
  setup() {
    const name = ref('')
    const email = ref('')
    const number = ref('')
    const message = ref('')

    const ENQUIRY_EMAIL = 'scriberabbit@sentient.io'

    const $q = useQuasar()
    const { bgRabbit, rabbitPurpleLight } = modeConfigController()
    const submitContactMessage = (e: Event) => {
      $q.notify({
        message: 'Enquiry submitted',
        color: 'green'
      })
      console.log(e)
    }

    return {
      name,
      email,
      number,
      message,
      submitContactMessage,
      bgRabbit,
      rabbitPurpleLight,
      ENQUIRY_EMAIL
    }
  }
})
</script>

<style lang="scss" scoped>
.n-q-input {
  outline: 2px solid hsl(260, 90%, 20%);
  border-radius: 8px;
}
@media only screen and (min-width: 1920px) {
  .n-contact-us {
    min-height: 800px;
  }
}
</style>
