import * as m from 'mithril'
import Task from "../models/Task";
import {handleModal} from "../views/TaskList";
import {v4 as uuid4} from "uuid"

const NewTaskDialog =  () => {
    let taskTitle = ""

    return {
        view: (node) => {
            return m(
                `div.p-4 z-20 shadow-lg shadow-black/50 rounded-xl 
                flex flex-col items-center w-96 bg-charcoal-500`,
        [
                    m("div.flex justify-start w-full", [
                        m("h3.text-white text-xl", "New Task")
                    ]),
                    m("div.flex w-full mt-2", {"data-test": "new-task-title-input"},
                        [
                            m(
                        "input[type=text].w-full bg-charcoal-50 rounded-md text-lg font-semibold pl-2",
                        {
                                    placeholder: "Task Title",
                                    value: taskTitle,
                                    onchange: (e) => taskTitle = e.target.value
                                }
                            )
                        ]
                    ),
                    m("div.flex justify-end items-center w-full mt-4", [
                        m("button.bg-spring-400 text-white rounded-md p-2 font-bold", {
                            onclick: () => {
                                Task.addTask({
                                        id: uuid4(),
                                        title: taskTitle,
                                        done: false
                                    });
                                taskTitle = "";
                                handleModal()
                            },
                            "data-test": "new-task-create-button"
                        }, "CREATE")
                    ])
                ]
            )
        }
    }
}

export default NewTaskDialog