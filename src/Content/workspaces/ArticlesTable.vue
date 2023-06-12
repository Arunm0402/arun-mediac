<template>
  <div>
    <q-table
      ref="tableRef"
      :rows="userRows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
			@row-click="emitSelectArticle"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge class="status published" :label="props.value"></q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  userRows: { required: true },
})

const emit = defineEmits(["selectArticle", "selectMultipleArticle"])

const emitSelectArticle = () =>{
	emit('selectArticle', "test-select-article")
}

const emitSelectMultipleArticle = () =>{
	emit("selectMultipleArticle", 'some other value')
}

const columns = [
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
    required: true,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
    sortable: true,
  },
  { name: "uploaded", align: "left", label: "Uploaded By", field: "uploaded" },
  { name: "source", align: "left", label: "Source", field: "source" },
  {
    name: "datecreate",
    align: "left",
    label: "Date Created",
    field: "datecreate",
    sortable: true,
  },
  {
    name: "datemodifi",
    align: "left",
    label: "Date Modified",
    field: "datemodifi",
    sortable: true,
  },
]
</script>

<style scoped></style>
