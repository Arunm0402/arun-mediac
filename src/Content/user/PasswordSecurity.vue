<template>
  <q-card flat bordered>
    <div class="q-pa-md">
      <div class="row">
          <div class="col">
            <h5 class="q-my-none userheader-2">Change Password</h5>
             <div class="q-pa-md">
            <div class="row justify-left ">
              <div class="col-8 col-md-4  q-pt-sm q-gutter-sm">
                <p class="userbody" >Current Password</p>
                <p class="userbody">New Password</p>
                <p class="userbody">Confirm Password</p>
              </div>
              <div class="col-8 col-md-7 q-gutter-sm" >
                  <q-input dense square filled v-model="currentPassword" type="Password" label="Placeholder" />
                  <q-input dense square filled v-model="newPassword" type="Password" label="Placeholder" />
                  <q-input dense square filled v-model="confirmPassword" type="Password" label="Placeholder" />
              </div>
            </div>
          </div>
          </div>
          <div class="col-2"></div>
      <div class="col-2">
          <br/>
          <br/>
        <q-btn
            label="Save Changes"
            flat
            no-caps
            size="md"
            class="bg-rabbit-orange self-start text-white q-mt-xls q-px-lg q-mb-lg"
          />
      </div>

        </div>
      </div>

    <div class="q-pa-md">

    <div class="row">
      <div class="col">
         <h5 class="q-my-none userheader-2">Delete Account</h5>
         <br/>
        <p class="q-my-none userbody">Once you delete your account, there is no going back. Please be certain.</p>
      </div>
      <div class="col-2">
      </div>
      <div class="col-2">
          <br/>
       <q-btn
        outline
        no-caps
        color="red"
        class= "q-py-xs"
        >
        <span style="font-weight:bold">Delete Account</span>
       </q-btn>
      </div>
    </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup () {
    return {
      currentPassword: ref(''),
      newPassword: ref(''),
      confirmPassword: ref('')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
