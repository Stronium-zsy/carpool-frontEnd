<script >
import MyCalendar from "@/components/MyCalendar.vue";
import{TripStore}from "@/store/CreateTrip.js";
import axios from "axios";
import {UserStore} from '@/store/index.js'
import {ref,onMounted} from "vue"
export default{
  name:'CreateTrip',
  data(){
    return {
        TripName: ref(""),
        Departure: ref(""),
        Destination: ref(""),
        DepartureResults: ref([]),
        DestinationResults: ref([]),
        FocusDeparture: ref(false),
        FocusDestination: ref(false),
        StartDate: ref(null),
        EndDate: ref(null),
        TripData:ref({
          TripName: ref(this.TripName),
          Departure: ref(this.Departure),
          Destination: ref(this.Destination),
          StartDate: ref(this.StartDate),
          EndDate: ref(this.EndDate),
        }),
    };
  },
  components:{
    MyCalendar
  },
  created(){
    const Store= TripStore();
    this.TripData.value;
  },

  methods:{
    UpdateData(){
      const store=TripStore();
      store.UpdateTripData(this.TripName,this.Departure,this.Destination,this.StartDate,this.EndDate);
    },
    CloseCreate(){
      this.$emit('close');
    },
    DepartureSearch(){
      if(this.Departure.length>=1){
        this.SearchDeparture();
      }
    },

    DestinationSearch(){
      if(this.Destination.length>=1){
        this.SearchDestination();
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
    GetStartDate(){
      this.StartDate = this.$refs.calendarRef.getStartDate();
      return this.StartDate.value;
    },
    GetEndDate(){
      this.EndDate = this.$refs.calendarRef.getEndDate();
      return this.EndDate.value;
    },
    async Submit(){
      const user=UserStore();
      const tripData = {
        tripName:this.TripName,
        departure:this.Departure,
        destination:this.Destination,
        startDate:this.StartDate,
        endDate:this.EndDate,
        userId:user.UserId,

      };
      this.UpdateData(tripData);
      console.log('tripData:',tripData);
      const response = await axios.post('http://localhost:8080/trip/addTrip', tripData);

      console.log('成功创建:', response.data);
      this.CloseCreate();
      this.$router.push('/user');
    },
    async ConfirmTime(){
      try{
        this.GetStartDate();
        this.GetEndDate();
      }catch(error){
        console.error('Error:',error);
      }
    }

  }

}
</script>




<template>
  <div class="background" >
    <div class="mainbody">
      <button class="closeButton" @click="CloseCreate">
        x

      </button>

      <p class="maintitle">
        Create A Trip
      </p>
      <p class="tripname">
        Trip Name:

      </p>
      <input class="tripnameinput" v-model="TripName"/>
      <p class="destination">
        Departure:

      </p>
      <input class="destinationinput" v-model="Departure" @input="DepartureSearch" @focus="IsFocusDeparture" />
      <ul v-if="DepartureResults.length&&Departure!=''&&FocusDeparture" class="departureResults" @focus="IsFocusDeparture">


        <li v-for="result in DepartureResults" :key="result.geometry.lat + result.geometry.lng" @click="ConfirmDeparture(result.formatted)" @focus="IsFocusDeparture">

          <div class="result">
            {{ result.formatted }}
          </div>
        </li>
      </ul>
      <p class="departure">
        Destination
      </p>

      <input class="departureinput" v-model="Destination" @input="DestinationSearch" @focus="IsFocusDestination" />
      <ul v-if="DestinationResults.length&&Destination!=''&&FocusDestination" class="destinationResults" @focus="IsFocusDestination">
        <li v-for="result in DestinationResults" :key="result.geometry.lat + result.geometry.lng" @click="ConfirmDestination(result.formatted)" @focus="IsFocusDestination">
          <div class="result">
            {{ result.formatted }}
          </div>
        </li>
      </ul>
      <p class="departure">
        Time:
      </p>
      <div class="calendar">
        <MyCalendar ref="calendarRef" @selectEnd="ConfirmTime"/>
      </div>
      <hr>
      <div class="footer">

        <button @click="Submit" >
          Create
        </button>

      </div>

    </div>
  </div>


</template>
<style scoped>
.footer{
  display:flex;
  flex-direction:row;
  margin-top:20px;
  margin-left:50px;
  margin-bottom:20px;
  font-size:20px;
  font-weight:600;
}
button{
  margin-left:280px;
  width:150px;
  height:50px;
  margin-right:0;
  border-radius:20px;
  background-color:black;
  font-size:20px;
  font-weight:600;
  color:white;
  border:none;

}
.departureResults,.destinationResults{
  list-style: none;
  padding: 0;
  width: 500px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-radius:5px;
  color:white;
  font-size:17px;
  font-weight:600;
  margin: 15px 0 0 20px;

}
.departureResults>li,.destinationResults>li{
  height:55px;
  transition:border-color 0.3s ease;
  padding-left:50px;
  border-radius:3px;
  line-height:50px;
  color:black;
  background-color:#EDEDED;
  border-top:1px #C9C9C9 solid;
  border-bottom:1px #C9C9C9 solid;
}
.departureResults>li:hover,.destinationResults>li:hover{
  background-color:#BABABA;
  border-radius:0;
}
.calendar{
  margin-bottom:0;
  margin-left:50px;
}
.background{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  font-family: 'Arial', sans-serif;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  color:black;

}

.closeButton{
  width:30px;
  height:30px;
  margin-left:480px;
  margin-top:10px;
  background-color:transparent;
  border:none;
  font-size:20px;
  position:fixed;
  color:black;
}
.mainbody{
  background: white;
  border-radius:20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding-top:10px;
  width:35%;
  overflow:scroll;
  max-height:100%;
}
.mainbody::-webkit-scrollbar{
  width:0;
}
.mainbody::-webkit-scrollbar-thumb{
  background-color:transparent;
}
.mainbody::-webkit-scrollbar-track{
  background-color:transparent;
}
.maintitle{
  font-size:30px;
  font-weight:800;
  margin-left:50px;

}

.tripnameinput{
  width:400px;
  margin-left:50px;
  height:50px;
  border-radius:5px;
  font-size:30px;
  padding-left:15px;
  border:2px solid black;
}
.tripname{
  margin-left:50px;
  margin-bottom:5px;

}
.destination{
  margin-left:50px;
  margin-bottom:5px;
}
.destinationinput{
  margin-left:50px;
  width:400px;
  height:35px;
  border-radius:20px;
  padding-left:15px;
  border:2px solid black;
}
.departure{
  margin-left:50px;
  margin-bottom:5px;
}
.departureinput{
  margin-left:50px;
  width:400px;
  height:35px;
  border-radius:20px;
  padding-left:15px;
  border: 2px solid black;
}
</style>