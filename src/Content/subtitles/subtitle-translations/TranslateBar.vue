<template>
<q-separator/>
  <q-card flat class="my-card q-mt-sm bg-grey-2">
    <q-card-section class="row justify-between">
      <div class="col-6">
        <TranslateBox :slide="1" />
      </div>
        <div class="col-5" v-if="!isSlideToggle">
          <TranslateBox :slide="2" />
        </div>
        <div class='col-1 text-right' v-if="artifact.output_language && artifact.output_language.length > 1">
          <q-icon :name="isSlideToggle ? 'mdi-table-plus' : 'mdi-table-minus'" size="lg" outlined
          @click="slideToggle(vid)"
            >
            <q-tooltip
              transition-show="scale"
              transition-hide="scale"
            >
              Open Side by Side Translation Panel
            </q-tooltip>
          </q-icon>
        </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import {  defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { inputLanguages, outputLanguages } from 'src/Constants/Constant'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { translationScroll } from 'src/services/translate/translationScroll'
import TranslateBox from 'src/components/Content/subtitles/subtitle-translations/TranslateBox.vue'
export default defineComponent({
  name: 'TranslateBar',
  props:{
  },
  components:{
    TranslateBox
  },
  setup() {
    const route = useRoute()
    const { activeArtifact, getArtifact } = artifactController()

    const { slideToggle, isSlideToggle } = translationScroll()

    const vid = <string>route.params.vid

    onMounted(async ()=>{
      await slideToggle(vid, true)
      await getArtifact(vid)
    })

    return {
      artifact: computed(() => activeArtifact.value),
      vid,
      inputLanguages,
      outputLanguages,
      slideToggle,
      isSlideToggle,
    }
  }
})
</script>
<style lang=""></style>
<style scoped>
.q-card {
  border-radius: 0px;
}
.text-vertical-middle{
  line-height: 39px;
}
</style>
