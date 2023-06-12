<template>
  <div>
     <div class="row justify-start ">
      <div class="col q-pa-md">
        <logo-mode style="width:250px" class="n-header-logo q-pt-xl" />
      </div>
      <div class="col" style="text-align:right">
        <q-icon
          size="xl"
          name="close"
          class="text-rabbit-purple-6 q-my-none q-mr-md q-pt-md"
          @click="emit('closeDrawer')"
        />
      </div>
    </div>

    <q-list class="text-rabbit-purple q-pt-xl">
      <q-item
        clickable
        v-ripple
        @click="emit('navigateTo','Features')"
        active-class="n-active-item"
      >
        <q-item-section avatar>
          <q-icon name="sort"></q-icon>
        </q-item-section>

        <q-item-section style="font-size:1rem" class="q-pa-md">Our Features</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="emit('navigateTo','Pricing')"
        active-class="n-active-item"
      >
        <q-item-section avatar>
          <q-icon name="category"></q-icon>
        </q-item-section>

        <q-item-section style="font-size:1rem" class="q-pa-md">Pricing</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="emit('navigateTo','Contact')"
        active-class="n-active-item"
      >
        <q-item-section avatar>
          <q-icon name="contact_support"></q-icon>
        </q-item-section>

        <q-item-section style="font-size:1rem" class="q-pa-md">Contact Us</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="directToLoginPage()"
        active-class="n-active-item"
      >
        <q-item-section avatar>
          <q-icon name="login"></q-icon>
        </q-item-section>

        <q-item-section style="font-size:1rem" class="q-pa-md">Log In / Sign Up</q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router'
import LogoMode from 'src/components/Content/global/LogoMode.vue'

export default defineComponent({
  props: {
    section: {
      type: String,
      default: 'Landing'
    }
  },
  components:{
    LogoMode
  },
  setup( _,{ emit }) {

    const router = useRouter()
    const directToLoginPage = () => {
      emit('navigateTo','Landing') // set section to default state
      void router.push('/register')
    }

    return {
      emit,
      directToLoginPage
    };
  },
});
</script>

<style scoped>
.n-header-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
