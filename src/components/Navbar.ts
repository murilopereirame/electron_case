import m from 'mithril'
import Auth from "../models/Auth";
import Loading from "../models/Loading";

const Navbar = () => {
    const logout = () => {
      Loading.handleLoading()
      Auth.logout()
      Loading.handleLoading()
    }

    return {
      view: (node) => {
        return m("nav.w-full flex justify-between bg-charcoal-700 p-4 h-min", [
          m("a.cursor-pointer flex items-center", {onclick: node.attrs.onclick},
            m("h1.font-bold text-2xl text-gold-500 flex items-center", [
              m("span.material-icons md-36 text-gold-500 mr-2", node.attrs.icon ?? "checklist"),
              m.trust(node.attrs.title ?? "To Do")
            ])
          ),
          m("a.cursor-pointer flex items-center", {onclick: logout},
            m("h1.font-bold text-2xl text-gold-500 flex items-center", [
              m("span.material-icons md-36 text-gold-500", "logout"),
            ])
          )
        ])
      }
    }
}

export default Navbar