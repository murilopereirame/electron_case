import * as m from "mithril";
import TaskList from "./views/TaskList"
import './styles.css'
import TaskDetails from "./views/TaskDetails";

m.route(document.body, "/", {
    "/task/:id": TaskDetails,
    "/": TaskList
})