import {
  ElButton,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElLoading,
  ElMessage, ElUpload, ElDivider, ElSkeleton, ElTable, ElTableColumn, ElLink, ElDialog, ElSelect, ElOption, ElInput
} from 'element-plus'
import { App } from 'vue'

export default (app: App):void => {
  app.use(ElButton)
  app.use(ElContainer)
  app.use(ElAside)
  app.use(ElHeader)
  app.use(ElMain)
  app.use(ElMenu)
  app.use(ElMenuItem)
  app.use(ElLoading)
  app.use(ElMessage)
  app.use(ElUpload)
  app.use(ElDivider)
  app.use(ElSkeleton)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElLink)
  app.use(ElDialog)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElInput)
}
