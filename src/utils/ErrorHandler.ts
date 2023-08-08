import Notification from "../models/Notification";
import {EToast} from "../components/Toast";

export const handleError = (code: number, message?: {}) => {
  switch(code) {
    case 401:
      Notification.show(
        message?.[code] ?? "Hey! You aren't supposed to do that! 👮",
        EToast.ERROR
      )
      break;
    case 400:
      Notification.show(
        message?.[code] ?? "Are sure about what you're doing? 🤔",
        EToast.ERROR
      )
      break;
    case 404:
      Notification.show(
        message?.[code] ?? "Well, the goblins didn't find what you want 🔍",
        EToast.ERROR
      )
      break;
    default:
      Notification.show(
        message?.[code] ?? "Wow, the server gave up, sorry 😔",
        EToast.ERROR
      )
      break;
  }
}