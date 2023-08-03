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

    const updateSubTask = (subtaskId: string, done: boolean) => {
        const subTask = SubTask.subtasks.find(st => st.id === subtaskId)
        const index = SubTask.subtasks.findIndex(st => st.id === subTask.id)

        SubTask.updateSubtask(index, {
            ...subTask,
            done
        })
        Task.checkIsDone(task.id)
    }
    const handleAddTask = (content, done) => {
        SubTask.addSubtask({
            id: uuid4(),
            content,
            done,
            taskId: task.id
        })

        Task.checkIsDone(task.id)
        handleModal()
    }

    return {
        oninit: (node) => {
            task = Task.loadTask(node.attrs.id)
            if (!task)
                m.route.set("/")

            document.title = `To Do - ${task.title}`
            SubTask.loadSubtasks(node.attrs.id)
        },
        view: () => {
            return m("div.flex flex-col max-w-full w-full h-full bg-charcoal-800 relative", [
                m(Navbar, {title: task.title, onclick: () => m.route.set("/"), icon: "arrow_back_ios"}),
                m("div.flex flex-col mt-1",
                    m("ul", {id: "subtask-list"}, SubTask.subtasks.map(task => m("li",
                        m(Checkbox, {
                            id: `stk-${task.id}`,
                            label: task.content,
                            checked: task.done,
                            disabled: false,
                            onchange: (e: any) => updateSubTask(task.id, e.target.checked)
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