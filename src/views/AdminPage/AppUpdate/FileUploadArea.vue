<template>
  <div class="file-upload-area">
    <div class="upload-title">
      <span>{{title}}</span>
    </div>
    <div>
      <el-upload drag multiple :action="uploadUrl" :on-success="uploadSuccessCallback" :on-error="uploadFailCallback" :on-progress="uploadProcessEvent"
                 :data="{versionName: fileName}" :name="uploadFileParameterName" :accept="fileExtension" :before-upload="beforeUploadCallback" :show-file-list="false">
        <div class="upload-area">
          <div class="iconfont upload-icon">
            <span>&#xec1d;</span>
          </div>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
  <el-dialog v-model="showDialog" title="输入文件名称">
    <div>
      <el-input placeholder="文件名称" v-model="fileName"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showModifyVersionDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmUpload">更新</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, WatchStopHandle } from 'vue'
import { showErrorToast, showSuccessToast } from '@/hook/utils'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import { ResBean } from '@/api/beans/ResBean'

export default defineComponent({
  name: 'FileUploadArea',
  props: {
    title: String,
    uploadUrl: {
      type: String,
      required: true
    },
    fileExtension: {
      type: String,
      required: true
    },
    uploadFileParameterName: {
      type: String,
      required: true
    }
  },
  setup () {
    const router = useRouter()

    let loading:ILoadingInstance

    const uploadSuccessCallback = (response:ResBean) => {
      if (response.code === 101) {
        // 未登录
        showErrorToast('请先登录')
        router.replace('/login')
      } else {
        showSuccessToast('文件上传成功')
      }
      loading?.close()
    }

    const uploadFailCallback = (e: Error) => {
      console.log(e)
      try {
        const resp = JSON.parse(e.message)
        if (resp.code === 101) {
          // 未登录
          router.replace('/login')
        }
      } catch (ignore) {
        // json解析错误
        showErrorToast('文件上传失败, 请重试')
      }
      loading?.close()
    }

    const showDialog = ref(false)
    const fileName = ref('')
    // 是否点了上传按钮
    const isUpload = ref(false)

    function getNoSufixFileName(fileName:string) {
      return fileName.replace(/\..+/, '')
    }


    const beforeUploadCallback = (file:File) => {
      showDialog.value = true
      fileName.value = getNoSufixFileName(file.name)
      return new Promise((resolve, reject)=> {

        let watchButton:WatchStopHandle
        let watchCancel:WatchStopHandle

        watchButton = watch(isUpload, () => {
          if (isUpload.value) {
            watchButton()
            watchCancel()
            isUpload.value = false
            loading = ElLoading.service()
            showDialog.value = false
            resolve('')
          }
        })
        watchCancel = watch(showDialog, () => {
          if (!showDialog.value) {
            watchButton()
            watchCancel()
            reject('')
          }
        })
      })
    }

    const confirmUpload = () => {
      isUpload.value = true
    }

    const uploadProcessEvent = (e: {percent:number}) => {
      loading.setText(Math.ceil(e.percent) + '%')
    }


    return {
      uploadSuccessCallback,
      uploadFailCallback,
      beforeUploadCallback,
      showDialog,
      fileName,
      confirmUpload,
      uploadProcessEvent
    }
  }
})
</script>

<style lang="scss">
.file-upload-area{
  margin: 20px 0;
}
.upload-title{
  margin: 10px 0;
  color: $color-main;
}
.upload-area{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.upload-icon{
  color: $color-info;
  font-size: 100px;
}
.el-upload-dragger{
  width: 100%;
}
.el-upload{
  width: 100%;
}
</style>
