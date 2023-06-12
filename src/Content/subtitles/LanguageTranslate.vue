<template>
  <q-card style="width: 700px; max-width: 80vw; min-height:50vh">
    <q-card-section>
        <div class="text-h6 text-center">Add Translation</div>
    </q-card-section>
    <q-card-section class="q-mt-sm">
      <div class="text-subtitle2 text-center">Add a new Translation</div>
    </q-card-section>
    <q-card-section class="row">
      <label class="col-md-1 vertical-middle">From</label>
      <div class="col-md-5">
        <!-- <q-select dense color="grey-13" outlined emit-value map-options label="Video Language" :options="inputLanguages"></q-select> -->
        <q-btn-dropdown
          split
          :label="`${defaultLanguage?.name}`"
          style="width:100%"
          outline
          flate
        >
          <q-list>
            <q-item v-for="tl in activeArtifact.output_language" :key="`default-${tl.language_code}`" clickable v-close-popup @click="from(tl)">
              <q-item-section>
                <q-item-label>{{ tl.name }}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </div>
      <label class="col-md-1 text-center vertical-middle">To</label>
      <div class="col-md-5">
        <div class="q-mb-sm" v-if="selectedLangs.length > 0">
          <q-chip v-for="trans in selectedLangs" removable outline @remove="removeTranslateLanguage(trans)" :key="`chip-${trans.language_code}`" >
            {{ trans.name }}
          </q-chip>
        </div>
        <!-- <q-select dense color="grey-13" outlined emit-value map-options label="Translate languages" :options="inputLanguages"></q-select> -->
         <q-btn-dropdown
            split
            label="Select Translate Language"
            style="width:100%"
            outline
            flate
          >
            <q-list v-for="lang in languageList" :key="lang.value.language_code">
              <q-item clickable v-close-popup @click="selectLang(lang.value)">
                <q-item-section>
                  <q-item-label>{{ lang.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
      </div>
    </q-card-section>
    <q-card-section class="text-center align-center q-mt-md">
      <q-btn outline dense color="primary" label="Add Translation" icon="mdi-plus" @click="onSubmit" />
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { inputLanguages, outputLanguages } from 'src/Constants/Constant'
import { translateController } from 'src/services/translate/translateController'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { languageOptionInterface } from 'src/services/translate/translateTypes'
import { workspaceLanguageInterface, languageInterface } from 'src/services/generalTypes'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'TranslateBar',
 props:{
    slide: { type: Number,  required: true },
  },
  setup(props, {emit}) {

    const $q = useQuasar()

    const { activeArtifact, addTranslateLanguages } = artifactController()
    const { removeTranslateLanguage } = translateController()
    const selectedLangs = ref<workspaceLanguageInterface[]>([]);

    const defaultLanguage = ref<languageInterface | null>()

    const languageList = ref<languageOptionInterface[]>([]);

    onMounted(() => {
      defaultLanguage.value = props.slide == 1 ? activeArtifact.value.output_language[0] : (props.slide == 2 && activeArtifact.value.output_language.length > 1 ? activeArtifact.value.output_language[1] : null)

      outputLanguages.forEach(l => {
        if(!isTranslate(l.value.language_code)){
            languageList.value.push({'label': l.label, 'value': l.value})
        }
      })
    })

    const selectLang = (lang: workspaceLanguageInterface) => {
      const isAdded = selectedLangs.value.find(l => l.language_code == lang.language_code)
      if(!isAdded){
        selectedLangs.value.push(lang)
      }
    }


    const isTranslate = (label: string) => {
      const checkExist = activeArtifact.value.output_language.findIndex(language => language.language_code === label)
      if(checkExist >= 0){
        return true
      }
      return false
    };


     const onSubmit = async () => {
      if(!defaultLanguage.value){
          $q.notify({
            type: 'negative',
            message: 'Please select from language',
          });
          return false
        }
        await addTranslateLanguages(defaultLanguage.value, selectedLangs.value).then((res) => {
          console.log(res);
            $q.notify({
              type: 'positive',
              message: 'Languages has successfully saved',
            });
            emit('closePopup', false)
        });
    };

    const from = (lang: languageInterface) => {
      defaultLanguage.value = lang
    }

    return {
      artifact: computed(() => activeArtifact.value),
      isTranslate,
      inputLanguages,
      outputLanguages,
      defaultLanguage,
      activeArtifact,
      addTranslateLanguages,
      removeTranslateLanguage,
      selectedLangs,
      languageList,
      selectLang,
      onSubmit,
      from
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
