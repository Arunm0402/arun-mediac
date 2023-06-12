
<template>
  <q-card flat bordered>
    <div class="q-pa-lg">
      <q-card-section horizontal>
        <q-card-section padding class="text-center col-3">
              <q-avatar
                icon="mdi-account"
                font-size="10rem"
                size ="12rem"
                text-color="rabbit-purple-6"
                color="light-blue-2"
              />
            <h4 class="q-my-none text-rabbit-purple q-mt-md"> {{this.name}} </h4>
            <h5 class="q-my-none text-rabbit-purple">{{this.role}}</h5>
          </q-card-section>

        <q-separator vertical></q-separator>

        <q-card-section class="col-9 q-pa-xl">
          <h5 class="text-rabbit-purple q-mt-none q-mb-md">General</h5>
            <div class="row justify-left">
              <div class="col-4 col-md-4">
                Email :
              </div>
              <div class="col-4 col-md-4">
                {{user.email_address}}
                <!-- {{ this.email }} -->
              </div>

            </div>
<!--
            <div class="row justify-left">
              <div class="col-4 col-md-4">
                Contact Number:
              </div>  
              <div class="col-4 col-md-4">
                {{ props.email }}
              </div>
            </div>
-->

<!-- comment out email notification service, not connected to any backend service          
  <h5 class="text-rabbit-purple q-mb-sm">Email Notifications</h5> 
             <div class="row justify-left">
              <div class="col-12 col-md-5">
              <Checkbox
                v-for="checkboxDetail of checkboxDetails"
                :details="checkboxDetail"
                :id="checkboxDetail.id"
                :key="checkboxDetail.id"
                :title="checkboxDetail.title"
                @click="checkboxDetail.checked = !checkboxDetail.checked"
              />
-->
              <!-- <div v-for="l of checkboxDetails" :key="l.id">
                {{ l.title }}<q-checkbox v-model="l.checked" color="orange" size="2rem" indeterminate-value="false" :id="l.id"/>
              </div> -->
<!--          </div>
          <div class="column items-end">
            <div class="col"/>
            <q-btn
            label="Save Changes"
            flat
            no-caps
            size=""
            class="bg-rabbit-orange self-start text-white q-mt-xl q-px-lg q-mb-lg"
          />
        </div>
          </div>
-->
        </q-card-section>
      </q-card-section>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent , ref} from 'vue'
//import Checkbox from 'src/components/Content/user/Checkbox.vue'
import { mockData } from 'src/services/mockData'


export default defineComponent({
  name: 'UserPreference',
  components: {
   // Checkbox
  },
  
  props: {
    //name: { type : String, default: '', required: true},
    //role: {type : String, default: 'user', required: true},
    email: {type : String, default: '', required: true},
    //contact: {type: String, default: '', required: true}
    user: {type: Object}



  },
  setup() {
    const { mockUserDetails } = mockData()
    const checkboxDetails = ref([
          { title: 'Billing Alerts', checked: false, id: '01' },
          { title: 'Workspace Edits', checked: false, id: '02' },
          { title: 'New Assignments', checked: false, id: '03' },
          { title: 'Newsletter', checked: false, id: '04' },
        ])
    return {
      props: mockUserDetails,
      checkboxDetails,
    }

  },

  data: () => ({
    // showList: true,

  }),
})
</script>

<style lang="scss" scoped></style>

