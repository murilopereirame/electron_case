import * as m from 'mithril'
import Navbar from "../components/Navbar";
import Fab from "../components/Fab";

const TaskList  = {
    view: function () {
        return m(".flex flex-column w-full h-full bg-charcoal-800 relative", [
            m(Navbar),
            m(Fab, {onClick: () => alert("Hi!") })
        ])
    }
}

export default TaskList