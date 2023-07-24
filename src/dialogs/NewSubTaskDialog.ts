import * as m from 'mithril'

const NewSubTaskDialog = () => {
    let subTaskTitle = ""
    let done = false

    return {
        view: (node) => {
            return m(`div.p-4 z-20 shadow-lg shadow-black/50 rounded-xl flex flex-col items-center w-96 bg-charcoal-500`, [
                m("div.flex justify-start w-full", [
                    m("h3.text-white text-xl", "New Task")
                ]),
                m("div.flex w-full mt-2", [m("input[type=text].w-full bg-charcoal-50 rounded-md text-lg font-semibold pl-2", {
                    placeholder: "Task Title",
                    value: subTaskTitle,
                    onchange: (e) => subTaskTitle = e.target.value
                })]),
                m("div.flex w-full mt-2", [
                    m("input[type=checkbox].mr-2 peer cursor-pointer appearance-none w-5 h-5 bg-charcoal-200 border-charcoal-300 rounded checked:bg-gold-500", {id: "ckb-done", onchange: (e) => done = e.target.checked}),
                    m("label.text-white cursor-pointer", {id: "ckb-done"}, "Done"),
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
                ]),
                m("div.flex justify-end items-center w-full mt-4", [m("button.bg-spring-400 text-white rounded-md p-2 font-bold", {
                    onclick: () => {
                        node.attrs.onConfirm(subTaskTitle, done)
                    }
                }, "CREATE")])
            ])
        }
    }
}

export default NewSubTaskDialog;