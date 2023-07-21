import * as m from "mithril"

export interface Task {
    done: boolean,
    title: string,
    subtasks: Array<String>
}

type TaskModel = {
    list: Task[],
    loadList: () => void,
    addTask: (task: Task) => void
}

const Task: TaskModel = {
    list: [],
    addTask: (task: Task) => {
        Task.list.push(task)
    },
    loadList: () => {
        Task.list = [
            {
                done: false,
                title: "Lista de compras",
                subtasks: []
            },
            {
                done: true,
                title: "Lavar a louça",
                subtasks: []
            },
            {
                done: true,
                title: "Comprar ração",
                subtasks: []
            }
        ]
        return
    }
}

export default Task;