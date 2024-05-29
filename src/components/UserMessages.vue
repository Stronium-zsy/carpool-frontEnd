<script>
import axios from "axios";
import {UserStore} from "@/store/index.js";
import {ref} from "vue";

export default {
  name: "UserMessages",
  data() {
    return {
      Messages: ref([]),
    };
  },
  mounted() {
    this.fetchMessages();
  },
  methods: {
    async fetchMessages() {
      var userid=UserStore().UserId;
      try {
        const response = await axios.get(`http://localhost:8080/message/getMessages?userid=${userid}`);
        console.log(response.data);
        console.log(userid);

        if (response.data) {
          this.Messages = response.data.data;
          console.log(this.Messages);
        } else {
          console.log("No messages found.");
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    async Decide(decision,index) {
      console.log(decision);
      console.log(index);
      const response = await axios.post(`http://localhost:8080/message/decide?joinid=${this.Messages[index].joinid}&decision=${decision}`);
      console.log(response.data);
      this.Messages.splice(index,1);
    },
  },
}
</script>

<template>
  <div id="container">
    <ul v-if="Messages.length">
      <li v-for="(message, index) in Messages" :key="index">
        <div class="message" v-if="message.status==='待审核'">
        <div class="decorate" :key="this.index" :style="{backgroundImage:'url(/public/tripPictures/nature'+index%20+'.jpg)'}"></div>
        <div class="Information">

          <div class="TripName">

            {{ message.tripName }}
            <font-awesome-icon :icon="['fas', 'arrow-left']" v-if="message.username" style="transform:translate(320px,5px);"/>
            <div id="sender">
              {{message.username}}
            </div>

          </div>
          <div class="place">
            <font-awesome-icon :icon="['fas', 'plane']" style="width:15px;height:15px;margin-top:2px;font-weight: 100"/>
            <div class="departure" >{{ message.departure }} </div>
            <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:2px 5px 0 5px;font-weight: 100"/>
            <div class="destination">{{ message.destination }}</div>
          </div>
          <div class="time">
            <font-awesome-icon :icon="['fas', 'calendar-days']" style="width:15px;height:15px;font-weight: 100"/>
            <div class="startDate"> {{ message.startDate }}</div>
            <font-awesome-icon :icon="['fas', 'arrow-right']" style="width:15px;height:15px;margin:0 5px 0 5px;font-weight: 100"/>
            <div class="endDate"> {{ message.endDate }}</div>
          </div>
        </div>
        <div id="status">
          {{message.status}}
          <div id="buttons">
            <button style="width:100px;height:30px;transform:translateX(-20px);" @click="Decide(1,index)">
              Approve
            </button>
            <button style="width:60px;height:30px;" @click="Decide(0,index)">
              Reject
            </button>
          </div>
        </div>
        </div>

        <!-- 其他旅行信息字段 -->
      </li>
    </ul>

  </div>

</template>

<style scoped>
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
.message{
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
.place{
  display:flex;
  flex-direction:row;
  margin-left:20px;
  margin-top:10px;
  height:30px;
  font-weight:600;
}
ul {
  list-style-type: none;
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
#buttons{
  display:flex;
  flex-direction:row;
  transform:translate(-100px,40px);
}
.decorate{
  height:200px;
  width:270px;
  background-size:cover;
  border-radius:10px 0 0 10px;
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
#sender{
  transform:translateX(330px);
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

ul{
  padding-left:20px;
  margin-top:0;
}

.Information{
  display:flex;
  flex-direction:column;
  width:400px;

}

.TripName{
  font-weight:800;
  margin-left:20px;
  margin-top:20px;
  display:flex;
  flex-direction:row;
  width:600px;
}
.edit{
  display:flex;
  flex-direction:column;
}
#status{
  transform:translate(60px,20px);
  font-size:20px;
  font-weight:600;
}
button{
  background-color:transparent;
  font-size:15px;
  font-weight:600;
  border:2px solid #BABABA;
  border-radius:3px;
}
</style>