<template>
  <div id="container">
  <ul v-if="Trips.length">
    <li v-for="(trip, index) in Trips" :key="index" class="trip">

      <div class="decorate" :key="this.index" :style="{backgroundImage:'url(/public/tripPictures/nature'+index%20+'.jpg)'}"></div>
      <div class="Information">

        <div class="TripName">

          {{ trip.tripName }}

        </div>
        <div class="place">
          <font-awesome-icon :icon="['fas', 'plane']" style="width:15px;height:15px;margin-top:2px;font-weight: 100"/>
        <div class="departure" >{{ trip.departure }} </div>
          <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:2px 5px 0 5px;font-weight: 100"/>
        <div class="destination">{{ trip.destination }}</div>
        </div>
        <div class="time">
          <font-awesome-icon :icon="['fas', 'calendar-days']" style="width:15px;height:15px;font-weight: 100"/>
        <div class="startDate"> {{ trip.startDate }}</div>
          <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:0 5px 0 5px;font-weight: 100"/>
        <div class="endDate"> {{ trip.endDate }}</div>
        </div>
        </div>
      <div class="edit">
      <button class="EditButton" @click="Delete(index)">
        Delete
      </button>
      </div>
      <!-- 其他旅行信息字段 -->
    </li>
  </ul>
  <p v-else>No trips found.</p>
  </div>
</template>

<script>
import axios from "axios";
import {UserStore} from "@/store/index.js";

export default {
  name: "UserTrips",
  data() {
    return {
      Trips: [],
      userid:'',
      showdropdown:[],
    };
  },
  mounted() {
    this.fetchTrips();

  },
  methods: {
    async fetchTrips() {
      const token=UserStore().getToken();
      console.log(token);
      var userid=UserStore().UserId;


      try {
        const response = await axios.get(`http://localhost:8080/trip/getTrips?id=${userid}`);
        if (response.data && response.data.data && response.data.data.length > 0) {
          this.Trips = response.data.data;
          console.log(this.Trips);

        } else {
          // 如果没有获取到数据，可以给出一个提示
          console.log("No trips found.");
        }


      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    },
    async Delete(index){
      console.log(index);
      this.showdropdown[index]=!this.showdropdown[index];
      const response=await axios.post(`http://localhost:8080/trip/deletetrip?tripid=${this.Trips[index].TripId}`);
      this.Trips.splice(index,1);
    },
  }
};
</script>

<style scoped>
.trip {
  padding:0;
  font-family: 'Arial',sans-serif;
  color:black;
  font-size:20px;
  background-color:white;
  height:200px;
  width:790px;
  border-radius:10px;
  margin: 0 0 30px;
  display:flex;
  flex-direction:row;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
}
#container{
  width:850px;
  height:1000px;
  overflow:scroll;
  display:flex;
  border-radius:5px;
  flex-direction:column;
  border-left:none;
  overflow-x:hidden;
  margin-top:40px;
}
#container::-webkit-scrollbar{
  width:0;
}


.decorate{
  height:200px;
  width:270px;
  background-size:cover;
  border-radius:10px 0 0 10px;


}
.Information{
  display:flex;
  flex-direction:column;
  width:450px;

}

.place{
  display:flex;
  flex-direction:row;
  margin-left:20px;
  margin-top:10px;
  height:30px;
  font-weight:600;

}
.time{
  display:flex;
  flex-direction:row;
  margin-left:20px;
  margin-top:10px;
  height:30px;
  font-weight:600;
  width:450px;
}
.TripName{
  font-weight:800;
  margin-left:20px;
  margin-top:20px;
  display:flex;
  flex-direction:row;
  width:600px;
}
.departure{
  font-size:15px;
  margin-left:5px;
  max-width:200px;
}
.destination{
  font-size:15px;
  max-width:200px;
}
.startDate{
  font-size:15px;
  margin-left:5px;
  max-width:200px;
}
.endDate{
  font-size:15px;
  max-width:200px;
}
.edit{
  display:flex;
  flex-direction:column;
}
.EditButton{
  width:60px;
  height:20px;
  background-color:transparent;
  border:1px solid #CCCCCC;
  color:gray;
  margin-right:30px;
  margin-top:30px;
  border-radius:0 5px 0 5px;


}
.EditButton:hover{
  background-color:#CCCCCC;
  color:black;
}
ul{
  padding-left:20px;
  margin-top:0;
}

</style>
