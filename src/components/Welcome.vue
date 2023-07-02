<template>
  <div class="container">
    <div class="title">欢迎使用ChatExcel</div>
    <div class="recomend">
      <div v-for="(item, i) in recomendList" :key="i" class="block">
        <div class="question-type">{{ item.title }}</div>
        <div class="question">
          <div
            class="question-item"
            v-for="(q, i) in item.question"
            :key="i + 100"
          >
            {{ q }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recomendList: [
        {
          title: "咨询xx问题",
          question: ["帮我xxxxxxxx", "帮我xxxxxxxx"],
        },
        {
          title: "咨询xx问题",
          question: ["帮我xxxxxxxx", "帮我xxxxxxxx"],
        },
        {
          title: "咨询xx问题",
          question: ["帮我xxxxxxxx", "帮我xxxxxxxx"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-bottom: 10px;
  font-size: 48px;
  font-weight: 700;
  color: #567bf7;
}
.recomend {
  display: flex;
  padding: 15px 40px;
  background-color: rgba(86, 123, 247, 0.1);
  border-radius: 8px;
  margin-top: 20px;
}
.block {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}
.question-type {
  position: relative;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
}
.question-type::after {
  position: absolute;
  left: -5px;
  bottom: -8px;
  width: calc(100% + 10px);
  height: 4px;
  content: "";
  background: linear-gradient(90deg, #567bf7, rgba(86, 123, 247, 0));
}
.question-item {
  margin-top: 5px;
  font-size: 16px;
  font-weight: lighter;
}
</style>
