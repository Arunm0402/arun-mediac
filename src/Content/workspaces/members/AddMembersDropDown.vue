<template>
  <div>
    <q-btn-dropdown
      label="Add Members"
      no-caps
			outline
      icon="mdi-account-plus"
      color="grey-8"
    >
      <div>
        <div class="column items-center q-pa-lg">
          <div class="row wrap">
            <p class="q-my-none">
              Add member to workspace by email:
            </p>
          </div>
          <div class="q-my-md">
            <q-input
              :model-value="userToAdd"
              outlined
              no-caps
              dense
              stack-label
              placeholder="example@email.com"
              @keyup.enter="handleAddInvite()"
              @update:model-value="(evt) => handleInput(evt)"
            />
          </div>
          <div>
            <q-btn
              color="green-7"
              style="min-width: 140px"
              no-caps
              label="Add Member"
              @click="handleAddInvite()"
            />
          </div>
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
/**
 * In case you curious how the v-model:user-to-add syntax been implemented
 * here is the reference:
 * https://vuejs.org/guide/components/events.html#usage-with-v-model
 */

const props = defineProps({
  userToAdd: {}
})
props

const emit = defineEmits(['update:user-to-add', 'addInvite'])

const handleInput = (e) => {
  console.log(e)
  emit('update:user-to-add', e)
}

const handleAddInvite = () => {
  emit('addInvite')
}
</script>

<style scoped></style>
