<template>
  <el-container>
    <el-header v-if="!$route.meta['hideHeader']"  height="50px" class="header-el">
      <div class="header">
        <div class="header-logo-text">
          <span>Wtu-App-Admin</span>
        </div>
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
.header-el{
  padding: 0!important;
}
.header{
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  background-color: $color-main;
}
.header-logo-text{
  font-size: 22px;
  color: #fff;
}
</style>
