<template>
  <div class="app-info">
    <div class="app-info-title">
      <span>基本信息</span>
    </div>
    <el-divider/>
    <div>
      <el-skeleton :rows="10" animated :throttle="500" :loading="loadingDoneCount >= 0 && loadingDoneCount < 4"/>
      <div v-if="loadingDoneCount === 4">
        <file-table :file-list="wgtResourceList" prefix-url="/app/hotUpdate/" title="热更新资源包" :delete-callback="deleteWgtResource"
                    :new-version-info="wgtNewVersionInfo" :update-call-back="publishWgtNewVersion"/>
        <file-table :file-list="androidApkList" prefix-url="/app/full/android/" title="安卓安装包" :delete-callback="deleteAndroidApk"
                    :new-version-info="androidNewVersionInfo" :update-call-back="publishAndroidNewVersion"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  getAndroidApkList,
  getWgtNewVersionInfo,
  getWgtList,
  getAndroidNewVersionInfo,
  publishAndroidNewVersion, publishWgtNewVersion, deleteAndroidApk, deleteWgtResource
} from '@/api'
import { AppInfo } from '@/api/beans/AppInfo'
import { FileInfo } from '@/api/beans/FileInfo'
import FileTable from '@/views/AdminPage/AppInfo/FileTable.vue'

export default defineComponent({
  name: 'AppInfo',
  components: { FileTable },
  setup () {
    // 请求加载完毕的个数, 小于0为加载失败, 等于3则加载成功
    const loadingDoneCount = ref<number>(0)

    const androidNewVersionInfo = ref<AppInfo>()
    const wgtNewVersionInfo = ref<AppInfo>()
    getWgtNewVersionInfo().then(resp => {
      if (resp.code === 0) {
        wgtNewVersionInfo.value = resp.data
      }
    }).finally(() => {
      loadingDoneCount.value++
    })
    getAndroidNewVersionInfo().then(resp => {
      if (resp.code === 0) {
        androidNewVersionInfo.value = resp.data
      }
    }).finally(() => {
      loadingDoneCount.value++
    })

    const androidApkList = ref<Array<FileInfo>>([])
    getAndroidApkList().then(resp => {
      if (resp.code === 0) {
        androidApkList.value = androidApkList.value.concat(resp.data)

      }
    }).finally(() => {
      loadingDoneCount.value++
    })

    const wgtResourceList = ref<Array<FileInfo>>([])
    getWgtList().then(resp => {
      if (resp.code === 0) {
        wgtResourceList.value = wgtResourceList.value.concat(resp.data)
      }
    }).finally(() => {
      loadingDoneCount.value++
    })
    return {
      loadingDoneCount,
      androidNewVersionInfo,
      androidApkList,
      wgtResourceList,
      wgtNewVersionInfo,
      publishWgtNewVersion,
      publishAndroidNewVersion,
      deleteAndroidApk,
      deleteWgtResource
    }
  }
})
</script>

<style lang="scss">
.app-info-form-info{
  margin: 20px 0 5px;
}
.app-info-version{
  margin: 4px 0;
  font-size: 14px !important;
  color: $color-info;
}
.app-info{
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
}
.app-info-title{
  color: $color-main;
  font-size: 28px;
}
</style>
