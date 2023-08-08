import TaskList from "./views/TaskList"
import './styles.css'
import TaskDetails from "./views/TaskDetails";
import Login from "./views/Login";
import Auth from "./models/Auth";
import Container from "./components/Container";

import m from 'mithril'
import Register from "./views/Register";


const ROUTE_TYPES = {
    AUTH: "auth",
    PROTECTED: "protected"
}

const guard = (screen, type: string): any => {
    const component = {view: (node) => m(Container, m(screen, node.attrs))}

    return {
        onmatch: () => {
            if(type === ROUTE_TYPES.PROTECTED) {
                if(Auth.isLogged())
                    return component

                m.route.set('/login')
            } else if(type === ROUTE_TYPES.AUTH) {
                if(!Auth.isLogged())
                    return component

                m.route.set('/')
            }

            m.route.SKIP
        }
    }
}

m.route(document.body, "/", {
    "/task/:id": guard(TaskDetails, ROUTE_TYPES.PROTECTED),
    "/login": guard(Login, ROUTE_TYPES.AUTH),
    "/register": guard(Register, ROUTE_TYPES.AUTH),
    "/": guard(TaskList, ROUTE_TYPES.PROTECTED)
})