<script>
import {UserStore} from "@/store/index.js";
import axios from "axios";
export default {
  name: "EditUserInfo",
  data(){
    return{
      UserName:"",
      UserEmail:"",
      UserPassword:"",
      UserCity:"",
      UserAboutMe:"",
      PreviousName:"",
    }
  },
  components:{

  },
  methods:{
    async SaveEdit() {
      try {
        const Store = UserStore();

        // 从你的表单中获取用户信息，例如：
        const userData = {
          name: this.UserName,
          password: this.UserPassword,
          email:this.UserEmail,
          userid:Store.UserId,
          // 其他用户信息...
        };
        console.log(userData);

        // 使用 Axios 发送 POST 请求到后端接口
        const response = await axios.post('http://localhost:8080/updateprofile', userData,{
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(
            response=>{
              Store.UpdateUser(
                  response.data.name,
                  response.data.email,
                  response.data.password,
                  response.data.userid,
              );
            }
        ).then(
            this.$router.push({
              path:'/home'
            })

        )


        // 处理后端响应，根据实际情况处理成功或失败的情况
      } catch (error) {
        console.error('登录失败:', error);
        // 处理错误情况...
      }
    },

  },
  created(){
    const Store=UserStore();
    this.PreviousName=Store.UserName;
  }
}
</script>

<template>
  <div class="container">
    <div class="EditUser">
      <div class="left">
      <div class="hello">
        <div class="headimage"></div>
        <div class="previous">{{PreviousName}}</div>
      </div>
        </div>
      <div class="right">
      <div class="username">


        <div class="title">
        UserName:
          </div>
        <input v-model="UserName">
      </div>
      <div class="email">
        <div class="title">Email:</div>

        <input v-model="UserEmail">
      </div>
      <div class="password">
        <div class="title">
          Password
        </div>
        <input v-model="UserPassword">
      </div>
        <div class="city">
          <div class="title">
            City
          </div>
          <input v-model="UserCity">
        </div>

        <div class="buttons">
          <p>
            Press Save to UpDate Your Profile
          </p>
          <button class="cancel">
            Cancel
          </button>
          <button class="save" @click="SaveEdit">
            Save
          </button>
        </div>
        </div>



    </div>


  </div>

</template>

<style scoped>
.container{
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  font-family: 'Arial', sans-serif;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  color:white;
  background-size:cover;
  background:linear-gradient(to right top,#732BF5,#3282F6,#61FDF9);
}
.EditUser{
  border-radius:5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width:750px;
  height:500px;
  display:flex;
  flex-direction:row;
  background-color:#2E2E2E;
}
.username,.email,.password,.city{
  margin-left:200px;
  margin-top:30px;
  width:100%;
  font-size:15px;
  font-weight:600;
  display:flex;
  flex-direction:column;
}
.left{
  display:flex;
  flex-direction:column;
  transform:translateY(-30px);
}
.right{
  display:flex;
  flex-direction:column;
  transform:translateX(-160px);
  margin-top:50px;
}
input{
  height:30px;
  width:500px;
  border-radius:2px;
  border:none;
  border-bottom:1px solid white;
  background-color:transparent;
}
input:focus{
  outline:none;
}
.previous{
  font-size:30px;
}
.headimage{
  background-image:url("/cover.png");
  width:100px;
  height:100px;
  border-radius:50%;
  background-size:cover;
}
.hello{
  font-size:50px;
  margin-left:20px;
  margin-top:100px;
  margin-bottom:200px;
}
.buttons{
  margin-left:200px;
  margin-top:30px;
}
.title{
  width:150px;
}
.buttons{
  display:flex;
  flex-direction:row;
}
.cancel{
  width:80px;
  height:40px;
  background-color:transparent;
  border:2px solid #CCCCCC;
  border-radius:5px;
  color:white;
  font-size:20px;
  font-weight:500;
  margin-left:110px;
}
.cancel:hover{
  border:2px solid black;
}
.save{
  width:60px;
  height:40px;
  background-color:black;
  border:2px solid #CCCCCC;
  color:white;
  border-radius:5px;
  font-size:20px;
  font-weight:500;
  margin-left:10px;
}



</style>