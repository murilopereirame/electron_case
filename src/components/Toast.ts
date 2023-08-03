import * as m from "mithril";
import Notification from "../models/Notification";

export const EToast = {
  ERROR: "error",
  SUCCESS: "success",
  WARN: "warn",
  INFO: "info"
}

const Toast = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case EToast.ERROR: return "error_outline"
      case EToast.SUCCESS: return "check_circle"
      case EToast.WARN: return "report_problem"
      default: return "info"
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case EToast.ERROR: return "bg-chili-500"
      case EToast.SUCCESS: return "bg-spring-500"
      case EToast.WARN: return "bg-gold-500"
      default: return "bg-charcoal-500"
    }
  }

  return {
    view: (vnode) => m(`.absolute ${Notification.isVisible && 'active'} toast w-full md:w-96 ${getColor(vnode.attrs.type)} absolute right-0 top-14 py-4 px-4 flex items-center text-white rounded-2xl right-2`, [
      m("span.material-icons mr-2", getIcon(vnode.attrs.type)),
      vnode.children
    ])
  }
}

export default Toast;