<template>
  <div>
    <div>
      <q-btn
        label="Configurations"
        no-caps
        icon="mdi-cog-outline"
        @click="() => (isEditingConfigs = true)"
      />
    </div>

    <!-- Everything below will be displayed in a popup window -->
    <div>
      <q-dialog v-model="isEditingConfigs" maximized>
        <div class="local_user-config-window q-pa-lg column no-wrap">
          <!-- Configuration Header -->
          <div
            style="height: 52px"
            class="q-pb-md row no-wrap justify-between items-center"
          >
            <h5 class="q-ma-none" style="white-space: break-spaces">
              Subtitle Configurations
            </h5>

            <q-btn icon="close" round flat dense v-close-popup />
          </div>

          <!-- Config options -->
          <!-- 
            To add new configuration items, create a new q-tab together 
            with a new q-tab-panel with the same v-model name.

            For example: Hot Key Settings is a config item, 
            Subtitle Settings is another config item

            Detailed configuration item should placed within q-tab-panels
            as individual component.
          -->
          <div class="full-height">
            <q-splitter :model-value="20" class="full-height">
              <!-- Left side tabs -->
              <template v-slot:before>
                <q-tabs
                  v-model="tab"
                  vertical
                  no-caps
                  class="text-grey-6"
                  active-class="text-grey-9"
                >
                  <q-tab name="hotkey" label="Hot Key Settings" />
                  <q-tab name="subtitle" label="Subtitle Settings" />
                </q-tabs>
              </template>

              <!-- Right side config details -->
              <template v-slot:after>
                <q-tab-panels v-model="tab" vertical class="q-pa-none">
                  <q-tab-panel name="hotkey">
                    <EditHotKeySettings />
                  </q-tab-panel>

                  <q-tab-panel name="subtitle">
                    <UserSettings />
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditHotKeySettings from 'src/components/Content/settings/EditHotKeySettings.vue'
import UserSettings from 'src/components/Content/settings/UserSettings.vue'

import { ref } from 'vue'

const isEditingConfigs = ref(false)
const tab = ref('hotkey')
</script>

<style lang="scss" scoped>
h5 {
  font-weight: 700;
  color: $grey-9;
}

h5 .dark {
  color: $grey-2;
}

.local_user-config-window {
  width: clamp(200px, 90vw, 1400px);
  height: clamp(300px, 90vh, 800px);
  border-radius: 16px !important;
  background-color: white;
}

.local_user-config-window .dark {
  background-color: $grey-9;
}

.q-tab-panels {
  background-color: rgba(0, 0, 0, 0);
}
</style>

<style>
/* Global style required here to make the q-tab item left aligned */
.local_user-config-window .q-tab__content {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  white-space: break-spaces;
}
.local_user-config-window .q-tab-panel {
  padding: 0;
}
.local_user-config-window .q-tab-panels {
  height: 100%;
}
</style>
