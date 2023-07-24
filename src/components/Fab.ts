import * as m from 'mithril'

const Fab = {
    view: (node) => {
        return m("button.rounded-full w-12 h-12 absolute bottom-4 right-4 bg-gold-500 flex items-center justify-center",
            {onclick: node.attrs.onClick, type: "button", "data-test": node.attrs["data-test"]},
            [
                m("span.material-icons md-36 text-white", "add")
            ]
        )
    }
}

export default Fab