<template>
  <el-container>
    <el-header width="200px" v-if="!$route.meta['hideHeader']" class="header" height="50px">
      <div class="header-logo-text">
        <span>Wtu-App-Admin</span>
      </div>
    </el-header>
    <el-container>
      <router-view/>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* Project id 3050092 */
  src: url('//at.alicdn.com/t/font_3050092_roye4uz1h1s.woff2?t=1640173941765') format('woff2'),
  url('//at.alicdn.com/t/font_3050092_roye4uz1h1s.woff?t=1640173941765') format('woff'),
  url('//at.alicdn.com/t/font_3050092_roye4uz1h1s.ttf?t=1640173941765') format('truetype');
}
.header{
  display: flex;
  align-items: center;
  background-color: $color-main;
}
.header-logo-text{
  font-size: 22px;
  color: #fff;
}
</style>
