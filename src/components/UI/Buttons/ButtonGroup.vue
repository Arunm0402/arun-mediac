
<template>
    <q-btn-toggle
          push
          glossy
          toggle-color="primary"
          :options="buttonOptions"
          style="height:20px"
        />
</template>
<script>
export default {
    props: {
        buttonOptions: {
        type: Array,
        default(){ [
        {label: 'Option1', value: '1'},
        {label: 'Option2', value: '2'},
        {label: 'Option3', value: '3'}
        ]}
        },
    },
    setup(){
        return {
        }
    }
}
</script>

<style>

</style>