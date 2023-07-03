<template>
  <div class="main">
    <NavBar id="nav"></NavBar>
    <Welcome v-if="msgList.length == 0" id="welcome"></Welcome>
    <div v-else id="msglist">
      <Msg
        v-for="(item, i) in msgList"
        :content="item.content"
        :key="i"
        :from="item.from"
      ></Msg>
    </div>
    <div id="quest-box">
      <div class="recycle-btn" @click="newCycle">新轮提问</div>
      <div class="input">
        <input v-model="content" @keydown.enter="sendMsg" />
      </div>
      <button @click="sendMsg" class="send-btn">
        {{ running ? "停止" : "发送" }}
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
import Msg from "../components/Msg.vue";
import Welcome from "../components/Welcome.vue";

import { getAnswer } from "../api";

export default {
  name: "chat",
  components: {
    NavBar,
    Msg,
    Welcome,
  },
  data() {
    return {
      msgList: [],
      content: "",
      running: false,
      printIntv: null,
      query_id: Math.floor(Math.random() * 9000 + 1000),
    };
  },
  methods: {
    newCycle() {
      this.msgList = [];
      this.content = "";
      this.running = false;
      this.printIntv = null;
      this.query_id = Math.floor(Math.random() * 9000 + 1000);
    },
    // 提问
    async sendMsg() {
      if (this.running) {
        this.running = false;
        return;
      }
      // 用户
      this.msgList.push({
        content: this.content,
        from: "user",
      });
      this.content = "";
      // gpt
      this.msgList.push({
        content: "",
        from: "gpt",
      });
      this.running = true;
      for (let i = 0; i < 10; i++) {
        const status = await this.streamPrint();
        if (status == 1) {
          this.running = false;
        }
      }
    },
    // 回答
    answer() {
      return getAnswer({
        query_id: this.query_id,
        chat: this.msgList
          .filter((msg) => msg.from == "user")
          .map((msg) => {
            return {
              consult: msg.content,
            };
          }),
      });
    },
    // 流式打印
    async streamPrint() {
      clearInterval(this.printIntv);

      const res = await this.answer();
      if (!res) {
        return 1;
      }
      const index = this.msgList.length - 1;
      const len = this.msgList[index].content.length;
      const ans = res.response;
      const words = ans.slice(len);

      // 有更多内容
      if (res.response >= len) {
        await new Promise((resolve) => {
          // 定时输出
          this.printIntv = setInterval(() => {
            // 输出停止
            if (!this.running || len >= ans.length) {
              this.running = false;
              clearInterval(this.printIntv);
              resolve();
            }
            this.msgList[index].content = ans.slice(0, len + 1);
          }, Math.floor(800 / words.length));
        });
      }
      return res.status;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  background-color: rgb(239, 241, 254);
  display: flex;
  flex-direction: column;
}
#welcome {
  padding: 120px 120px 0;
  flex-grow: 1;
}
#msglist {
  padding: 20px 120px 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
#quest-box {
  height: 90px;
  padding: 10px 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.recycle-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  color: #567bf7;
  background: linear-gradient(
    30deg,
    rgba(113, 72, 248, 0.03),
    rgba(104, 157, 255, 0.12) 50%,
    rgba(166, 112, 235, 0.2)
  );
  background-color: #fff;
  border: 1px solid #567bf7;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}
.recycle-btn:hover {
  -webkit-filter: brightness(1.05);
  filter: brightness(1.05);
}
.input {
  flex: 1;
  height: 50px;
  margin: 0 20px;
  padding: 12px 20px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #a8c7f5;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(168, 199, 245, 0.2);
  box-sizing: border-box;
}
.input input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  background: none;
  opacity: 1;
  border: none;
  outline: none;
}
.send-btn {
  box-sizing: border-box;
  height: 50px;
  padding: 0 25px;
  border: 1px solid #a8c7f5;
  color: white;
  background-color: #567bf7;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
