<script>

export default{
  name:'Navbar',
  data() {
    return {
      navLinks: [
        { to: '/home', text: 'Home' },
        { to: '/search', text: 'Search' },
        { to: '/friends', text: 'Friends' },
        { to: '/trips', text: 'Trips' },
        { to: '/user', text: 'User' }
        // Add more links as needed
      ]
    };
  },
  methods: {
    handleRouterLinkClick(to) {
      // 处理导航链接的点击事件，可以添加额外的逻辑
      console.log('Navigating to:', to);
    }
  }
}

</script>

<template>
  <div class="mainbody">
    <div class="icon">
      <font-awesome-icon :icon="['fas','bars']" style="font-size:1.5em;color:white;transform:translateY(2px);margin-right:430px;"/>
    </div>
    <div class="nav-links">
      <router-link v-for="link in navLinks" :to="link.to" :key="link.to" class="nav-link" @click="handleRouterLinkClick(link.to)">
        {{ link.text }}
      </router-link>
    </div>
  </div>


</template>

<style scoped>
/* Your scoped styles here */

.nav-link {
  position: relative;
  padding-top:0px;
  font: 500 20px '优设标题黑';
  text-decoration:none;
  border: none;
  outline: none;
  color: #DBE3E3;
  display: flex;
  flex-direction:row;
  height: 30px;
  width:100px;
  margin-top:5px;
  margin-left:20px;
  margin-right:10px;
  text-align:center;
  align-items:center;
  justify-content:center;
}
.nav-link:active{
  color:#2E3059;
  border-radius:10px;
}
.nav-link:hover{
  background-color:#7E84F7;
  color:#2E3059;
  border-radius:10px;
  font-weight:600;
}
.icon{
  margin-top:10px;
  margin-left:10px;
}
.mainbody{
  display:flex;
  flex-direction:row;
}
.nav-links{
  display:flex;
  flex-direction:row;
  margin-top:5px;
}
</style>
