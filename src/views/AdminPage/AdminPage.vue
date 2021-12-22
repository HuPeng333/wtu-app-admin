<template>
  <admin-side-bar/>
  <el-main>
    <router-view/>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminSideBar from '@/views/AdminPage/AdminSideBar.vue'

export default defineComponent({
  name: 'AdminPage',
  components: { AdminSideBar }
})
</script>

<style lang="scss"></style>
