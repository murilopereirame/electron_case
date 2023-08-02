import * as m from "mithril";
import TaskList from "./views/TaskList"
import './styles.css'
import TaskDetails from "./views/TaskDetails";
import Login from "./views/Login";
import Auth from "./models/Auth";

const ROUTE_TYPES = {
    AUTH: "auth",
    PROTECTED: "protected"
}

const guard = (component, type: string) => {
    if(Auth.isLogged()) {
        if(type === ROUTE_TYPES.PROTECTED) {
            return component
        } else {
            return m.route.set("/", null, {replace: true})
        }
    }

    return m.route.set('/login', null, {replace: true})
}


m.route(document.body, "/", {
    "/task/:id": guard(TaskDetails, ROUTE_TYPES.PROTECTED),
    "/login": guard(Login, ROUTE_TYPES.AUTH),
    "/": guard(TaskList, ROUTE_TYPES.PROTECTED)
})