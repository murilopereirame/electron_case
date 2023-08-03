import m from 'mithril'
import Toast, {EToast} from "./Toast";
import Notification from '../models/Notification'

const Container = {
  view: (vnode) => m(".w-full h-full relative", [
    m(Toast, {type: Notification.type}, Notification.message),
    vnode.children
  ])
}

export default Container