<script>
import MyTrip from '@/components/MyTrip.vue'
import {UserStore} from '@/store/index.js'
import UserTrips from "@/components/UserTrips.vue";
import test from "@/components/test.vue";
import EditUserInfo from '@/components/EditUserInfo.vue'
import UserMessages from "@/components/UserMessages.vue";
export default{
  name:'User',
  components: {UserMessages, UserTrips, MyTrip,test,EditUserInfo},
  data(){
    return{
      UserName:"",
      UserEmail:"",
      UserPassword:"",
      UserTrips:[],
      showUserTrips:false,
      showUserPhotos:false,
      showUserReviews:false,
      showUserMessages:false,
    }

  },
  created(){
    const Store=UserStore();
    this.UserName=Store.UserName;
    this.UserEmail=Store.Email;
    this.UserPassword=Store.Password;
  },
  methods:{
    ShowUserTrips(){
      this.showUserTrips=true;
      this.showUserPhotos=false;
      this.showUserReviews=false;
      this.showUserMessages=false;
    },
    ShowUserPhotos(){
      this.showUserTrips=false;
      this.showUserPhotos=true;
      this.showUserReviews=false;
      this.showUserMessages=false;
    },
    ShowUserReviews(){
      this.showUserTrips=false;
      this.showUserPhotos=false;
      this.showUserReviews=true;
      this.showUserMessages=false;
    },
    ShowUserMessages(){
      this.showUserTrips=false;
      this.showUserPhotos=false;
      this.showUserReviews=false;
      this.showUserMessages=true;
    },
    EditProfile(){
      this.$router.push('/edituser');
    }

  }


}
</script>


<template>
  <div class="container">

    <div class="head-image">

    </div>
    <div class="user">
      <div class="username">
      {{UserName}}
        </div>
      <div class="email">
      {{UserEmail}}
      </div>
      <div class="user-trips">
        <button class="trips" @click="ShowUserTrips">
          Trips
        </button>
        <button class="photos" @click="ShowUserPhotos">
          Photos

        </button>
        <button class="reviews" @click="ShowUserReviews">
          Reviews

        </button>
        <button class="messages" @click="ShowUserMessages">
          Messages
        </button>


      </div>



    </div>

    <button class="profile" @click="EditProfile">
      Edit profile

    </button>
  </div>
  <div class="bottomComponents">
    <div id="bottomleft">
    <div class="tripsdeco">

      <h2 style="font-size:20px;transform:translateX(20px);">
        Photos&Reviews
      </h2>
      <button class="sharePhotos">
        <font-awesome-icon :icon="['fas', 'image']" style="font-size:30px; transform:translate(15px,10px);color:black"/>
        <div class="photostext">
        <h3>Upload Photos</h3>
        <p>
          Share your  photos
        </p>
        </div>
      </button>
      <button class="shareReviews">
        <font-awesome-icon :icon="['fas', 'book']" style="font-size:30px; transform:translate(15px,10px);color:black"/>
        <div class="reviewstext">
        <h3>Write Reviews</h3>
        <p>
          Share your  experiences
        </p>
        </div>

      </button>
      </div>
      <div id="left">
        <p style="margin-left:30px;color:black;font-weight:600;font-size:20px;width:300px;">
          Refine your message
        </p>
        <h3 style="margin-top:60px;">
          Phone Number
        </h3>
        <input/>
        <h3>
          Address
        </h3>
        <input/>
        <h3>
          Student Number
        </h3>
        <input/>
        <h3>
          Major
        </h3>
        <input/>
        <h3>
          Age
        </h3>
        <input/>
        <h3>
          Birthday
        </h3>
        <input/>
        <button style="margin-left:170px;margin-top:50px;width:80px;height:40px;">
          Submit
        </button>


      </div>



    </div>
    <UserTrips v-if="showUserTrips"/>
    <UserMessages v-if="showUserMessages"/>
    <div class="default" v-if="!showUserTrips&&!showUserPhotos&&!showUserReviews&&!showUserMessages">


    </div>
  </div>




