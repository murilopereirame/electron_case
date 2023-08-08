import m from 'mithril'
import Auth from "../models/Auth";
import Loading from "../models/Loading";
import {handleError} from "../utils/ErrorHandler";

const Login = () => {

  const doLogin = async () => {
    try {
      Loading.handleLoading()
      const result = await Auth.login()

      result && m.route.set("/", null, {replace: true})
    } catch(e: any) {
      handleError(e.code, {401:"Email/Password invalid ⛔"})
    } finally {
      Loading.handleLoading()
    }
  }

  return {
    view: () => {
      return m('div.flex flex-col max-w-full items-center justify-center w-full h-full bg-charcoal-800', [
        m("div.flex items-center", [
          m("span.material-icons text-6xl text-gold-500 leading-10 mr-2", "checklist"),
          m("p.text-white font-bold text-4xl", "To Do")
        ]),
        m("div.flex flex-col w-25 mt-4", [
          m("div.flex w-full", [
            m("input[type=text].w-full bg-charcoal-50 rounded-md text-lg font-semibold pl-2",
              {
                placeholder: "Email",
                value: Auth.email,
                onchange: (e) => Auth.setEmail(e.target.value),
                type: "email",
                "data-test": "new-subtask-content"
              }
            )
          ]),
          m("div.flex w-full mt-1", [
            m("input[type=text].w-full bg-charcoal-50 rounded-md text-lg font-semibold pl-2",
              {
                placeholder: "Password",
                value: Auth.password,
                onchange: (e) => Auth.setPassword(e.target.value),
                type: "password",
                "data-test": "new-subtask-content"
              }
            )
          ]),
          m("div.flex w-full mt-2", [m("button.bg-gold-400 text-white disabled:bg-charcoal-200 disabled:text-charcoal-50 rounded-md px-2 py-1 font-bold w-full", {
            onclick: doLogin,
            disabled: !Auth.canSubmit(),
            "data-test": "new-subtask-create"
          }, "LOGIN")])
        ])
      ])
    }
  }
}

export default Login