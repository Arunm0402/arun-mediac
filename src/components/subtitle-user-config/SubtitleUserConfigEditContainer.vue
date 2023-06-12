<template>
  <!-- 
    Read this before use this component

		Container component helps the subtitle configuration layout in the popup window.
		This component works together with SubtitleUserConfig.vue component only.

    It may be handy to used in some other places, but please DON'T, only let this component
    work together with SubtitleUserConfig component.

		slot: fields - the input fields, overflow will be scrollable
		slot: buttons - save or cancel button, will fixed position at the bottom

    What you need to do is important the component, create 2 template tabs
    one for fields slot - <template #fields>, all input fields should go inside this
    slot, and there will be auto scroll bar is the input fields is longer thant the
    provided area

    Second tab is for buttons slot - <template #buttons>. This is a fixed height container
    for buttons. All buttons required have to layout in single row. The margin will be
    defined by this container, so don't need to change any padding or margin.

    Finally, this container will be used by a few components in future, any changes on this
    component must make sure you know exactly what you are doing and what will be affected.
	 -->

  <div class="column no-wrap justify-between fit">
    <div class="local_fields q-pa-lg">
      <slot name="fields"></slot>
    </div>
    <div style="height: 52px" class="q-pt-md column no-wrap justify-center">
      <div>
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.local_fields {
  height: clamp(calc(300px - 152px), calc(90vh - 152px), calc(800px - 152px));
  overflow: auto;
  background-color: $grey-2;
}
</style>
