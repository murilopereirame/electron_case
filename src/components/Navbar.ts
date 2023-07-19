import * as m from 'mithril'

const Navbar = {
    view: () => {
        return m("nav.w-full flex bg-charcoal-700 p-4 h-min", [
            m("a", {href: "#"},
                m("h1.font-bold text-2xl text-gold-500 flex items-center", [
                    m("span.material-icons md-36 text-gold-500 mr-2", "checklist"),
                    m.trust("To Do")
                ])
            )
        ])
    }
}

export default Navbar