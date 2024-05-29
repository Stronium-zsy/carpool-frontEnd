<script>
import axios from 'axios';
export default{
  name:'Home',
  data(){
    return{
      searchholder:"Search for anything",
      searchInput:'',
      searchResults:[],
    };
  },
  methods:{
    hidePlaceholder(){
      this.searchholder='';
    },
    showPlaceholder(){
      this.searchholder="Search for anything";
    },
    handleInput(){
      if(this.searchInput.length>=1)
        this.searchCity();
    },
    async searchCity(){
      const apiKey='e4fce0dd56834d559d3b9e5f7fdedc68'
      const apiUrl=`https://api.opencagedata.com/geocode/v1/json?q=${this.searchInput}&key=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        this.searchResults = response.data.results;
      } catch (error) {
        console.error('Error searching city:', error);
      }
    },
    Input(value) {
      this.searchInput = value;
    },

  }
}
</script>

<template>
  <div class="mainbody">
    <div class="Title">
      <p style="margin-top:3%;margin-bottom:0;">With this website, </p>
      <p style="margin-top:1%;margin-bottom:0;">Find A Partner In One Minute</p>
      <p style="margin-top:1%;font-size:20px;color:#ccc;">Excellent tool to find a partner & make a trip plan</p>
    </div>
    <div class="bottomsearch">
      <font-awesome-icon :icon="['fas', 'house']" style="color:white;margin-left:10%;"/>
      <div class="searchall">
        <a href="#">
          SearchAll
        </a>
      </div>
      <font-awesome-icon :icon="['fas', 'hotel']" style="color:white;margin-right:5px;"/>
      <div class="Hotel">
        <a href="#">
          Hotel
        </a>
      </div>
      <font-awesome-icon :icon="['fas', 'utensils']" style="color:white;margin-right:5px;"/>
      <div class="Restaurant">
        <a href="#">
          Restaurant
        </a>
      </div>
    </div>

    <div id="deco">
    <div class="deco1">
      <p style="margin-left:5%" class="header">Professional & Personalized </p>
      <p style="margin-left:5%;margin-top:20px;" class="desc">Get a personalized itinerary just for you</p>
      <p style="margin-left:5%;" class="desc">, guided by traveler tips and reviews.</p>
    </div>
      <div id="rightdeco">
    <div class="rightdecoup">
      <p style="font-size:20px;color:white;font-weight:600;margin-left:50px;margin-bottom:0;">Easily Create A Trip Plan</p>
      <p style="font-size:15px;color:#ccc;font-weight:400;margin-left:50px;margin-top:0;">
        Press this button to create a trip
      </p>
      <button  class="createtrip">
        Create

      </button>

    </div>
    <div class="rightdecodown">
      <p style="font-size:20px;color:white;font-weight:600;margin-left:50px;margin-bottom:0;">Easily Follow A Trip Plan</p>
      <p style="font-size:15px;color:#ccc;font-weight:400;margin-left:50px;margin-top:0;">
        Press this button to follow a trip
      </p>
      <button  class="followtrip">
        Follow

      </button>
    </div>
      </div>
      </div>
    <div class="deco2">
      <div class="description">
        <p style="font-size:40px;font-weight:800">Introduction:</p>
        <p>In the post-pandemic era , a new trend has emerged among young students - a surge in travel enthusiasm.</p>
        <p>As the tourism industry experiences a revival , our team has developed a specialized platform</p>
        <p>to address the various challenges students may encounter during their vacations.</p>
        <p>Introducing TravelMate, a mini-program designed to assist students</p>
        <p>in finding travel companions, fostering friendships, and enhancing overall safety during their journeys.</p>
        </div>
    </div>
    <div class="deco3">
      <div id="header" style="color:white;font-size:40px;font-weight:800;margin-left:10%;margin-top:100px;">
        Benefits & Advantages
      </div>
      <div style="display:flex;flex-direction:row;">
      <div class="ph1">
        <div id="container">
          <a href="#">
            Exclusive Student Community:
          </a>
          <p style="color:#A1A1A1; margin-right:10px;">
            Exclusive Student Community is a vibrant online platform designed to foster collaboration, networking, and growth among students.
          </p>
          <a href="#" class="readmore" style="color:#121212;font-weight:400;font-size:15px;">
            Read More
          </a>
        </div>


      </div>

      <div class="ph2">

        <div id="container">
          <a href="#">
            Anonymous Profiles for Privacy:
          </a>
          <p style="color:#A1A1A1; margin-right:10px;">
            Anonymous Profiles for Privacy offers a discreet yet engaging online environment for users to connect and interact without compromising their privacy.
          </p>
          <a href="#" class="readmore" style="color:#121212;font-weight:400;font-size:15px;">
            Read More
          </a>
        </div>

      </div>
      <div class="ph4">
        <div id="container">
          <a href="#">
            Search and Connect:
          </a>
          <p style="color:#A1A1A1; margin-right:10px;">
            Search and Connect is a powerful tool that enables users to search for and connect with like-minded individuals who share similar interests and hobbies.
          </p>
          <a href="#" class="more" style="color:#121212;font-weight:400;font-size:15px;">
            Read More
          </a>
        </div>

      </div>
        </div>
    </div>
  </div>

</template>

<style scoped>
.searchresults{
  list-style: none;
  padding: 0;
  position: absolute;
  width: 632px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius:5px;
  background:#242424;
  color:white;
  font-size:17px;
  font-weight:600;
  margin: 2px 0 0 31%;
}
.searchresults>li{
  height:50px;
  border-top:1px black solid;
  transition:border-color 0.3s ease;
  padding-left:30px;
  border-radius:3px;
}
.searchresults>li:hover{
  background-color:gray;

}
.result{
  margin-top:13px;
}
a{
  text-decoration:none;
  color:white;
}
.mainbody{
  padding-bottom:200px;
}
a:hover{
  text-decoration:underline;
  opacity:0.8;
}
.mainsearchBar{
  width:700px;
  height:50px;
  border-radius:20px;
  margin-top:1%;
  margin-left:10%;
  font-size:22px;
  font-family: 'Arial',sans-serif;
  border:1px solid #ccc;
  caret-color:transparent;
  padding: 10px 10px 10px 50px;
}
.searchbutton{
  height:35px;
  width:60px;
  border-radius:5px;
  background-color:#242424;
  color:white;
  font-size:15px;
  border:none;
  transform:translate(-95px,-4px);

}
.Title{
  font-size:50px;
  color:white;
  margin-left:10%;
}
.bottomsearch{
  display:flex;
  flex-direction:row;
}
.bottomsearch>div{
  margin-right:100px;
}
.searchall{
  margin-left:5px;
}
input::placeholder{
  color:gray;
  opacity:0.2;
  margin-left:50px;
  padding-left:50px;
  text-align:center;
  text-decoration:none;
}

.mainsearchBar:focus{
  text-decoration:underline;
  text-decoration-color:gray;
  text-decoration-thickness: 1px;
  text-decoration-style:dotted;
}
#deco{
  display:flex;
  flex-direction:row;
  margin-top:30px;
}
#rightdeco{
  display:flex;
  flex-direction:column;
}
.rightdecoup{
  width:350px;
  height:150px;
  margin-left:5%;
  margin-top:10%;
  border-radius:5px;
  background:linear-gradient(to right,#000B61,#D62AC9,#FFAE05);
}
.rightdecodown{
  width:350px;
  height:150px;
  background-color:white;
  margin-left:5%;
  margin-top:20px;
  border-radius:5px;
  background-image:url("/blueorange.jpg");
  background-size:cover;
}

.deco1{
  background-image:url('/plane.jpg');
  background-size:cover;
  width:800px;
  height:300px;
  border-radius:20px;
  padding-top:2%;
  margin-left:10%;
  margin-top:2%;
}
.deco1>.header{
  font-size:40px;
  color:white;
  padding:0;
  margin:0;
  font-weight:800;
}
.deco1>.desc{
  font-size:20px;
  color:white;
  padding:0;
  margin:0;
  font-weight:400;
}
.deco2{
  width:90%;
  height:510px;
  display:flex;
  flex-direction:row;
  margin-left:10%;
  margin-top:50px;
}
.deco2>.description{
  width:1170px;
  height:400px;
  color:white;
  background-color:transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
.deco2 p{
  font-size:20px;
}
.deco3{
  width:100%;
  height:600px;
  display:flex;
  flex-direction:column;
  background:linear-gradient(to right,#FFA212,#FF1D37);
}
.deco3 a{
  color:black;
  font-size:20px;
  font-weight:600;
  text-decoration:none;

}
#container{
  margin-top:20px;
  margin-left:20px;
  height:100%;
}

.createtrip,.followtrip{
  font-size:25px;
  color:#ccc;
  font-weight:400;
  background-color:transparent;
  border:1px solid #ccc;
  border-radius:10px;width:250px;height:50px;margin-left:50px;
}
.createtrip:active,.followtrip:active{
  border:1px solid gray;
}
.createtrip:hover,.followtrip:hover{
  background-color:rgba(115,43,245,0.2);
}
.ph1,.ph2,.ph4{
  width:370px;
  height:250px;
  border-radius:10px;
  margin-right:25px;
  border:1px solid white;
  background-color:white;
  margin-top:50px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
}
.ph1{
  margin-left:10%;

}



</style>