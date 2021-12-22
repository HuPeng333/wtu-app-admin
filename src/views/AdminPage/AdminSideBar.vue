<template>
  <el-aside width="200px">
    <div class="admin-side-bar">
      <el-menu :default-active="path">
        <el-menu-item class="admin-side-bar-menu-item" index="info" @click="navTo('/admin/info')">
          <span class="iconfont">&#xe600;</span>
          <span>基本信息</span>
        </el-menu-item>
        <el-menu-item class="admin-side-bar-menu-item" index="update" @click="navTo('/admin/update')">
          <span class="iconfont">&#xe665;</span>
          <span>上传新版本</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'AdminSideBar',
  setup () {
    const route = useRoute()
    const router = useRouter()

    // 获取url路径
    let path = route.path.replace('/admin', '').replace('/', '')
    if (path.length === 0) {
      path = 'info'
    }

    const navTo = (url:string) => {
      if (route.path === url) {
        return
      }
      router.push(url)
    }

    return {
      path,
      navTo
    }
  }
})
</script>

<style lang="scss">
.admin-side-bar-menu-item{
  > span:first-child{
    font-size: 20px;
    margin-right: 8px;
  }
  > span:last-child {
  }
}
.admin-side-bar{
  background-color: #fff;
  position: fixed;
  overflow: hidden;
  height: 100vh;
  width: 200px;
}
</style>
