import * as m from "mithril"
import SubTask from "./SubTask";

export interface ITask {
    id: string,
    done: boolean,
    title: string,
}

type TTask = {
    list: ITask[],
    loadTask: (taskId: string) => ITask | undefined,
    loadList: () => void,
    addTask: (task: ITask) => void,
    checkIsDone: (taskId: string) => void
    updateTask: (index: number, task: ITask) => void
}

const Task: TTask = {
    list: [],
    addTask: (task: ITask) => {
        const taskListJSON = localStorage.getItem("tasks") ?? "[]"
        const taskList = JSON.parse(taskListJSON)
        taskList.push(task)
        Task.list.push(task)
        localStorage.setItem("tasks", JSON.stringify(taskList))
    },
    loadTask: (taskId: string) => {
        Task.loadList()
        return Task.list.find(t => t.id === taskId)
    },
    loadList: () => {
        const taskListJSON = localStorage.getItem("tasks") ?? "[]"
        Task.list = JSON.parse(taskListJSON)
    },
    updateTask: (index: number, task: ITask) => {
        const taskListJSON = localStorage.getItem("tasks") ?? "[]"
        const taskList = JSON.parse(taskListJSON)

        taskList[index] = task;

        Task.list = taskList
        localStorage.setItem("tasks", JSON.stringify(taskList))
    },
    checkIsDone: (taskId: string) => {
        SubTask.loadSubtasks(taskId)
        const isDone = !SubTask.subtasks.some(subTask => !subTask.done)
        const index = Task.list.findIndex(task => task.id === taskId)

        Task.updateTask(index, {
            ...Task.list[index],
            done: isDone
        })
    }
}

export default Task;