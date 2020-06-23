<template>
  <div class="header">
    <router-link to="/activitylist">
      <div class="nav_btn">活動列表</div>
    </router-link>
    <router-link to="/MyFavorite">
      <div class="nav_btn">我的收藏</div>
    </router-link>
  </div>
</template>

<style>
.nav_btn {
  display: inline-block;
  border: 1px solid #DCDFE6;
  background: #DEFFFF;
  width: 100px;
  line-height: 35px;
  margin: 5px;
  border-radius: 10px;
}
.nav_btn:hover {
  background: #008585;
  color: white;
}
</style>

<script>
</script>
