import m from 'mithril'

const Fab = {
    view: (node) => {
        return m("button.rounded-full w-12 h-12 fixed bottom-4 right-6 bg-gold-500 flex items-center justify-center",
            {onclick: node.attrs.onClick, type: "button", "data-test": node.attrs["data-test"]},
            [
                m("span.material-icons md-36 text-white", "add")
            ]
        )
    }
}

export default Fab