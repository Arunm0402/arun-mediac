<template>
<q-drawer
      v-model="leftDrawerOpen"
      :width="278"
      :breakpoint="500"
      bordered
      class="bg-rabbit-purple"
    > 
      <q-list>
        <br />
        <img
        src="~assets/mc-logo.svg"
        style="height: 44px"
        class="bg-rabbit-purple-8"
        alt="Scribe Rabbit Logo"
      />

        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            class="bg-rabbit-purple drawer-label full-width"
            icon="mdi-airballoon"
            label="Work Space"
          >
            <q-card>
              <q-card-section class="drawer-drop-down">
                <h5 class="q-my-none  text-rabbit-purple">Workspace 1</h5>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>

        <q-item clickable tag="a" target="_blank" rel="noopener" href="">
          <q-item-section avatar>
            <q-icon
              name="settings"
              class="bg-rabbit-purple text-white full-width"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="bg-rabbit-purple drawer-label full-width"
              >Settings</q-item-label
            >
          <q-item-label caption>@QuasarFramework</q-item-label> 
          </q-item-section>
        </q-item>

        <q-item
          clickable
          tag="a"
          target="_blank"
          rel="noopener"
          href="https://facebook.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon
              name="mdi-logout"
              class="bg-rabbit-purple text-white full-width"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="bg-rabbit-purple drawer-label full-width"
              >Logout</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-drop-down{
  color: #4209B4;
}
.logo{
  background-color: #FFFFFF;
  fill: #FFFFFF;
}
.drawer-label{
  color: #FFFFFF;
  font-weight: 700;
  font-size: 20px;
}

</style>