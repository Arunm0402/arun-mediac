<template>
  <div>
    <q-virtual-scroll
      type="table"
      class="member-table"
      style="max-height: 40vh"
      :items="memberData"
      :virtual-scroll-item-size="40"
      :virtual-scroll-sticky-size-start="40"
    >
      <template v-slot:before>
        <thead class="thead-sticky text-center">
          <tr>
            <th
              v-for="column in columns"
              :key="'1. ' + column.name"
              class="text-blue-10"
              style="color: blue; font-weight: bold; font-size: 15px"
            >
              {{ column.name }}
            </th>
            <th></th>
          </tr>
        </thead>
      </template>

      <template v-slot="{ item: row, index }">
        <tr :key="index" class="text-center">
          <!-- <td>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png">
                  </q-avatar>
                </td> -->
          <td v-for="column in columns" :key="index + '-' + column.name">
            <q-avatar
              v-if="column.prop == 'photo'"
              color="grey-9"
              text-color="white"
              size="md"
              icon="mdi-account"
            ></q-avatar>
            <div v-else-if="column.prop == 'error' && row['error']">
              <q-icon name="error_outline" color="red" size="xs">
                <q-tooltip class="bg-red">
                  <p style="max-width: 36ch" class="q-ma-none">
                    {{ row['error'] }}
                  </p></q-tooltip
                ></q-icon
              >
            </div>
            <span v-else>{{ row[column.prop] }}</span>
          </td>

          <td>
            <!-- Owner will not be able to remove himself from meber -->
            <q-btn
              v-if="row['role'] !== 'owner' && row['invid']"
              flat
              no-caps
              dense
              icon="mdi-dots-horizontal"
            >
              <q-menu>
                <q-list class="column">
                  <q-item class="q-pa-none">
                    <q-btn
                      flat
                      no-caps
                      label="Remove Member"
                      class="text-rabbit-purple-8"
                      @click="emitRemoveInvite(row['invid'])"
                    />
                  </q-item>

                  <q-item
                    class="q-pa-none"
                    v-if="
                      row['status'] == 'accepted' && row['role'] == 'viewer'
                    "
                  >
                    <q-btn
                      flat
                      no-caps
                      label="Set as Editor"
                      class="text-rabbit-purple-8"
                      @click="emitChangeRole(row['uid'], 'editor')"
                    />
                  </q-item>
                  <q-item
                    class="q-pa-none"
                    v-if="
                      row['status'] == 'accepted' && row['role'] == 'editor'
                    "
                  >
                    <q-btn
                      flat
                      no-caps
                      label="Set as Viewer"
                      class="text-rabbit-purple-8"
                      @click="emitChangeRole(row['uid'], 'viewer')"
                    />
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </td>
        </tr>
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script setup lang="ts">

import workspaceMemberStore from 'src/services/workspace/workspaceMemberStore'

const { memberData } =
  workspaceMemberStore()

const emit = defineEmits(['removeInvite', 'changeRole'])

const emitRemoveInvite = (invid: string) => {
  emit('removeInvite', invid)
}

const emitChangeRole = (uid: string, role: string) => {
  emit('changeRole', uid, role)
}

const columns = [
  { name: 'Photo', prop: 'photo' },
  { name: 'Name', prop: 'name' },
  { name: 'Email', prop: 'email' },
  { name: 'Status', prop: 'status' },
  { name: 'Role', prop: 'role' },
  { name: '', prop: 'error' }
]
</script>

<style scoped></style>
