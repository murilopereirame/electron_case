import {EToast} from "../components/Toast";
import * as m from 'mithril'

const Notification = {
  isVisible: false,
  type: EToast.INFO,
  duration: 5000,
  message: "",
  show: (message: string, type?: string, duration?: number) => {
    Notification.message = message
    if(type !== undefined) Notification.type = type
    if(duration !== undefined) Notification.duration = duration
    Notification.isVisible = true

    setTimeout(() => {
      Notification.dismiss()
    }, Notification.duration)
  },
  dismiss: () => {console.log("Wow, dismiss...."); Notification.isVisible = false; m.redraw()}
}

export default Notification