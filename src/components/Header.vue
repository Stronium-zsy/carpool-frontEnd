<script>
import Navbar from "@/components/Navbar.vue";
export default{
  name:'Header',
  components: {Navbar},
}

</script>

<template>
  <section>
  <div class="Logo">
    LOWGO
  </div>
  <div class="Navbar">
    <Navbar/>
  </div>

    <div class="User">
      <router-link to="/signinsignup" class="SignInSignUp">
        SignIn|SignUp
      </router-link>

    </div>
  </section>


</template>

<style scoped>
.Logo{
  height:20px;
  font-size:20px;
  margin: 12px 0 5px 10%;
  color:white;
}
.User{
  margin-top:13px;
  margin-left:50px;
  background-color:transparent;
}
.Navbar{
  margin-left:0;
  margin-bottom:0;
  margin-top:0;
}
.Searchbar{
  flex-grow:2;
  height:50px;
}
hr{
  margin:0;
}
.SignInSignUp{
  background-color:white;
  border:none;
  color: #121212;
  font: 500 15px '优设标题黑';
  border-radius:5px;
  text-align:center;
  height:25px;
  font-weight:600;
  text-decoration:none;
  transform:translateY(5px);
  padding: 5px 0 5px 3px;


}
section{
  display:flex;
  flex-direction:row;
  width:100%;
  height:50px;
  background-color:transparent;

}
</style>