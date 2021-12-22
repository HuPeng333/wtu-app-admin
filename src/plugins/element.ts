import {
  ElButton,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem
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
}
