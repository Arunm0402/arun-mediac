<template>
  <div>
    <q-breadcrumbs class="row no-wrap">
      <q-breadcrumbs-el icon="mdi-domain" class="s-text-marine-purple" />
      <q-breadcrumbs-el
        icon="mdi-folder-outline"
        class="s-text-marine-purple"
      />
      <q-breadcrumbs-el
        icon="mdi-movie-open-outline"
        class="s-text-marine-purple"
        :label="sortenTitle('Current Video Title', 12)"
      />
    </q-breadcrumbs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { contentHelper } from '../../services/contentHelper';

export default defineComponent({
  setup() {
    const { sortenTitle } = contentHelper();

    return {
      sortenTitle,
    };
  },
});
</script>

<style scoped></style>
