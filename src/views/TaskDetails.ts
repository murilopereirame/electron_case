import m from 'mithril'
import Navbar from "../components/Navbar";
import Task, {ITask} from "../models/Task";
import Fab from "../components/Fab";
import NewSubTaskDialog from "../dialogs/NewSubTaskDialog";
import Overlay from "../components/Overlay";
import Checkbox from "../components/Checkbox";
import SubTask from "../models/SubTask";
import {v4 as uuid4} from 'uuid'

const TaskDetails = () => {
    let task: ITask | undefined;

    let showModal = false;

    const handleModal = () => {
        showModal = !showModal;
    }

    const updateSubTask = async (subtaskId: string, done: boolean) => {
        const subtask = SubTask.subtasks.find((e) => e.uuid === subtaskId);
        try {
            const result = await SubTask.updateSubtask({
                ...subtask,
                done
            })

            subtask.done = done
        } catch (e: any) {
            console.log(e)
        }
    }
    const handleAddTask = async (content: string, done: boolean) => {
        try {
            const subtask = await SubTask.addSubtask({
                content,
                done,
                tasks_idtask: task.uuid
            })

            SubTask.subtasks.push(subtask.data)
            SubTask.subtasks.sort(
              (a, b) =>
                a.content < b.content ? -1 :
                  a.content > b.content ? 1 : 0
            )
        } catch(e: any) {
            console.log(e)
        }

        handleModal()
    }

    return {
        oninit: async (node) => {
            try {
                const data = await SubTask.loadSubtasks(node.attrs.id)
                if(!data.task)
                    return m.route.set("/")

                task = data.task
                document.title = `To Do - ${data.task.title}`
            } catch(e: any) {
                console.log(e)
            }
        },
        view: () => {
            return m("div.flex flex-col max-w-full w-full h-full bg-charcoal-800 relative", [
                m(Navbar, {title: task?.title, onclick: () => m.route.set("/"), icon: "arrow_back_ios"}),
                m("div.flex flex-col mt-1",
                    m("ul", {id: "subtask-list"}, SubTask.subtasks.map(subtask => m("li",
                        m(Checkbox, {
                            id: `stk-${subtask.uuid}`,
                            label: subtask.content,
                            checked: subtask.done,
                            disabled: false,
                            onchange: (e: any) => updateSubTask(subtask.uuid, e.target.checked)
                        })))
                    )
                ),
                showModal && m(Overlay, { onclick: handleModal}, [m(NewSubTaskDialog, {onConfirm: handleAddTask})]),
                m(Fab, {onClick: handleModal, "data-test": "new-subtask-button"})
            ])
        }
    }
}

export default TaskDetails