<template>
  <div class="file-table">
    <div class="file-table-title">
      <span>{{title}}</span>
    </div>
    <div class="app-info-version">
      <div v-if="!!copyOfVersionInfo">
        <div>
          <span>最新版本: {{copyOfVersionInfo?.versionName}}</span>
        </div>
        <div>
          <span>最新版本号: {{copyOfVersionInfo?.versionCode}}</span>
        </div>
        <div>
          <el-link type="primary" @click.prevent="showModifyVersionDialog = true">点我更新</el-link>
        </div>
      </div>
      <div v-else>
        <div>
          <el-link type="primary" @click.prevent="showModifyVersionDialog = true">暂无相关版本信息, 点我更新</el-link>
        </div>
      </div>
    </div>
    <el-table :data="copyOfFileList" :row-class-name="showCurrentVersionInTable" :default-sort="{prop: 'fileName', order: 'descending'}" ref="infoTable">
      <el-table-column type="index" label="序号"/>
      <el-table-column prop="fileName" label="版本名称" sortable/>
      <el-table-column prop="createTime" label="发布时间" :formatter="timeStampFormatter"/>
      <el-table-column prop="size" label="大小" :formatter="sizeFormatter"/>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <div style="display: flex;">
            <form :action="getServerUrl() + prefixUrl + scope.row.fileName" :id="`file-${scope.row.fileName}`">
              <el-button type="text" size="small" native-type="submit">下载</el-button>
            </form>
            <el-button type="text" size="small" @click="deleteFile(scope)" style="margin-left: 4px">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="showModifyVersionDialog" title="选择一个文件当做新版本">
    <div class="app-info-form-info">
      <span>选择新版本文件</span>
    </div>
    <el-select v-model="selectedVersion" placeholder="选择一个文件">
      <el-option v-for="(item, index) in copyOfFileList" :key="index" :label="item.fileName" :value="item.fileName"/>
    </el-select>
    <div style="margin: 20px 0">
<!--      <div v-if="!!copyOfVersionInfo && !!selectedVersion">-->
<!--        <span>新版本号: {{copyOfVersionInfo?.versionCode + 1}}</span>-->
<!--        <span style="margin-left: 15px">新版本名称: {{selectedVersion}}</span>-->
<!--      </div>-->
      <div v-if="!!selectedVersion">
        <div>
          <span>输入版本号</span>
        </div>
        <el-input placeholder="输入版本号" v-model="formVersionCode" type="number"/>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showModifyVersionDialog = false">取消</el-button>
        <el-button type="primary" @click="publishNewVersionAjax">更新</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FileInfo } from '@/api/beans/FileInfo'
import { getServerUrl, parseTimestamp, showErrorToast, showSuccessToast } from '@/hook/utils'
import { ResBean } from '@/api/beans/ResBean'
import { ElLoading } from 'element-plus'
import { AppInfo } from '@/api/beans/AppInfo'

export default defineComponent({
  name: 'FileTable',
  props: {
    fileList: {
      type: Array,
      required: true
    },
    prefixUrl: {
      type: String,
      required: true
    },
    title: String,
    newVersionInfo: {
      type: Object
    },
    updateCallBack: {
      type: Function,
      required: true
    },
    deleteCallback: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    // 复制一份, 方便在发送ajax请求后修改显示的数据
    const copyOfVersionInfo = ref<AppInfo>(props.newVersionInfo as AppInfo)
    const copyOfFileList = ref<Array<FileInfo>>(props.fileList as Array<FileInfo>)
    // ref组件
    const infoTable = ref()

    const timeStampFormatter = (row:FileInfo):string => {
      return parseTimestamp(row.createTime)
    }

    const showModifyVersionDialog = ref(false)
    const selectedVersion = ref<string>()
    // 如果有IOS, 应该将IOS拼接上
    const formVersionCode = ref<number>(props.newVersionInfo ? props.newVersionInfo.versionCode + 1 : 1)

    /**
     * 添加新版本
     */
    const publishNewVersionAjax = () => {
      console.log(formVersionCode)
      if (!selectedVersion.value) {
        showErrorToast('请选择版本')
        return
      }
      const loading = ElLoading.service()

      // 请求后的cb
      props.updateCallBack(selectedVersion.value, formVersionCode.value).then((resp: ResBean) => {
        if (resp.code === 0) {
          showSuccessToast('操作成功')
          copyOfVersionInfo.value = {
            // 上面已经对空值做了处理
            versionName: selectedVersion.value!,
            versionCode: formVersionCode.value
          }
          infoTable.value.doLayout()

        }
      }).finally(() => {
        loading.close()
      })

      showModifyVersionDialog.value = false

    }

    const showCurrentVersionInTable = ({ row }: {row: FileInfo}) => {
      if (row.fileName === props.newVersionInfo?.versionName) {
        return 'app-info-current-version'
      } else {
        return ''
      }
    }

    const deleteFile = ({ row }: {row: FileInfo}) => {
      console.log(row.fileName + '----' + copyOfVersionInfo.value.versionName)
      if (row.fileName === copyOfVersionInfo.value.versionName) {
        showErrorToast('不可以删除当前的最新版本! 请更新新版本信息后再删除')
        return
      }
      const loading = ElLoading.service()
      let targetIndex = 0
      const targetArray = copyOfFileList.value
      for (let i = 0, len = targetArray.length; i < len; i++) {
        if (targetArray[i].fileName == row.fileName) {
          targetIndex = i
        }
      }
      props.deleteCallback(row.fileName).then((resp: ResBean) => {
        if (resp.code === 0) {
          showSuccessToast('删除成功')
          copyOfFileList.value.splice(targetIndex, 1)
        } else {
          showErrorToast(`删除失败, ${resp.message}`)
        }
      }).finally(() => {
        loading.close()
      })
    }

    /**
     * 文件大小格式化
     * 小于1000kb: 500 -> 500KB
     * 大于等于1000kb: 1000 -> 1MB
     */
    const sizeFormatter = ({ size }: FileInfo):string => {
      if (size < 1000) {
        return size + 'KB'
      } else {
        return (size / 1000).toFixed(2) + 'MB'
      }
    }

    return {
      timeStampFormatter,
      getServerUrl,
      showModifyVersionDialog,
      selectedVersion,
      formVersionCode,
      publishNewVersionAjax,
      showCurrentVersionInTable,
      copyOfVersionInfo,
      infoTable,
      deleteFile,
      copyOfFileList,
      sizeFormatter
    }
  }
})
</script>

<style lang="scss">
.file-table{
  margin: 30px 0;
}
.file-table-title{
  color: $color-main;
}
.app-info-current-version{
  background-color: var(--el-color-success-lighter) !important;
}
</style>
