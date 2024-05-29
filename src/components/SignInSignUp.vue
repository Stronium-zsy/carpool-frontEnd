<script>
import axios from 'axios';
import {UserStore} from "@/store/index.js";
import {ref} from "vue";

export default{
  name:'SignInSignUp',
  data(){
   return{
     SignInEmail:ref(""),
     SignInPassword:ref(""),
     SignUpName:ref(""),
     SignUpEmail:ref(""),
     SignUpPassword:ref(""),
     userDTO:null,
   } ;
  },
  mounted() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    }
  },
  methods:{
    async SignInUser() {
      try {
        const Store = UserStore();

        // 从你的表单中获取用户信息，例如：
        const userData = {
          email: this.SignInEmail,
          password: this.SignInPassword,
          // 其他用户信息...
        };
        console.log(userData);
        const params=new URLSearchParams();
        for(let key in userData){
          params.append(key,userData[key]);
        }


        // 使用 Axios 发送 POST 请求到后端接口
        const response = await axios.post('http://localhost:8080/user/login', params).then(
          response=>{
            console.log(response.data.data);

            //Store.setToken(response.data.data.token);
            //console.log(Store.getToken());
            Store.loggedIn=true;
            Store.setUsername(response.data.data.username);
            Store.setEmail(this.SignInEmail);
            Store.setUserId(response.data.data.id);
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
    async SignUpUser() {

      try {
        const Store=UserStore();
        // 从你的表单中获取用户信息，例如：
        const userData = {
          email:this.SignUpEmail,
          password:this.SignUpPassword,
          // 其他用户信息...
        };
        const params=new URLSearchParams();
        for(let key in userData){
          params.append(key,userData[key]);
        }

        // 使用 Axios 发送 POST 请求到后端接口
        const response = await axios.post('http://localhost:8080/user/register',params,{

        }).then(
            response=>{
              if(response.data.code===0){
                alert(response.data.message===""?"操作成功":response.data.message);
              }
              else{
                alert("注册失败");
              }
            }
        ).then(
          this.$router.push({
            path:'/home'
          })
        )
        console.log(response);

        // 处理后端响应，根据实际情况处理成功或失败的情况

      } catch (error) {
        console.error('注册失败:', error);
        // 处理错误情况...
      }
    }
  }
}

</script>

<template>
  <div class="mainbody">
    <div class="container" id="container">
      <div class="form-container sign-up">
        <div class="signupform">
          <h1>
            Create Account
          </h1>

          <input type="text" v-model="SignUpName"
                 placeholder="Name">
          <input type="email" v-model="SignUpEmail"
                 placeholder="Email">
          <input type="password" v-model="SignUpPassword"
                 placeholder="Password">
          <button @click="SignUpUser">
            Sign up
          </button>
          </div>


      </div>
      <div class="form-container sign-in">
        <div class="signinform">
          <h1 >
            Sign In
          </h1>


          <input type="email" v-model="SignInEmail"
                 placeholder="Email">

          <input type="password" v-model="SignInPassword"
                 placeholder="Password">
          <button @click="SignInUser" >
            Sign In
          </button>
        </div>


      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>
              Welcome Back!
            </h1>
            <p>
              Enter your personal details to use all of site features
            </p>
            <button class="hidden" id="login">
              Sign In
            </button>
          </div>
          <div class="toggle-panel toggle-right">

            <h1>
              Hello Children!
            </h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button class="hidden" id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Montserrat',sans-serif;
}
.mainbody{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  background:linear-gradient(to right bottom,#9B24A6,#3282F6);
  background-size:cover;
  padding-right:20px;
}
.container{
  background-color:#2E2E2E;
  border-radius:5px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
  position:relative;
  overflow:hidden;
  width:900px;
  max-width:100%;
  min-height:500px;
}
.container p{
  font-size:14px;
  line-height:20px;
  letter-spacing:0;
  margin:20px 0;
}
.container span{
  font-size:12px;
}
.container a{
  color:#333;
  font-size:13px;
  text-decoration:none;
  margin:15px 0 10px;
}
#font1{
  width:100px;
  height:100px;
  background-image:url("/font1.png");
  background-size:cover;
}
.container button{
  background-color: transparent;
  border:1px solid white;
  color:#fff;
  font-size:12px;
  padding:10px 45px;
  border-radius:8px;
  font-weight:600;
  letter-spacing:1px;
  text-transform:uppercase;
  margin-top:10px;
  cursor:pointer;
}
.container button.hidden{
  background-color:transparent;
  border-color:#fff;

}
.signinform,.signupform{
  background-color:#2E2E2E;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  padding:0 40px;
  height:100%;
}
.container input{
  background-color:#eee;
  border:none;
  margin:8px 0;
  padding:10px 15px;
  font-size:13px;
  border-radius:8px;
  width:100%;
  outline:none;
}
.form-container{
  position:absolute;
  top:0;
  height:100%;
  transition:all 0.6s ease-in-out;

}
.sign-in{
  left:0;
  width:50%;
  z-index:2;
  color:white;
  border-right:1px white dashed;
}
.container.active .sign-in{
  transform: translateX(100%);
}
.sign-up{
  left:0;
  width:50%;
  opacity:0;
  z-index:1;
  color:white;
  border-left:1px white dashed;
}
.container.active .sign-up{
  transform: translateX(100%);
  opacity:1;
  z-index:5;
  animation:move 0.6s;
}
@keyframes move{
  0%, 49.99%{
    opacity:0;
    z-index:1;
  }
  50%, 100%{
    opacity:1;
    z-index:5;
  }
}
.toggle-container{
  position:absolute;
  top:0;
  left:50%;
  width:50%;
  height:100%;
  overflow:hidden;
  transition: all 0.6s ease-in-out;
  z-index:1000;
}
.container.active .toggle-container{
  transform: translateX(-100%);

}
.toggle{
  height:100%;
  background-color:#2E2E2E;
  color:#fff;
  position:relative;
  left:-100%;
  width:200%;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}
.container.active .toggle{
  transform: translateX(50%);
}
.toggle-panel{
  position: absolute;
  width: 50%;
  height:100%;
  display:flex;
  justify-content:center;
  flex-direction:column;
  padding: 0 30px;
  text-align:center;
  top:0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;

}

.toggle-left{
  transform: translateX(-200%);
}
.container.active .toggle-left{
  transform: translateX(0);
}
.toggle-right{
  right:0;
  transform:translateX(0);
}
.container.active .toggle-right{
  transform: translateX(200%);
}



</style>