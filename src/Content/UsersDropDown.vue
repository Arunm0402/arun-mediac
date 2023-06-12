<template>
  <div>
    <q-btn-dropdown :label="label" no-caps flat>
      <UserListItem
        v-for="user in usersRef"
        :key="user.name"
        :user-name="user.name"
        :user-description="user.description"
        class="cursor-pointer"
        @click="selectUser(user)"
      />
    </q-btn-dropdown>
  </div>
</template>

<script lang="ts">
import { usersInterface } from 'src/services/generalTypes';
import { defineComponent, ref } from 'vue';

import UserListItem from '../UI/UserListItem.vue';



export default defineComponent({
  components: {
    UserListItem,
  },
  props: {
    label: { type: String, default: 'Button Label' },
    users: { type: Array, required: true },
  },
  setup(props, { emit }) {
    const usersRef = ref(<usersInterface[]>props.users);

    function selectUser(user: usersInterface) {
      emit('selectUser', user);
    }
    return { usersRef, selectUser };
  },
});
</script>

<style scoped></style>
