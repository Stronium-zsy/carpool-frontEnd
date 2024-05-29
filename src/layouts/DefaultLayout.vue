<script >
import Header from '@/components/Header.vue'
export default{
  name:'DefaultLayout',
  components: {Header},
}

</script>


<template>
  <div>
    <Header/>
    <router-view></router-view>
  </div>


</template>

<style scoped>
div{
  margin:0;
  padding:0;
  height:3000px;
  width:100%;
  background-color:#242424;
}
</style>