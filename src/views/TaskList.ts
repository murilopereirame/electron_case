import m from 'mithril'
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";
import Checkbox from "../components/Checkbox";
import Task from "../models/Task";
import NewTaskDialog from "../dialogs/NewTaskDialog";
import Overlay from "../components/Overlay";
import Loading from "../models/Loading";
import {handleError} from "../utils/ErrorHandler";

let showModal = false;

export const handleModal = () => {
    showModal = !showModal;
}

const TaskList = () => {
    return {
        oninit: async () => {
          try {
            Loading.handleLoading()
            await Task.loadList();
            document.title = "To Do"
          } catch (e: any) {
            handleError(e.code)
          } finally {
            Loading.handleLoading()
          }
        },
        view: () => {
            return m(".flex flex-col max-w-full w-full min-h-full bg-charcoal-800 relative", [
                m(Navbar),
                m("div.flex flex-col mt-1", [
                    m("ul", {id: "task-list"}, Task.list.map(task => m("li", m(
                            Checkbox, {
                            id: `tsk-${task.uuid}`,
                            label: task.title,
                            checked: task.done,
                            href: `#!/task/${task.uuid}`,
                            disabled: true
                        })))
                    )
                ]),
                showModal && m(Overlay, {onclick: handleModal}, [m(NewTaskDialog)]),
                m(Fab, {onClick: handleModal, "data-test": "new-task-button"})
            ])
        }
    }
}

export default TaskList