</template>

<style scoped>
.container{
  height:250px;
  width:1150px;
  margin-left:10%;
  background-color:white;
  border-radius:5px;
  display:flex;
  flex-direction:row;
  font-family: 'Arial',sans-serif;
  margin-top:20px;
}
.default{
  width:800px;
  height:1000px;
  background-color:white;
  margin-top:40px;
  margin-left:10px;
  border-radius:10px;
}
.user-trips{
  display:flex;
  flex-direction:row;
  transform:translateY(10px);
}
.username{
  font-size:30px;
  font-weight:600;
  margin-left:40px;
  height:30px;
  transform:translateY(10px);
}
.user{
  display: flex;
  flex-direction:column;
  margin-left:20px;
  padding-top:25px;
  height:200px;
  width:750px;
}
#bottomleft{
  max-height:2000px;
}
#left{
  width:290px;
  height:660px;
  background-color:white;
  margin-left:150px;
  margin-top:30px;
  border-radius:5px;
  padding-top:30px;
  margin-bottom:200px;
}
.profile{
  color:black;
  font-size:15px;
  font-weight:400;
  border:1px solid #DBDBDB;
  margin-right:10px;
  margin-top:20px;
  padding-left:5px;
  text-align:left;
  border-radius:3px;
  margin-left:60px;
}
.profile:hover{
  border:2px solid #DBDBDB;
}
.email{
  font-size:15px;
  font-weight:400;
  color:gray;
  height:150px;
  margin-left:40px;
  padding-top:10px;
  transform:translateY(10px);
}
.head-image{
  background-image:url("/cover.png");
  width:150px;
  height:150px;
  background-size:cover;
  border-radius:75px;
  margin-top:50px;
  margin-left:25px;
}
button{
  width:120px;
  height:30px;
  background-color:transparent;
  border:none;
  font-size:15px;
  font-weight:600;
  color:gray;
}

.bottomComponents{
  display: flex;
  flex-direction:row;
}
button:hover{
  border-bottom:2px solid #424242;

}

button:active{
  color:black;
}
.bottomComponents {
  display: flex;
  flex-direction:row;
  align-items: flex-start;

}

.tripsdeco {
  width: 250px;
  /* 添加垂直滚动条 */
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  margin-top:40px;
  margin-right:50px;
  margin-left:150px;
  height:220px;
  padding: 30px 20px;


}

.sharePhotos,.shareReviews{
  padding:0;
  margin:0;
  width:250px;
  height:60px;
  background-color:transparent;
  border:2px solid #BABABA;
  border-radius:3px;
  font-size:20px;
  text-align:right;
  display:flex;
  flex-direction:row;


}
.photostext,.reviewstext{
  display:flex;
  flex-direction:column;
  transform:translateX(90px);
}
.shareReviews h3,.sharePhotos h3{
  font-size:17px;
  background-color:transparent;
  transform:translate(-20px,-10px);
  color:black;
}
.sharePhotos{
  margin-top:20px;
}
.shareReviews{
  margin-top:30px;
}
.shareReviews p,.sharePhotos p{
  font-size:14px;
  background-color:transparent;
  transform:translate(-15px,-35px);
}
.shareReviews h3{
  transform:translate(-55px,-10px);
}
.shareReviews p{
  transform:translate(-40px,-35px);
}
.shareReviews:hover,.sharePhotos:hover{
  background-color:#EDEDED;
  border:2px solid black;
}
p:last-child {
  margin-bottom: 0;
}
#left h3{
  font-size:17px;
  font-weight:400;
  margin-left:30px;
  margin-top:20px;
  margin-bottom:0;
  color:#A8A8A8;
}
#left input{
  width:220px;
  margin-left:30px;
  border:none;
  border-bottom:1px solid black;
  height:30px;
}
#left input:focus{
  outline:none;
}


</style>