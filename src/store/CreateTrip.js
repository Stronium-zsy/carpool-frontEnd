import {defineStore} from 'pinia'
import {ref} from "vue";
export const TripStore=defineStore('Trip',{
    state:()=>({
        TripName: '',
        Departure: '',
        Destination: '',
        StartDate: null,
        EndDate: null,
        trips:[],

    }),
    actions:{
      UpdateTripData(TripName,Departure,Destination,StartDate,EndDate){
          this.TripName=TripName;
          this.Departure=Departure;
          this.Destination=Destination;
          this.StartDate=StartDate;
          this.EndDate=EndDate;
          console.log(this.TripName)
          console.log(this.Departure)
          console.log(this.Destination)
          console.log(this.StartDate)
          console.log(this.EndDate)
      } ,
        async fetchTripsFromBackend(){
            try {
                // 发送请求到后端获取旅游信息
                const response = await fetch('/api/searchTrips');
                const data = await response.json();
                // 更新仓库中的旅游信息
                this.trips = data;
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        }
    },
    mutations:{

    }
})