<template>
  <div class="app-update">
    <div class="block-title">
      <span>上传新版本</span>
    </div>
    <el-divider/>
    <div>
      <file-upload-area title="上传热更新资源包" upload-url="/api/version/update/wgt" file-extension=".wgt" upload-file-parameter-name="wgt"/>
      <file-upload-area title="上传安卓安装包" upload-url="/api/version/update/android" file-extension=".apk" upload-file-parameter-name="apk"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import FileUploadArea from '@/views/AdminPage/AppUpdate/FileUploadArea.vue'

export default defineComponent({
  name: 'AppUpdate',
  components: { FileUploadArea },
  setup () {
    const upLoadData = reactive({ versionName: '0.3.0', versionCode: 8 })

    return {
      upLoadData
    }
  }
})
</script>

<style lang="scss">
.app-update{
  box-sizing: border-box;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}
</style>
