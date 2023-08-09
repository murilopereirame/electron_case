import m from "mithril"

const Overlay = {
    view: (node) => {
        return m(".div fade-in fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center", {style: node.attrs.style}, [
            node.children,
            m("div.bg-charcoal-900/75 w-full h-full absolute z-0", {onclick: node.attrs.onclick, id: "overlay"})
        ])
    }
}

export default Overlay