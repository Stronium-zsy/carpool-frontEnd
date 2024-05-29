<script>
import CreateTrip from "@/components/CreateTrip.vue";
export default{
  name:'Trips',
  data(){
    return{
      Departure:'',
      Destination:'',
      Time:'',
      TripName:'',
      IsCreateVisible:false,
      DynamicComponent:null,
    }
  },
  components:{
    CreateTrip,
  },
  methods:{
    ShowCreate(){
      this.IsCreateVisible=true;
    },
    CloseCreate(){
      this.IsCreateVisible=false;
    },
  }
}

</script>

<template>
  <CreateTrip v-if="IsCreateVisible" @close="CloseCreate" />

  <div class="container">
    <h1 style="margin-left:10%;">
      Get To Start A Trip
    </h1>
    <p style="margin-left:10%;">
      Now there’s two ways to plan your trip—use AI or search on your own. Either way,
    </p>
    <p style="margin-left:10%;">
      you’ve got more than 8 million spots to discover, with over one billion traveler
    </p>
    <p style="margin-left:10%;">
      reviews and opinions to guide you.
    </p>
    <div class="trip">
    </div>
    <div class="tripdesc" style="margin-top:55px;width:1200px;">
      <p style="margin-left:0;width:800px;font-size:35px;font-weight:600;">
        There are now two ways to join a trip:
      </p>
      <p style="margin-left:0;width:1000px;font-size:25px;margin-bottom:20px;">
          Create your own journey or join someone else's after getting permission.</p>
      <p style="margin-left:0;width:1000px;font-size:25px;margin-bottom:20px;">
        Creating your own trip allows you to tailor the experience to your preferences, inviting others to join you on your adventure.
        </p>
      <p style="margin-left:0;width:1000px;font-size:25px;margin-bottom:20px;">
        On the other hand, joining someone else's trip provides an opportunity to explore new destinations and connect with fellow travelers.
      </p>
      <p style="margin-left:0;width:1000px;font-size:25px;margin-bottom:50px;">
        With both options, the possibilities for unforgettable experiences are endless. Join us and embark on your next unforgettable journey today!
      </p>
    </div>
    <div class="deco">
      <div id="trip">
        Create Or Follow
      </div>
      <div class="follow-create">
      <div class="followatrip">
        <font-awesome-icon :icon="['fas', 'snowflake']" style="color:white;font-size:80px;margin-left:42px;"/>


        <p class="followtitle">
          Follow a trip After Approvment
        </p>
        <p class="followbody">
          Answer four short questions and AI will create a custom day-by-day itinerary backed by traveler reviews.
        </p>
        <button class="followbutton">
          Follow

        </button>


      </div>
      <div class="createatrip">
        <font-awesome-icon :icon="['fas', 'sun-plant-wilt']" style="color:white;font-size:80px;margin-left:42px;"/>

        <p class="createtitle">
          Create a trip On your own
        </p>
        <p class="createbody">
          Browse top destinations, restaurants, and things to do and save your faves to your itinerary as you go.
        </p>
        <button class="createbutton" @click="ShowCreate">
          Create


        </button>



      </div>
        </div>

    </div>

  </div>


</template>

<style scoped>
.container{
  width:100%;
  height:2000px;

}
.createdeco{
  background-image:url('/car.jpg');
  background-size:cover;
  height:350px;
  width:350px;
  border-radius:10px;
  margin-left:42px;
}
.triptitle{
  font-size:30px;
  color:black;
  font-weight: 600;
  margin-left:200px;
  margin-bottom:20px;
  margin-top:10px;
}

.followbutton,.createbutton{
  width:150px;
  height:30px;
  color:white;
  font-size:20px;
  font-weight:600;
  font-family: 'Arial',sans-serif;
  margin-top:10px;
  background-color:transparent;
  border:1px solid #ccc;
  margin-left:42px;
  text-align:left;
  border-radius:2px;
}
#trip{
  color:white;
  font-size:40px;
  font-weight:600;
  margin-left:10%;
  margin-top:100px;
}
.followbody{
  font-size:15px;
  width:90%;
  margin-left:42px;
  color:#ADADAD;
}
.createbody{
  font-size:15px;
  width:90%;
  margin-left:42px;
  color:#ADADAD;
}
.followtitle{
  font-size:25px;
  padding:0;
  margin: 50px 0 0 42px;
  color:white;
  font-weight:600;
}
.createtitle{
  font-size:25px;
  padding:0;
  color:white;
  font-weight:600;
  margin: 50px 0 0 42px;
}
.followdeco{
  background-image:url('/coolgirl.jpg');
  background-size:cover;
  height:350px;
  width:350px;
  border-radius:10px;
  margin-left:42px;

}
h1{
  color:white;
  margin-left:550px;
  margin-top:70px;
  margin-bottom:30px;
  font-size:30px;

}
p{
  color:white;
  margin-left:400px;
  font-size:20px;
}
label{
  font-size:15px;
}
input{
  height:50px;
  width:400px;
  margin-left:50px;
}
.trip{
  width:1200px;
  height:250px;
  background-image:url('/tripsubmitbackground.jpg');
  background-size:cover;
  border-radius:5px;
  margin-left:10%;
  margin-top:50px;
  padding-top:150px;
  padding-left:0px;
}
.follow-create{
  display:flex;
  flex-direction:row;
}
.deco{
  width:100%;
  height:700px;
  display:flex;
  flex-direction:column;
  padding:0;
  margin-top:50px;
  background:linear-gradient(to bottom right,#3487FF,#732BF5);
}
.followatrip{
  width:585px;
  height:300px;
  margin-top:50px;
  border-radius:5px;
  padding-top:30px;
  background-color:#1C1C1C;
  margin-left:10%;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
}
.createatrip{
  width:585px;
  height:300px;
  margin-left:30px;
  margin-top:50px;
  border-radius:5px;
  padding-top:30px;
  background-color:#1C1C1C;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
}
.tripdesc{
  margin-left:10%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom:10px;
}
</style>