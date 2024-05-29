<script>
import {TripStore} from "@/store/CreateTrip.js";
export default {
  name: "MyTrip",
  data() {
    return {
      TripName: "",
      Departure: "",
      Destination: "",
      StartDate: "",
      EndDate: "",
    };
  },
  created(){
    const Store=TripStore();
    this.TripName=Store.TripName;
    this.Departure=Store.Departure;
    this.Destination=Store.Destination;
    this.StartDate=Store.StartDate;
    this.EndDate=Store.EndDate;
  },
  methods:{
    deleteTrip(){
    }

  }
}
</script>

<template>
  <div class="trip">

    <div class="decorate" >

    </div>
    <div class="Information">
      <p class="TripName">
         {{TripName}}

      </p>

      <div class="Place">
        <font-awesome-icon :icon="['fas', 'plane']" style="width:15px;height:15px;margin-top:2px;font-weight: 100"/>
      <p class="Departure">
         {{Departure}}
      </p>
        <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:2px 5px 0 5px;font-weight: 100"/>
      <p class="Destination">
         {{Destination}}
      </p>
      </div>
      <div class="Time">
        <font-awesome-icon :icon="['fas', 'calendar-days']" style="width:15px;height:15px;font-weight: 100"/>
      <p class="StartDate">
         {{StartDate}}
      </p>
        <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:0 5px 0 5px;font-weight: 100"/>
      <p class="EndDate">
         {{EndDate}}
      </p>
        </div>
    </div>



  </div>

</template>

<style scoped>
*{
  margin:0;
  padding:0;
  font-family: 'Arial',sans-serif;
}
.trip{
  color:black;
  font-size:20px;
  background-color:white;
  height:200px;
  width:900px;
  border-radius:20px;
  margin-left:300px;
  display:flex;
  flex-direction:row;
}
.Place{
  display:flex;
  flex-direction:row;
  margin-left:20px;
  margin-top:10px;
  height:30px;
  font-weight:600;

}
.Location{
  background-image:url('/location-dot-solid.svg');
  width:15px;
  height:20px;
  background-size:cover;

}
.Date{
  background-image:url('/calendar-days-solid.svg');
  width:15px;
  height:17px;
  background-size:cover;

}
.Time{
  display:flex;
  flex-direction:row;
  margin-left:20px;
  margin-top:10px;
  height:30px;
  font-weight:600;
}
.decorate{
  background-image:url('/forest.jpg');
  height:200px;
  width:350px;
  background-size:cover;
  border-radius:20px 0 0 20px;
}
.TripName{
  font-size:25px;
  margin-left:20px;
  margin-top:30px;
  height:30px;
  font-weight:700;

}
.Information{
  height:100%;
  width:400px;
}
.Departure{
  font-size:15px;
  margin-left:5px;
}
.Destination{
  font-size:15px;
}
.StartDate{
  font-size:15px;
  margin-left:5px;
}
.EndDate{
  font-size:15px;
}
.closeButton{
  width:50px;
  height:50px;
  background-color:red;
  border-radius:25px;
  margin-top:10px;
  margin-left:10px;
}

</style>