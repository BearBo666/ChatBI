<template>
  <div class="navbar">
    <img class="logo" src="../assets/logo.png" />
    <div class="logo-name">ChatBI</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  width: 30px;
  height: 30px;
  margin: 0px 10px 0px 30px;
}
.logo-name {
  font-size: 22px;
  font-weight: 700;
  color: rgb(65, 184, 131);
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
