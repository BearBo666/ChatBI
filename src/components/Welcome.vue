<template>
  <div class="container">
    <div class="title">欢迎使用ChatBI</div>
    <div class="recomend">
      <div v-for="(item, i) in recomendList" :key="i" class="block">
        <div class="question-type">{{ item.title }}</div>
        <div class="question">
          <span
            class="question-item"
            v-for="(q, j) in item.question"
            :key="j"
            @click="handleQuestionClick(q)"
          >
            {{ q }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recomendList: [
        {
          title: "请选择要处理的表格",
          question: ["chanel_new", "chanel_without", "Huawei", "Niunai"],
        },
      ],
    };
  },
  methods: {
    handleQuestionClick(table_name) {
      // var data = new FormData();
      // data.append("table_name", table_name);
      // data = { table_name: table_name };
      // axios
      //   .post("https://43.154.178.61/set_table", { table_name })
      //   .then((response) => {
      //     console.log(response.data);
      //     // 处理POST请求的响应
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     // 处理POST请求的错误
      //   });
      this.$emit("choose", table_name);
    },
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
  display: block; /* 设置为块级元素 */
  margin-bottom: 10px; /* 添加底部间距，用于分隔每个问题 */
  margin-top: 5px;
  font-size: 18px;
  font-weight: normal;
  cursor: pointer;
}
</style>
