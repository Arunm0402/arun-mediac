<template>
  <!--
    This component takes an array of strings as tab label input
    to insert tab content, use the tab title as v-slot name.

    All spaces in title have to be convert to unserscore.
    All tab titles to be convert to lower case
    -->
  <div>
    <q-tabs
      v-model="selectedTab"
      dense
      inline-label
      :class="{'bg-grey-2': !dark, 'text-grey-6': !dark}"
      :active-color="!dark ? 'orange-5' : ''"
      :indicator-color="!dark ? 'orange-5' :  ''"
      :active-bg-color="!dark ? 'white' :  ''"
      breakpoint="9999"
    >
      <q-tab
        v-for="(tab, idx) in tabs"
        :key="tab"
        :name="tab"
        :label="tab"
        no-caps
        :icon="idx < icons.length ? icons[idx] : ''"
      />
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated>
      <q-tab-panel
        :name="tab"
        v-for="tab in tabs"
        :key="tab + 'panel'"
        style="height: 100%"
      >
        <slot :name="tab.toLowerCase().replace(/\s/g, '_')">{{}}</slot>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { defineComponent, onMounted } from '@vue/runtime-core';
export default defineComponent({
  props: { tabs: { type: Array }, icons: { type: Array, default: () => [] }, dark: { type: Boolean,  required: true } },

  setup(props) {
    const selectedTab = ref('');
    onMounted(() => {
      selectedTab.value = props.tabs[0];
    });
    return { selectedTab };
  },
});
</script>

<style lang="scss" scoped></style>
