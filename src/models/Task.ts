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
    addTask: (task: ITask) => Promise<boolean>,
}


const Task: TTask = {
    list: [],
    addTask: async (task: ITask) => {
        const result: IResponse = await m.request({
            url: `${process.env.BASE_URL}/tasks/new`,
            method: "POST",
            body: task,
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            }
        })

        Task.list.push(result.data)

        return true
    },
    loadList: async () => {
        const result: IResponse = await m.request({
            url: `${process.env.BASE_URL}/tasks/list`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            }
        })

        Task.list = result.data
    },
}

export default Task;