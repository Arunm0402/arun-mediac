<template>
  <div class="cursor-pointer">
    <q-card flat class="userSec">
      <q-item>
        <q-item-section avatar class="q-pr-sm">
          <q-avatar
            size="2.3rem"
            color="red"
            font-size="1.1rem"
            text-color="white"
            class="self-end"
          >
            <b v-if="userName!=null" style="font-weight: 800">{{ userName[0].toUpperCase() }}</b>
            <b v-else style="font-weight: 800">{{ 'U' }}</b>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="row justify-between items-center ">
            <q-item-label v-if="userName!=null" class="gt-xs" >{{ userName }}</q-item-label>
            <q-item-label v-else >{{ 'user' }}</q-item-label>
            <q-btn
              class="n-down-button"
              flat
              size="1rem"
              icon-right="mdi-menu-down"
            />
            <!-- <q-item-label v-if="userDescription" caption>{{
            userDescription
          }}</q-item-label> -->
          </div>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentHelper } from '../../services/contentHelper'

export default defineComponent({
  props: {
    userName: { type: String, default: 'User Name' },
    userDescription: { type: String, default: '' }
  },
  setup() {
    const { renderColorFromName } = contentHelper()
    return { renderColorFromName }
  }
})
</script>

<style scoped>
.n-down-button {
  width: 1px;
}
.userSec .q-item {
  padding: 8px 0;
}
</style>
