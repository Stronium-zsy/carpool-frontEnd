<script>
import {defineComponent} from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
export default defineComponent({
  name: "App",
  components: {
    DefaultLayout,
  },

})


</script>

<template>
  <div id="app">
    <DefaultLayout/>
  </div>
</template>

<style scoped>

</style>
