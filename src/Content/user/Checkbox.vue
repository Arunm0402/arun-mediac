<template>
  <div>
    <q-item tag="label" v-ripple>
      <q-item-section side center>
        <!-- <q-checkbox color="orange" : v-model="localValue" /> -->
        <q-checkbox v-model="CheckedBool" color="orange" size="2rem" indeterminate-value="false" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { checkboxInterface } from 'src/services/userConfig/userConfigTypes'
export default defineComponent({
  name: 'checkbox',
  props: {
    title: {
      type: String,
      required: true
    },
    details:{
      type: Object as PropType<checkboxInterface>,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props){
    const CheckedBool = ref(props.details.checked)
    return{
      CheckedBool
    }
  },
})
</script>

<style scoped>

</style>

