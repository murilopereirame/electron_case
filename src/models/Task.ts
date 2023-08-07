import * as m from "mithril"
import SubTask, {ISubTask} from "./SubTask";
import Auth, {IResponse} from "./Auth";
import Loading from './Loading'
import Notification from "./Notification";
import {EToast} from "../components/Toast";

export interface ITask {
    uuid?: string,
    done: boolean,
    title: string,
}

export interface ITaskSubTasks {
    task: ITask,
    subtasks: ISubTask[]
}

interface ITaskDetailsResponse extends IResponse {
    data: ITask
}

type TTask = {
    list: ITask[],
    loadList: () => void,
    addTask: (task: ITask) => void,
    updateTask: (index: number, task: ITask) => void
}


const Task: TTask = {
    list: [],
    addTask: (task: ITask) => {
        m.request({
            url: "https://spring.murilopereira.dev.br:8443/tasks/new",
            method: "POST",
            body: task,
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            }
        }).then((result: any) => {
            Task.list.push(result.data)
        }).catch((e) => {
            switch(e.code) {
                case 401:
                    Notification.show(
                      "User not authenticated",
                      EToast.ERROR
                    )
                    break;
                default:
                    Notification.show(
                      "Sorry, we are unable to process your request at this moment =(",
                      EToast.ERROR
                    )
                    break;
            }
        })
    },
    loadList: async () => {
        try {
            const result: IResponse = await m.request({
                url: "https://spring.murilopereira.dev.br:8443/tasks/list",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            })
            Task.list = result.data
        } catch(e: any) {
            switch(e.code) {
                case 401:
                    Notification.show(
                      "User not authenticated",
                      EToast.ERROR
                    )
                    break;
                default:
                    Notification.show(
                      "Sorry, we are unable to process your request at this moment =(",
                      EToast.ERROR
                    )
                    break;
            }
        }
    },

    updateTask: (index: number, task: ITask) => {
        const taskListJSON = localStorage.getItem("tasks") ?? "[]"
        const taskList = JSON.parse(taskListJSON)

        taskList[index] = task;

        Task.list = taskList
        localStorage.setItem("tasks", JSON.stringify(taskList))
    },
}

export default Task;