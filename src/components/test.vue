<template>
  <div class="achievements-container">
    <div class="header">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <div class="achievements-list">
      <div class="achievement-item" v-for="achievement in achievements" :key="achievement.id">
        <img :src="achievement.image" alt="" />
        <div class="achievement-details">
          <h3>{{ achievement.title }}</h3>
          <p>{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    title: {
      type: String,
      default: 'Your Achievements'
    },
    description: {
      type: String,
      default: 'Start sharing to unlock achievements.'
    },
    achievements: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 您的数据
    }
  },
  computed: {
    // 您的计算属性
  },
  methods: {
    // 您的方法
  }
}
</script>

<style>
.achievements-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.header {
  margin-bottom: 20px;
}

.header h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.header p {
  font-size: 16px;
  color: #777;
}

.achievements-list {
  display: flex;
  flex-wrap: wrap;
}

.achievement-item {
  margin: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.achievement-item img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.achievement-item h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.achievement-item p {
  font-size: 14px;
  color: #777;
}
</style>
