<template>
  <div>update</div>
  <div>
    <el-upload drag multiple :action="`/version/update/hot`"
               :data="upLoadData" name="wgt" accept=".wgt"></el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'AppUpdate',
  setup () {
    const upLoadData = reactive({ versionName: '0.3.0', versionCode: 8 })

    return {
      upLoadData
    }
  }
})
</script>

<style lang="scss"></style>
