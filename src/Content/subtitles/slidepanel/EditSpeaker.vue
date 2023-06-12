<template>
 <q-card class="q-page-dark" style="width: 700px; max-width: 80vw;  ">
    <q-card-section class="row items-center">
      <div class="text-h6">Edit Speaker</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-separator />

  <q-card-section>
    <q-list>
        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >J</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Jane Robertson</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>
              120 sentences
              <q-btn size="sm" round color="gray" icon="mdi-account-remove" ></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >B</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Barry Tone</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>
              199 sentences
              <q-btn size="sm" round color="gray" icon="mdi-account-remove" ></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >T</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Thomas Salvador</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>0 sentence
              199 sentences
              <q-btn size="sm" round color="gray" icon="mdi-account-remove" ></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar top class="item-right" style="min-width:40px">
            <q-btn size="sm" outline round color="gray" >S</q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sam Paige</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>50 sentences
              <q-btn size="sm" round color="gray" icon="mdi-account-remove" ></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
    </q-card-section>

  <q-card-actions class="row text-center q-mb-md">
      <div class="col-md-12">
        <q-btn
          label="Close"
          no-caps
          size="md"
          v-close-popup
          >
        </q-btn>
      </div>
    </q-card-actions>

  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditSpeaker',
  components:{
  },
  setup() {


    return {

    }
  },
})
</script>

