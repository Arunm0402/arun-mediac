<template>
  <div
    class="content-center q-pa-xl"
    style="
    overflow-x:scroll;
    "
  >
  <table
    class="text-center text-rabbit-purple"
    id="feature-matrix-table"
    style=""
  >
    <!-- Key Features -->
    <tr>
      <th>Key Features</th>
      <th v-for="sub in monthlySubscriptions" :key="sub.id">{{ sub.title }}</th>
    </tr>
    <tr>
      <td>Maximum Video length</td>
      <td v-for="vl in monthlySubscriptions" :key="`vl-${vl.id}`">{{ getValue(vl.featureTable, 'maximum_video_length') }}</td>
    </tr>
    <tr>
      <td>Maximum file upload size</td>
      <td v-for="mfus in monthlySubscriptions" :key="`mfus-${mfus.id}`">{{ getValue(mfus.featureTable, 'maximum_file_upload_size') }}</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td v-for="storage in monthlySubscriptions" :key="`storage-${storage.id}`">{{ getValue(storage.featureTable, 'storage') }}</td>
    </tr>
     <tr>
      <td>Transcription Time</td>
      <td v-for="t_time in monthlySubscriptions" :key="`t_time-${t_time.id}`">{{ getValue(t_time.featureTable, 'transcription_time') }}</td>
    </tr>

     <tr>
      <td>Translation Time</td>
      <td v-for="tr_time in monthlySubscriptions" :key="`tr_time-${tr_time.id}`">{{ getValue(tr_time.featureTable, 'translation_time') }}</td>
    </tr>
    <tr>
      <td>Workspaces</td>
      <td v-for="workspaces in monthlySubscriptions" :key="`workspaces-${workspaces.id}`">{{ getValue(workspaces.featureTable, 'workspaces') }}</td>
    </tr>
    <tr>
      <td>Customisable Watermark</td>
      <td v-for="c_w in monthlySubscriptions" :key="`c_w-${c_w.id}`" >
        <span v-if="getValue(c_w.featureTable, 'customise_watermark') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>
     <tr>
      <td>Subtitle download</td>
      <td v-for="s_download in monthlySubscriptions" :key="`s_download-${s_download.id}`">{{ getValue(s_download.featureTable, 'subtitle_download') }}</td>
    </tr>
    <!-- Collaboration -->
    <tr>
      <th>Collaboration</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Maximum Users</td>
      <td v-for="m_users in monthlySubscriptions" :key="`m_users-${m_users.id}`">{{ getValue(m_users.featureTable, 'maximum_users') }}</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td v-for="m_admins in monthlySubscriptions" :key="`m_users-${m_admins.id}`">{{ getValue(m_admins.featureTable, 'maximum_admin_users') }}</td>
    </tr>

    <!-- Security & Support -->
    <tr>
      <th>Security & Support</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
     <tr>
      <td>Single Sign on(SSO)</td>
       <td v-for="sso in monthlySubscriptions" :key="`sso-${sso.id}`" >
        <span v-if="getValue(sso.featureTable, 'single_sign_on') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

     <tr>
      <td>Authentication via google</td>
       <td v-for="login_g in monthlySubscriptions" :key="`login_g-${login_g.id}`" >
        <span v-if="getValue(login_g.featureTable, 'authentication_via_google') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

     <tr>
      <td>Email Support</td>
       <td v-for="e_support in monthlySubscriptions" :key="`e_support-${e_support.id}`" >
        <span v-if="getValue(e_support.featureTable, 'email_support') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

    <tr>
      <td>Help Center</td>
       <td v-for="h_center in monthlySubscriptions" :key="`h_center-${h_center.id}`" >
        <span v-if="getValue(h_center.featureTable, 'help_center') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

    <tr>
      <td>Invoicing</td>
       <td v-for="invoicing in monthlySubscriptions" :key="`invoicing-${invoicing.id}`" >
        <span v-if="getValue(invoicing.featureTable, 'invoicing') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

    <tr>
      <td>Personalised Onboarding Program</td>
       <td v-for="p_onboard in monthlySubscriptions" :key="`p_onboard-${p_onboard.id}`" >
        <span v-if="getValue(p_onboard.featureTable, 'personalised_onboarding_program') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>

     <tr>
      <td>Dedicated Account Representative</td>
       <td v-for="d_acc in monthlySubscriptions" :key="`d_acc-${d_acc.id}`" >
        <span v-if="getValue(d_acc.featureTable, 'dedicated_account_representative') === true"><q-icon name="mdi-check" style="padding: 5px"/></span>
        <span v-else><q-icon name="mdi-close" style="padding: 5px"/></span>
      </td>
    </tr>



  </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { subscriptionController } from 'src/services/subscription/subscriptionController'
import {
  featureLabelValue
} from 'src/services/subscription/subscriptionTypes'

export default defineComponent({
  name: 'FullFeaturesMatrix',
  setup() {
    const {
      monthlySubscriptions,
      } = subscriptionController()

      const getValue = (features: featureLabelValue[], title: string) => {
        let value
        features.filter(function(feature: featureLabelValue, index) {
          if(feature.name == title){
            value = features[index].value
          }
        }).map(feature => feature.value);

        return value

      }
    return {
      getValue,
      monthlySubscriptions
    }
  },
})
</script>

<style lang="scss" scoped>
#feature-matrix-table {
  border-spacing: 0;
  border-collapse: collapse;
  width:100%;
}
#feature-matrix-table th {
  height: 50px;
  font-size: 1.5rem;
  padding-top: 20px;
  min-width: 200px;
}
#feature-matrix-table{
  border-top: 1px solid #4209B4;
}
#feature-matrix-table th:not(:first-child) {
  border-left: 1px solid #4209B4;
}
#feature-matrix-table td {
  height: 25px;
  padding-top:10px;
  min-width: 200px;
}
#feature-matrix-table td:not(:first-child) {
  border-left: 1px solid #4209B4;
}
#feature-matrix-table td:first-child {
  width: 20%;
  text-align: left;
}
</style>
