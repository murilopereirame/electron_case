import * as m from "mithril";
import Auth, {IResponse} from "./Auth";
import {ITask, ITaskSubTasks} from "./Task";

export interface ISubTask {
    uuid?: string
    content: string
    done: boolean
    tasks_idtask: string
}

interface ITaskSubTaskResponse extends IResponse{
    details: ITask[],
    data: ISubTask[]
}

export type TSubTask = {
    subtasks: ISubTask[]
    loadSubtasks: (taskId: string) => Promise<ITaskSubTasks>
    addSubtask: (subtask: ISubTask) => Promise<IResponse>
    updateSubtask: (subtask: ISubTask) => Promise<IResponse>
}

const SubTask: TSubTask = {
    subtasks: [],
    loadSubtasks: async (taskId: string) => {
        const result: ITaskSubTaskResponse = await m.request({
            method: "GET",
            url: `https://spring.murilopereira.dev.br:8443/subtasks/list/${taskId}`,
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            },
        })

        SubTask.subtasks = result.data

        return {
            task: result.details[0],
            subtasks: result.data
        }
    },
    addSubtask: async (subtask: ISubTask) => {
        return await m.request({
            method: "POST",
            url: `https://spring.murilopereira.dev.br:8443/subtasks/new/${subtask.tasks_idtask}`,
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            },
            body: subtask
        })
    },
    updateSubtask: async (subtask: ISubTask) => {
        return await m.request({
            method: "PATCH",
            url: `https://spring.murilopereira.dev.br:8443/subtasks/update/${subtask.tasks_idtask}/${subtask.uuid}`,
            headers: {
                "Authorization": `Bearer ${Auth.getToken()}`
            },
            body: subtask
        })
    }
}

export default SubTask