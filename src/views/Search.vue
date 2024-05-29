<script>
import axios from "axios";
import {ref} from "vue";
import {UserStore} from "@/store/index.js";
import MyCalendar from "@/components/MyCalendar.vue";
import SearchCalendar from "@/components/SearchCalendar.vue";

export default {
  name: "Search",
  components: {SearchCalendar, MyCalendar},
  data(){
    return{
      TripName: ref(""),
      Departure: ref(""),
      Destination: ref(""),
      DepartureResults: ref([]),
      DestinationResults: ref([]),
      FocusDeparture: ref(false),
      FocusDestination: ref(false),
      StartDate: ref(null),
      EndDate: ref(null),
      Trips:[],
      showdropdown:[],
      showstartcal:ref(false),
      showendcal:ref(false),

    }
  },
  methods:{
    async SearchDeparture(){
      const apiKey = 'e4fce0dd56834d559d3b9e5f7fdedc68';
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.Departure}&key=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        this.DepartureResults = response.data.results;
      } catch (error) {
        console.error('Error searching city:', error);
      }
    },
    async SearchDestination(){
      const apiKey = 'e4fce0dd56834d559d3b9e5f7fdedc68';
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.Destination}&key=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        this.DestinationResults = response.data.results;
      } catch (error) {
        console.error('Error searching city:', error);
      }
    },
    async ConfirmTime(){
      try{
        this.GetStartDate();
        this.GetEndDate();
        console.log(this.StartDate);
        console.log(this.EndDate);
      }catch(error){
        console.error('Error:',error);
      }
    },
    GetStartDate(){
      this.StartDate = this.$refs.calendarRef.getStartDate();
      return this.StartDate.value;
    },
    GetEndDate(){
      this.EndDate = this.$refs.calendarRef.getEndDate();
      return this.EndDate.value;
    },
    showstartcal(){

    },
    showendcal(){

    },
    DepartureSearch(){
      if(this.Departure.length>=1){
        this.SearchDeparture();
      }
    },
    ConfirmDeparture(result){
      this.Departure=result;
      this.LoseFocusDeparture();
    },
    ConfirmDestination(result){
      this.Destination=result;
      this.LoseFocusDestination();
    },
    DestinationSearch(){
      if(this.Destination.length>=1){
        this.SearchDestination();
      }
    },
    IsFocusDeparture(){
      this.FocusDeparture=true;
    },
    LoseFocusDeparture(){
      this.FocusDeparture=false;
    },
    IsFocusDestination(){
      this.FocusDestination=true;
    },
    LoseFocusDestination(){
      this.FocusDestination=false;
    },
    async fetchTrips() {


      try {
        const tripdata={
          departure:this.Departure,
          destination:this.Destination,
          startDate:this.StartDate,
          endDate:this.EndDate,
        }
        console.log(tripdata);
        const token=UserStore().getToken();
        const response = await axios.post(`http://localhost:8080/trip/searchallTrips`,tripdata);
        console.log(response.data);
        this.Trips = response.data.data;
        console.log(this.Trips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    },
    async Join(index) {
      console.log(index);
      const tripid = this.Trips[index].tripId;
      const sender = UserStore().UserId;
      const receiver = this.Trips[index].userId;
      console.log(tripid, sender, receiver);

      try {
        const response = await axios.post('http://localhost:8080/trip/jointrip', {
          tripid: tripid,
          sender: sender,
          receiver: receiver
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }


  }
}
</script>

<template>
  <div class="arrow">

  </div>
  <div id="container">
    <div id="searchcard">
      <div id="title">
        Input Information To Search Trips
      </div>
      <div id="departure">
        <div class="title">Departure:</div>
        <input v-model="Departure" @input="DepartureSearch" @focus="IsFocusDeparture"/>
        <ul v-if="DepartureResults.length&&Departure!=''&&FocusDeparture" class="departureResults" @focus="IsFocusDeparture">


          <li v-for="result in DepartureResults" :key="result.geometry.lat + result.geometry.lng" @click="ConfirmDeparture(result.formatted)" @focus="IsFocusDeparture">

            <div class="result">
              {{ result.formatted }}
            </div>
          </li>
        </ul>
      </div>
      <div id="destination">
        <div class="title">Destination:</div>
        <input v-model="Destination" @input="DestinationSearch" @focus="IsFocusDestination"/>
        <ul v-if="DestinationResults.length&&Destination!=''&&FocusDestination" class="destinationResults" @focus="IsFocusDestination">
          <li v-for="result in DestinationResults" :key="result.geometry.lat + result.geometry.lng" @click="ConfirmDestination(result.formatted)" @focus="IsFocusDestination">
            <div class="result">
              {{ result.formatted }}
            </div>
          </li>
        </ul>
      </div>
      <div class="calendar">
      <SearchCalendar ref="calendarRef" @selectEnd="ConfirmTime"/>
        </div>
      <button id="search" @click="fetchTrips">
        Search
      </button>

    </div>
    <div id="resultscard">
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
            <button class="EditButton" @click="Join(index)">
              Join
            </button>
          </div>
          <!-- 其他旅行信息字段 -->
        </li>
      </ul>

    </div>
  </div>

</template>

<style scoped>
#container{
  width:1150px;
  height:2000px;
  background-color:transparent;
  padding:0;
  display:flex;
  flex-direction:row;
  margin: 20px 0 0 10%;
}

#search{
  width:240px;
  margin-left:20px;
  height:70px;
  background-color:transparent;
  border:1px solid white;
  color:white;
  font-size:20px;
  border-radius:10px;
  margin-top:40px;
  font-weight:600;
  margin-bottom:70px;
  padding-bottom:10px;
  padding-top:10px;
  text-align:center;
}
#searchcard{
  width:400px;
  border:2px white groove;
  display:flex;
  flex-direction:column;
  border-radius:5px;
  overflow:scroll;
  height:700px;
  max-height:100%;
  border-right:1px #ccc dashed;

}
#searchcard::-webkit-scrollbar{
  width:0;
}
#resultscard{
  width:750px;
  height:700px;
  overflow:scroll;
  border:2px white solid;
  display:flex;
  border-radius:5px;
  flex-direction:column;
  border-left:none;
  overflow-x:hidden;
}
#resultscard::-webkit-scrollbar{
  width:0;
}
#title{
  color:white;
  font-size:20px;
  font-weight:600;
  margin-top:60px;
  margin-left:20px;
}
#departure,#destination,#startdate,#enddate{
  color:white;
  margin-left:20px;
  margin-top:30px;
  font-size:18px;
}
#departure{
  margin-top:100px;
}
.title{
  width:150px;
}
input{
  width:335px;
  height:30px;
  background-color:transparent;
  border:0 solid transparent;
  border-bottom:2px solid white;
  color:white;
  font-size:15px;
}
.departureResults,.destinationResults{
  margin-left:0;
  padding-left:0;
}
.departureResults>li,.destinationResults>li{
  height:50px;
  transition:border-color 0.3s ease;
  border-radius:3px;
  line-height:50px;
  color:#ccc;
  width:340px;
  background-color:transparent;
  border:none;
  list-style-type:none;
}
.departureResults>li:hover,.destinationResults>li:hover{
  background-color:#383838;
  color:white;
  border-radius:0;
}
.arrow {
  position: relative;
  margin-top: -40px; /* 调整箭头位置 */
  width: 0;
  height: 0;
  transform:translate(880px,20px);
  border-left: 11px solid transparent; /* 左边的三角形 */
  border-right: 11px solid transparent; /* 右边的三角形 */
  border-bottom: 11px solid white; /* 底部的三角形，可以改变颜色以匹配导航栏 */
  border-top: 11px solid transparent; /* 顶部的透明三角形 */
}
.trip {
  padding:0;
  font-family: 'Arial',sans-serif;
  color:black;
  font-size:20px;
  background-color:white;
  height:150px;
  width:690px;
  border-radius:5px;
  margin: 20px 0 0 0;
  display:flex;
  flex-direction:row;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);
}

.decorate{
  height:150px;
  width:270px;
  background-size:cover;
  border-radius:5px 0 0 5px;


}
.Information{
  display:flex;
  flex-direction:column;
  width:200px;


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
  width:200px;
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
}
.destination{
  font-size:15px;
}
.startDate{
  font-size:15px;
  margin-left:5px;
}
.endDate{
  font-size:15px;
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
  margin-right:20px;
  margin-top:30px;
  border-radius:0 5px 0 5px;
  margin-left:150px;

}
.EditButton:hover{
  background-color:#CCCCCC;
  color:black;
}
ul{
  padding-left:20px;
}


</style>