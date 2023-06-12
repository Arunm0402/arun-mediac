<template>
  <div>
      <!-- Note: This component will only show up if the user exceeds video count -->
      <div class="container">
          <q-card class="row" style="background: bisque;">
            <q-icon
              name="mdi-alert-rhombus"
              size="3.5rem"
              color="red"
              class="col-1"
            />
            <q-card-section class= "column col-9">
                <div class="col-5" style="margin: 0px;">
                    <p class="text-red text-weight-bold" style="font-size: 20px;">
                        Storage is full!
                    </p>
                </div>
                <div class="col-7">
                    <p class="font-warning">
                        You have reached 100% storage space of your current plan! Please 
                        <a href="#">upgrade</a>
                        to continue upload new videos. Exceeded document will be deleted after
                        <span style="color: red;">14 days</span>.
                    </p>
                </div>
            </q-card-section>

            <q-btn class="col-2"
                label="DISMISS"
                text-color="red"
                style="font-size: 16px;"
                flat
                no-caps
                v-close-popup
                @click="dismiss"
            />
          </q-card>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'UserStorageFull',
    components: {},
    setup() {
        const isVisible = ref(true)

        const dismiss = () => {
            isVisible.value = false
            console.log(isVisible)
        }

        return { dismiss }
    }
})
</script>

<style lang="scss" scoped>
.font-warning {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
}

.light-orange {
  background: rgba(214, 36, 0, 0.04);
}

.container {
    position: fixed;
    max-width: 900px;
    bottom: 10%;
    left: 20%;
}
</style>