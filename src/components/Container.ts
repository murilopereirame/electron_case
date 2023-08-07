import m from 'mithril'
import Toast, {EToast} from "./Toast";
import Notification from '../models/Notification'
import Overlay from "./Overlay";
import Spinner from "./Spinner";
import Loading from "../models/Loading";

const Container = {
  view: (vnode) => m(".w-full h-full relative", [
    m(Toast, {type: Notification.type}, Notification.message),
    Loading.isLoading && m(Overlay, {style: {
        zIndex: 99
      }}, m(Spinner)),
    vnode.children
  ])
}

export default Container