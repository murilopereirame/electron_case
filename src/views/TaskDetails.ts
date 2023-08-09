import m from 'mithril'
import Navbar from "../components/Navbar";
import {ITask} from "../models/Task";
import Fab from "../components/Fab";
import NewSubTaskDialog from "../dialogs/NewSubTaskDialog";
import Overlay from "../components/Overlay";
import Checkbox from "../components/Checkbox";
import SubTask from "../models/SubTask";
import Loading from "../models/Loading";
import {handleError} from "../utils/ErrorHandler";
import Notification from "../models/Notification";
import {EToast} from "../components/Toast";

const TaskDetails = () => {
    let task: ITask | undefined;

    let showModal = false;

    const handleModal = () => {
        showModal = !showModal;
    }

    const updateSubTask = async (subtaskId: string, done: boolean) => {
        const subtask = SubTask.subtasks.find((e) => e.uuid === subtaskId);
        try {
            Loading.handleLoading()
            await SubTask.updateSubtask({
                ...subtask,
                done
            })

            subtask.done = done
        } catch (e: any) {
            handleError(e.code)
        } finally {
            Loading.handleLoading()
        }
    }
    const handleAddSubTask = async (content: string, done: boolean) => {
        try {
            Loading.handleLoading()
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

            Notification.show(
              "Subtask added with success! 🗹",
              EToast.SUCCESS
              )
        } catch(e: any) {
            handleError(e.code)
        } finally {
            Loading.handleLoading()
        }

        handleModal()
    }

    return {
        oninit: async (node) => {
            try {
                Loading.handleLoading()
                const data = await SubTask.loadSubtasks(node.attrs.id)
                if(!data.task)
                    return m.route.set("/")

                task = data.task
                document.title = `To Do - ${data.task.title}`
            } catch(e: any) {
                handleError(e.code)
            } finally {
                Loading.handleLoading()
            }
        },
        view: () => {
            return m("div.flex flex-col max-w-full w-full min-h-full bg-charcoal-800 relative", [
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
                showModal && m(Overlay, { onclick: handleModal}, [m(NewSubTaskDialog, {onConfirm: handleAddSubTask})]),
                m(Fab, {onClick: handleModal, "data-test": "new-subtask-button"})
            ])
        }
    }
}

export default TaskDetails