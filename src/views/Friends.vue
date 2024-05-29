<script>
import Friendcom from "@/components/Friendcom.vue";
import {UserStore} from "@/store/index.js";
import axios from "axios";
import {ref} from "vue";
export default {
  name: "Friends",
  components: {Friendcom,},
  data(){
    return{
      Friends:[],
      containerWidth: 0,
      containerHeight: 0,
      ShowInfo:[],

    }

  },
  mounted() {
    this.$nextTick(() => {
      this.containerWidth = document.querySelector(".friends-list").offsetWidth;
      this.containerHeight = document.querySelector(".friends-list").offsetHeight;
      this.generateRandomPositions();
    });
  },
  created() {
    this.Friends=new Array(100);
    this.ShowInfo=new Array(100).fill(false);
    this.fetchFriends();
  },
  methods: {
    showInfo(index){
      this.ShowInfo[index]=!this.ShowInfo[index];
    },
    generateRandomPositions() {
      const friendWidth = 100; // 定义每个朋友的宽度
      const friendHeight = 100; // 定义每个朋友的高度
      const minMargin = 100; // 定义最小边距

      const maxLeft = this.containerWidth - friendWidth - minMargin;
      const maxTop = this.containerHeight - friendHeight - minMargin;

      const friendCount = this.Friends.length;
      for (let i = 0; i < friendCount; i++) {
        let left = Math.floor(Math.random() * maxLeft);
        let top = Math.floor(Math.random() * maxTop);

        // 检查是否与其他朋友重叠
        for (let j = 0; j < i; j++) {
          const prevFriend = this.Friends[j];
          if (
              left + friendWidth > prevFriend.left &&
              left < prevFriend.left + friendWidth &&
              top + friendHeight > prevFriend.top &&
              top < prevFriend.top + friendHeight
          ) {
            // 如果重叠，则重新生成位置
            left = Math.floor(Math.random() * maxLeft);
            top = Math.floor(Math.random() * maxTop);
            j = -1; // 重新检查所有之前的朋友位置
          }
        }
        this.Friends[i].left=left;
        this.Friends[i].top=top;
      }
    },
    async fetchFriends() {

      try {
        const Store=UserStore();
        this.userid=Store.UserId;
        console.log(this.userid);
        const response = await axios.get(`http://localhost:8080/friends/findFriends?userid=${this.userid}`);
        console.log(response.data);
        this.Friends = response.data.data;
        console.log(this.Friends);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    },
  }
}
</script>

<template>
  <div id="container">
    <div id="toparrow">

    </div>
    <div id="mainbody">
      <ul v-if="Friends.length" class="friends-list">
        <li v-for="(friend,index) in Friends" :key="index" class="friend" :style="{ left: friend.left + 'px', top: friend.top + 'px' }">
          <div id="friend" class='decorate' :key="this.index" :style="{backgroundImage:'url(/public/friendPictures/human'+index+'.png'}" @click="showInfo(index)">
            {{friend.name}}
          </div>
          <div id="arrow" v-if="ShowInfo[index]">

          </div>
          <div v-if="ShowInfo[index]" class="friend-content" @click="showInfo(index)">
            <div>{{friend.name}}</div>
            <div>{{friend.email}}</div>
            <div>{{friend.phone}}</div>
          </div>
        </li>
      </ul>

    </div>


  </div>

</template>

<style scoped>
#container{
  width:100%;
  height:1600px;
  background-color: #242424;

}
.friends-list {
  position: relative;
  width: 90%; /* 你的容器宽度 */
  height: 90%; /* 你的容器高度 */
  border-radius:50%;
  margin:5% 5% 5% 5%;
  padding: 0;
  list-style: none;

}
.friend {
  position: absolute;
  width: 100px; /* 朋友的宽度 */
  height: 100px; /* 朋友的高度 */
  background-color: #ccc; /* 朋友的背景颜色 */
  border-radius:20px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.6);

}
#toparrow{
  position: relative;
  margin-top: -40px; /* 调整箭头位置 */
  width: 0;
  height: 0;
  transform:translate(1010px,20px);
  border-left: 11px solid transparent; /* 左边的三角形 */
  border-right: 11px solid transparent; /* 右边的三角形 */
  border-bottom: 11px solid white; /* 底部的三角形，可以改变颜色以匹配导航栏 */
  border-top: 11px solid transparent;
}
.friend-content {
  width:300px;
  height: 70px;
  background-color:transparent; /* 朋友内容的背景颜色 */
  position:absolute;
  z-index:10000;
  border-radius:5px;
  font-size:20px;
  font-weight:400;
  color:white;
  display:flex;
  flex-direction:column;
  transform:translate(50px,-205px);
  border:1px solid white;

}
.friend-content div{
  margin-left:10px;
}
#mainbody{
  width:1146px;
  height:1000px;
  margin-left:10%;
  border:2px white solid;
  margin-top:20px;
  border-radius:10px;
  background-color:#242424;
}

#friend{
  width:100px;
  height:100px;
  background-color:white;
  border-radius:20px;

}
#arrow {
  position: relative;
  width: 0;
  height: 0;
  transform: translate(65px, -113px); /* 调整位置 */
  border-left: 11px solid transparent; /* 左边的三角形 */
  border-right: 11px solid transparent; /* 右边的三角形 */
  border-bottom: 11px solid transparent; /* 底部的三角形，可以改变颜色以匹配导航栏 */
  border-top: 11px solid white; /* 顶部的透明三角形 */
}
.decorate{
  background-size:cover;
  color:white;
  font-size:15px;
  font-weight:600;
  opacity:0.8;
  text-align:center;



}
li{
  list-style-type:none;
}
</style>