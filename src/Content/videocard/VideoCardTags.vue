/* eslint-disable @typescript-eslint/no-unsafe-call */
<template>
    <!-- live video tags -->
    <!-- <q-chip size="sm" unelevated rounded class="text-rabbit-amber" v-if="((unsavedTags && unsavedTags.length == 0) || !unsavedTags) && !videoLiveTags">
      <slot></slot>
    </q-chip> -->
    <!-- unsavedTags shown if in editing mode -->
    <template v-if="unsavedTags">
      <q-chip
        :removable="removable"
        size="sm"
        unelevated
        rounded
        class="text-rabbit-amber"
        v-for="tag in unsavedTags"
        :key="tag"
        @remove="emitRemoveTag(tag)"
      >
        <slot :item="tag" :index="tag"></slot>
        <slot name="crossButton" :item="tag"></slot>
      </q-chip>
    </template>
    <!-- Live Tags if not in editing mode -->
    <template v-else>
      <q-chip
        :removable="removable"
        unelevated
        rounded
        size="sm"
        class="text-rabbit-amber"
        v-for="tag in videoLiveTags"
        :key="tag"
      >
        <slot :item="tag" :index="tag"></slot>
        <slot name="crossButton" :item="tag" ></slot>
      </q-chip>
    </template>
    <!-- slots for adding new tag -->
    <slot name="addTag"></slot>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { artifact } from 'src/services/artifacts/artifactTypes'
import {workspace} from 'src/services/workspace/workspaceTypes'
export default defineComponent({
  props: {
    vid: {
      type: Object as PropType<artifact>,
      required: false
      //takes in vid only for showing liveTags
    },
    wid: {
      type: Object as PropType<workspace>,
      required: false
      //takes in vid only for showing liveTags
    },
    unsavedTags:{
      type: Array,
      required: false
      //only show unsavedTags when editing (editprojectdetail or workplacedetail)
    },
    removable:{
      type: Boolean,
      required: false,
     default: false
    },
  },
  emits: {

  },
  setup(props, context) {

    const videoLiveTags = computed(function(){
      if(props.vid){
        return props.vid.tags
      }
      // else if(props.wid){
      //   return props.wid.tag //to be implemented
      // }
      return null
    })

    const emitRemoveTag = (tag: string) => {
      context.emit('emitRemoveTag', tag)
    }

    return {
      videoLiveTags,
      emitRemoveTag
    }
  }
})
</script>

<style lang="scss" scoped></style>
