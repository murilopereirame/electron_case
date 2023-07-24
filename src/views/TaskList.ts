import * as m from 'mithril'
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";
import Checkbox from "../components/Checkbox";
import Task from "../models/Task";
import NewTaskDialog from "../dialogs/NewTaskDialog";
import Overlay from "../components/Overlay";

let showModal = false;

export const handleModal = () => {
    showModal = !showModal;
}

const TaskList = () => {
    return {
        oninit: Task.loadList,
        view: () => {
            return m(".flex flex-col max-w-full w-full h-full bg-charcoal-800 relative", [
                m(Navbar),
                m("div.flex flex-col mt-1", Task.list.map(task => m(Checkbox, {
                    id: `tsk-${task.id}`,
                    label: task.title,
                    checked: task.done,
                    href: `/task/${task.id}`,
                    disabled: true
                }))),
                showModal && m(Overlay, {onclick: handleModal}, [m(NewTaskDialog)]),
                m(Fab, {onClick: handleModal})
            ])
        }
    }
}

export default TaskList