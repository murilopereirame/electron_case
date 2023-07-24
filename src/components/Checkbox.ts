import * as m from 'mithril'

const Checkbox = {
    view: (node) => {
        return m("a.flex cursor-pointer bg-charcoal-600 mx-4 my-1 p-2 items-center rounded shadow-md shadow-black-50/50", {href: node.attrs.href}, [
            m("label.text-white cursor-pointer flex items-center", {
                    for: `ckb-${node.attrs.id}`,
                    id: `lbl-${node.attrs.id}`,
                    style: node.attrs.disabled && "pointer-events: none;"
                },
                [
                    m(
                        "input[type=checkbox].mr-2 peer cursor-pointer appearance-none w-5 " +
                        "h-5 bg-charcoal-200 border-charcoal-300 rounded checked:bg-gold-500", {
                            id: `ckb-${node.attrs.id}`,
                            checked: node.attrs.checked,
                            disabled: node.attrs.disabled,
                            onchange: node.attrs.onchange,
                        }
                    ),
                    m("svg.absolute w-5 h-5 hidden peer-checked:block pointer-events-none text-white", {
                        xmlns:"http://www.w3.org/2000/svg",
                        viewBox:"0 0 24 24",
                        fill:"none",
                        stroke:"currentColor",
                        "stroke-width":"4",
                        "stroke-linecap":"round",
                        "stroke-linejoin":"round",
                    }, [
                        m("polyline", {
                            points:"20 6 9 17 4 12"
                        })
                    ]),
                    node.attrs.label
                ]
            ),
        ])
    }
}

export default Checkbox