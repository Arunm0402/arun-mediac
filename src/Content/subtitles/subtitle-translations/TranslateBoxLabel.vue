<template>
  <div>
    <div>
      {{ label }}

      <!-- 
				Need this span with v-if permission control because only user who 
				can view unpublished content will see the hints, for viewers, what
				ever they see by default should be already published.
				-->
      <span
        v-if="userPermissions.includes(permissions.VIEW_UNFINISHED_CONTENT)"
        :class="'text-' + color"
      >
        <b> ({{ _status }})</b>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import permissionController from 'src/services/workspace/workspacePermissionController'

import { computed } from 'vue'

const { userPermissions, permissions } = permissionController()

const props = defineProps({
  label: { type: String, required: true },
  status: { type: String, required: true }
})

const _status = computed(() => {
  if (props.status.toLowerCase() == 'published') return props.status
  if (props.status.toLowerCase() == 'completed') return 'Editing'
  return 'Pending...'
})

const color = computed(() => {
  const statusColorMap: { [k: string]: string } = {
    published: 'green-5',
    editing: 'blue-5'
  }
  return statusColorMap[_status.value.toLowerCase()] || 'grey-5'
})
</script>

<style lang="scss" scoped></style>
