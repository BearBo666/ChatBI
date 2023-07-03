<template>
  <div
    class="msg"
    :style="from == 'user' ? { 'flex-direction': 'row-reverse' } : {}"
  >
    <div class="content" :class="from == 'user' ? 'user' : 'gpt'">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["content", "from"],
};
</script>

<style>
.msg {
  width: 100%;
  display: flex;
}
.content {
  max-width: 70%;
  border-radius: 10px;
  padding: 10px 15px;
  text-align: left;
}
.user {
  background-color: rgb(86, 123, 247);
  color: white;
}
.gpt {
  background-color: white;
  color: black;
}
</style>
