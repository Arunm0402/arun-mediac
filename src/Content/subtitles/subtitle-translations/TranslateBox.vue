<template>
  <div class="row">
    <div class="col-md-7">
      <!-- <q-select dense color="grey-13" outlined v-model="searchData.translate" emit-value map-options label-color="grey-13" :options="inputLanguages"></q-select> -->
      <q-btn-dropdown
        split
        :label="activeOutputLanguage?.name"
        style="width: 100%"
        outline
        no-caps
      >
        <q-list>
          <div
            v-for="tl in outputLanguages"
            :key="`default-${tl.language_code}`"
          >
            <q-item
              clickable
              v-close-popup
              @click="getSubtitles(tl)"
              v-if="isTranslateLanguageVisible(tl)"
              :disable="!isTranslateLanguageSelectable(tl)"
            >
              <q-item-section>
                <TranslateBoxLabel :label="tl.name" :status="tl.status" />
              </q-item-section>
            </q-item>
          </div>

          <q-item v-if="allowAddLanguage || allowAddLanguage == undefined">
            <q-item-section>
              <q-btn
                outline
                rounded
                color="primary"
                no-caps
                label="Add Translation"
                icon="mdi-plus"
                v-close-popup
                @click="translatePopup"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="col-md-4 q-ml-md">
      <!-- <q-select dense outlined v-model="defaultLanguage" emit-value map-options label-color="grey-13" :options="outputLanguages"></q-select> -->
      <!-- <q-btn-dropdown
      split
      label="Translate To"
      style="width:100%"
      outline
      no-caps
    >
      <q-list>
        <q-item v-for="tl in activeArtifact.output_language" :key="`default-${tl.language_code}`" clickable v-close-popup>
          <q-item-section>
            <q-item-label>{{ tl.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown> -->
    </div>
  </div>
  <q-dialog
    v-model="showTranslatePopup"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <language-translate :slide="slide" @closePopup="closePopup" />
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, watch, computed } from 'vue'
import { inputLanguages } from 'src/Constants/Constant'
import LanguageTranslate from 'src/components/Content/subtitles/LanguageTranslate.vue'
import { subtitleController } from 'src/services/subtitles/subtitleController'
import { artifactController } from 'src/services/artifacts/artifactsController'
import { languageInterface } from 'src/services/generalTypes'
import { translationScroll } from 'src/services/translate/translationScroll'
import { useRoute } from 'vue-router'
import TranslateBoxLabel from 'src/components/Content/subtitles/subtitle-translations/TranslateBoxLabel.vue'
import permissionController from 'src/services/workspace/workspacePermissionController'
import subtitleTranslationController from 'src/services/subtitles/subtitle-translations/subtitleTranslationController'

export default defineComponent({
  name: 'TranslateBox',
  props: {
    slide: { type: Number, required: true },
    allowAddLanguage: { type: Boolean, default: undefined }
  },
  components: {
    LanguageTranslate,
    TranslateBoxLabel
  },
  setup(props) {
    const route = useRoute()

    const { activeArtifact, getArtifact } = artifactController()
    const { isSlideToggle } = translationScroll()

    const { getTranslatedSubtitles, selected_lang, slide_selected_lang } =
      subtitleController()

    const { permissions, userPermissions } = permissionController()

    const showTranslatePopup = ref(false)

    const vid = <string>route.params.vid

    const defaultLanguage = ref<languageInterface | null>()

    const { outputLanguages, activeOutputLanguages } =
      subtitleTranslationController()

    /**
     * Get the active output language for the current side
     * activeOutputLanguages array is 0 index bases. Panel
     * slide number is 1 index bases, so need -1 here.
     */
    const activeOutputLanguage = computed(() => {
      return activeOutputLanguages.value[props.slide - 1]
    })

    /**
     * For editor case, only complete processed language can select
     * As long as language status failed inside completedCases, it should be
     */
    const isTranslateLanguageSelectable = (lang: languageInterface) => {
      const completedCases = ['completed', 'published']
      if (completedCases.includes(lang.status.toLowerCase())) return true
      return false
      // // For left side case, if the language is already selected, don't select
      // if (props.slide == 1 && !isSlideToggle) {
      //   if (slide_selected_lang.value?.lid == lang.lid) return false
      // }
      // if (props.slide == 2 && !isSlideToggle) {
      //   if (slide_selected_lang.value?.lid == lang.lid) return false
      // }
    }

    // For viewer case, only published content is visible
    const isTranslateLanguageVisible = (lang: languageInterface) => {
      // If user has view unfinished content right, they can always see anything
      console.log(userPermissions.value)
      if (userPermissions.value.includes(permissions.VIEW_UNFINISHED_CONTENT)) {
        return true
      }

      // If content is publishend ,it will be visible
      if (lang.status.toLowerCase() == 'published') {
        return true
      }

      return false
    }

    onMounted(async () => {
      await getArtifact(vid)
      const { setDefActiveOutputLangs } = subtitleTranslationController()
      setDefActiveOutputLangs()

      await getSubtitles(activeOutputLanguage.value)

      // Left panel default language should always be input language
      // Right panel should be one of the nearest editable language
      // defaultLanguage.value =
      //   props.slide == 1
      //     ? output_languages.value[0]
      //     : props.slide == 2 && output_languages.value.length > 1
      //     ? output_languages.value[1]
      //     : null

      // if (props.slide == 1) {
      //   defaultLanguage.value = output_languages.value[0]
      // } else {
      //   for (const slideLang of output_languages.value) {
      //     if (slideLang.lid != selected_lang.value?.lid) {
      //       defaultLanguage.value = slideLang
      //       break
      //     }
      //   }
      // }
    })
    watch(
      () => selected_lang.value,
      (lang) => {
        if (props.slide == 1 && lang) {
          defaultLanguage.value = lang
        }
      }
    )

    watch(
      () => slide_selected_lang.value,
      (lang) => {
        if (props.slide == 2 && lang) {
          defaultLanguage.value = lang
        }
      }
    )

    const translatePopup = () => {
      showTranslatePopup.value = true
    }

    const closePopup = () => {
      showTranslatePopup.value = false
    }

    const getSubtitles = async (output_language: languageInterface) => {
      console.log('Getting subtitles', output_language)
      const { setActiveOutputLanguage } = subtitleTranslationController()
      await getTranslatedSubtitles(vid, output_language, props.slide)
      // defaultLanguage.value = output_language
      setActiveOutputLanguage(props.slide - 1, output_language)
    }

    return {
      defaultLanguage,
      inputLanguages,
      outputLanguages,
      showTranslatePopup,
      translatePopup,
      closePopup,
      getSubtitles,
      activeArtifact,
      selected_lang,
      slide_selected_lang,
      isSlideToggle,
      isTranslateLanguageSelectable,
      isTranslateLanguageVisible,
      activeOutputLanguage
    }
  }
})
</script>
<style lang=""></style>
<style scoped>
.q-card {
  border-radius: 0px;
}
.text-vertical-middle {
  line-height: 39px;
}
</style>
