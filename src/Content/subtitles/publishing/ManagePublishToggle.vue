<template>
  <div
    class="row no-wrap full-width justify-center items-center q-gutter-sm q-my-xs"
  >
    <!-- Item -->
    <div class="col-4 text-center">
      <div v-if="item">{{ item }}</div>
      <div v-else><b>Items</b></div>
    </div>
    <!-- Toggle -->
    <div class="col-4 text-center">
      <div v-if="status">
        <q-toggle
          dense
          color="green-6"
          :model-value="isPublished"
          :label="isPublished ? 'Published' : ''"
          @click="updateStatus()"
        />
      </div>
      <div v-else><b>Publishing Status</b></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  item: {},
  status: { type: String }
})

const emit = defineEmits(['updateStatus'])

const isPublished = computed(() => {
  return props.status == 'Published'
})

const updateStatus = () => {
  console.log('Manage Publishing Toggle Update status')
  const newStatus = isPublished.value ? 'Unpublished' : 'Published'
  emit('updateStatus', newStatus)
}
</script>

<style lang="scss" scoped>
b {
  font-weight: 800;
}
</style>
