import * as m from 'mithril'

const Checkbox = {
    view: (node) => {
        return m("div.flex cursor-pointer bg-charcoal-600 mx-4 my-1 p-2 items-center rounded shadow-md shadow-black-50/50", [
            m("input[type=checkbox].mr-2 peer cursor-pointer appearance-none w-5 h-5 bg-charcoal-200 border-charcoal-300 rounded checked:bg-gold-500", {id: "ckb-1", checked: node.attrs.checked}),
            m("label.text-white cursor-pointer", {for: "ckb-1"}, node.attrs.label),
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
            ])
        ])
    }
}

export default Checkbox