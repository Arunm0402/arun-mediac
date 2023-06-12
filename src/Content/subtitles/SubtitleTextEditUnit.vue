<template>
  <!--
    When user type in q-input, emit an "subtitleTextInput" event
    with the latest updated text string
    -->
  <div>
    <q-input
      type="textarea"
      class="s-subtitle-textarea"
      input-class="s-round-6 bg-white s-border-light subtitle-textarea-elm text-dark"
      placeholder="add new subtitle here"
      rounded
      v-model="subtitleTextRef"
      debounce="1000"
      @update:model-value="textChanged"
      @focus="focused"
      @click="handleCursorPointer"
    />
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { subtitleController } from 'src/services/subtitles/subtitleController'

export default defineComponent({
  props: {
    subtitleText: { type: String }
  },
  setup(props, { emit }) {
    const subtitleTextRef = ref(props.subtitleText)

    const {
      setCursorPosition,
    } = subtitleController()

    onMounted(() => {
      setCursorPosition(0)
   })

   const handleCursorPointer = () => {
     if(document.activeElement && document.activeElement.tagName.toLowerCase() === 'textarea' &&  document.activeElement.classList.contains('subtitle-textarea-elm')){
       const textareaElm = document.activeElement as HTMLTextAreaElement
       if('selectionStart' in textareaElm && textareaElm.selectionEnd){
        setCursorPosition(Number(textareaElm.selectionEnd))
       }
     }
   }


    const textChanged = (text: string) => {
      console.log(text, 'emit subtitleTextInput---------');
      emit('subtitleTextInput', text)
    }
    const focused = () =>{
      emit('focused')
    }

    watch(
      () => props.subtitleText as string,
      (text : string) => {
        subtitleTextRef.value = text
      }
    )

    return {
      subtitleTextRef,
      textChanged,
      emit,
      focused,
      handleCursorPointer
    }
  },
})
</script>

<style scoped></style>
