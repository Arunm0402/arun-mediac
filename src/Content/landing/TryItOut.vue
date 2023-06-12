<template>
  <div
    class="row bg-diagonal-split q-py-xl q-px-xl n-try-it-out"
  >
    <div
      class="col-12 col-md-4 col-sm-6 column justify-center text-start text-white q-pl-md"

    >
      <ul>
        <template v-for="(item,index) in items" :key="index">
           <li
            v-if="featureID == parseInt(index)"
            class="n-list n-list-square text-h5"
            @mouseover="featureID =parseInt(index)"
            @mouseleave="featureID =parseInt(index)"
           >
             {{ item.label }}
          </li>
          <li
            v-else
            class="n-list n-list-circle text-h5"
            @mouseover="featureID=parseInt(index)"
            @mouseleave="featureID=parseInt(index)"
           >
             {{ item.label }}
          </li>

        </template>
      </ul>
    </div>

    <!-- Hardcoded this block, so that the dom will change whenever the featureID changes -->
    <div
      v-if="featureID==0"
      class="col-12 col-md-4 col-sm-6 column justify-center text-start n-fade-in"
    >
      <h3 class="text-rabbit-orange text-bold q-py-none">{{ items[featureID].header }}</h3>
      <h5 class="text-white q-my-none q-mb-lg n-new-line">
        {{ items[featureID].content }}
      </h5>
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg gt-md"
        color="deep-orange-4"
      />
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg lt-md"
        color="grey-1"
      />
    </div>

    <div
      v-if="featureID==1"
      class="col-12 col-md-4 col-sm-6 column justify-center text-start n-fade-in"
    >
      <h3 class="text-rabbit-orange text-bold q-py-none">{{ items[featureID].header }}</h3>
      <h5 class="text-white q-my-none q-mb-lg n-new-line">
        {{ items[featureID].content }}
      </h5>
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg gt-md"
        color="deep-orange-4"
      />
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg lt-md"
        color="grey-1"
      />
    </div>

    <div
      v-if="featureID==2"
      class="col-12 col-md-4 col-sm-6 column justify-center text-start n-fade-in"
    >
      <h3 class="text-rabbit-orange text-bold q-py-none">{{ items[featureID].header }}</h3>
      <h5 class="text-white q-my-none q-mb-lg n-new-line">
        {{ items[featureID].content }}
      </h5>
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg gt-md"
        color="deep-orange-4"
      />
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg lt-md"
        color="grey-1"
      />
    </div>

    <div
      v-if="featureID==3"
      class="col-12 col-md-4 col-sm-6 column justify-center text-start n-fade-in"
    >
      <h3 class="text-rabbit-orange text-bold q-py-none">{{ items[featureID].header }}</h3>
      <h5 class="text-white q-my-none q-mb-lg n-new-line">
        {{ items[featureID].content }}
      </h5>
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg gt-md"
        color="deep-orange-4"
      />
      <q-btn
        label="Try It Out"
        rounded
        no-caps
        outline
        size="lg"
        class="self-end q-mt-xl q-mr-xl q-px-lg q-mb-lg lt-md"
        color="grey-1"
      />
    </div>

    <div
      class="col-12 col-sm-4 column justify-center text-white overflow-hidden gt-sm"
    >
    <div class="q-pa-xl items-end">
        <img
          src="~assets/ScribeRabbit-Head.svg"
          alt="scribe-rabbit-logo"
          style="
            height: 32rem;
            z-index: 1;
          "
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onMounted, onUnmounted} from 'vue'

export default defineComponent({
   props: {
    data: { type: Object, required: true },
  },
  name: 'TryItOut',
  setup(props) {

    const featureID = ref(0)
    const prevFeatureID = ref(-1)
    let rotateInterval:ReturnType<typeof setInterval>
    const rotateText= () => {
      if(prevFeatureID.value == -1){
        prevFeatureID.value = featureID.value
        prevFeatureID.value = 0
      }
      else if (featureID.value == props.data.length - 1){
        prevFeatureID.value = featureID.value
        featureID.value = 0
      } else {
        prevFeatureID.value = featureID.value
        featureID.value += 1
      }
    }
    //rotateText()
    onMounted(() => {
      rotateInterval = setInterval(rotateText,5000)
    })
    onUnmounted(() => {
      clearInterval(rotateInterval)
    }),

    watch(
      () => featureID.value,
      ( _, prevID ) => {
        prevFeatureID.value = prevID
      }
    )

    return {
      items: computed(() => props.data),
      featureID,
      prevFeatureID,
    }
  },
})
</script>

<style lang="scss" scoped>
ul, li {
  padding: 0;
  width: 100%;
}
.n-list{
  list-style-type: none;
  line-height: 2;
  margin-right:1.5rem;
  float:left;
}
.n-list:hover{
  font-size: 1.5rem;
  font-weight:800
}
.n-list-circle::before{
  background-color: hsl(10, 100%, 70%);
  border-radius: 50%;
  content: "";
  display: inline-block;
  margin-right: 1rem;
  height: 0.5rem;
  width: 0.5rem;
  margin-bottom: 0.1rem;
}
.n-list-square{
  font-size: 1.5rem;
  list-style-type: none;
  font-weight:800
}
.n-list-square::before{
  background-color: hsl(10, 100%, 70%);
  content: "";
  display: inline-block;
  margin-right: 1rem;
  height: 0.8rem;
  width: 0.8rem;
  margin-bottom: 0.1rem;
}
.n-new-line {
  white-space: pre-line;
}
.n-fade-in{
  animation: fadeIn linear 1s;
  -webkit-animation: fadeIn linear 1s;
  -moz-animation: fadeIn linear 1s;
  -o-animation: fadeIn linear 1s;
  -ms-animation: fadeIn linear 1s;
}
@keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@-moz-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@-webkit-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@-o-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}
@-ms-keyframes fadeIn {
  0% {opacity:0;}
  100% {opacity:1;}
}

</style>
