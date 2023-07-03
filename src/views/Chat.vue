<template>
  <div class="main">
    <NavBar id="nav"></NavBar>
    <Welcome v-if="!showMsg" id="welcome" @choose="setTable"></Welcome>
    <div v-else id="msglist">
      <div class="tip" @click="back">&lt; 选中了：{{ table_name }}</div>
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
        <input :disabled="running" v-model="content" @keydown.enter="sendMsg" />
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
      showMsg: false,
      table_name: "",
    };
  },
  methods: {
    newCycle() {
      this.msgList = [];
      this.content = "";
      this.running = false;
      this.printIntv = null;
    },
    setTable(table_name) {
      this.table_name = table_name;
      this.showMsg = true;
      this.newCycle();
    },
    back() {
      this.showMsg = false;
    },
    // 提问
    sendMsg() {
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
      this.streamPrint();
    },
    // 回答
    answer() {
      return "根据提供的数据，我们对不同产品型号在不同平台上的评论数进行了分析。以下是对该数据的简要分析：\n\n1. N1 SK_2022产品型号：\n   - 在小红书平台上获得了最多的评论数，共有12253条评论。\n   - 在微博平台上获得了第二多的评论数，共有2179条评论。\n   - 在淘宝平台上获得了第三多的评论数，共有2351条评论。\n\n2. 夜皇后_2022产品型号：\n   - 在微博平台上获得了最多的评论数，共有92087条评论。\n   - 在小红书平台上获得了第二多的评论数，共有26582条评论。\n   - 在淘宝平台上获得了第三多的评论数，共有20078条评论。\n\n3. 绿宝瓶_2022产品型号：\n   - 在微博平台上获得了最多的评论数，共有3447条评论。\n   - 在小红书平台上获得了第二多的评论数，共有26247条评论。\n   - 在淘宝平台上获得了第三多的评论数，共有10857条评论。\n\n根据以上分析，我们可以看出不同产品型号在不同平台上的评论数存在较大差异，其中微博和小红书是获得评论数最多的平台。这些数据可以为产品的市场推广和用户反馈提供参考。";
    },
    // 流式打印
    async streamPrint() {
      clearInterval(this.printIntv);

      const index = this.msgList.length - 1;
      let len = this.msgList[index].content.length;
      const ans = this.answer();

      // 有更多内容
      if (ans.length >= len) {
        await new Promise((resolve) => {
          // 定时输出
          this.printIntv = setInterval(() => {
            len = this.msgList[index].content.length;
            // 输出停止
            if (!this.running || len >= ans.length) {
              this.running = false;
              clearInterval(this.printIntv);
              resolve();
            }
            this.msgList[index].content = ans.slice(0, len + 1);
          }, Math.floor(20000 / ans.length));
        });
      }
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
  position: relative;
}
.tip {
  position: absolute;
  font-size: 18px;
  left: 50px;
  cursor: pointer;
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
