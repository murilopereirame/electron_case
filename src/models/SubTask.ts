export interface ISubTask {
    id?: string
    content: string
    done: boolean
    taskId: string
}

export type TSubTask = {
    subtasks: ISubTask[]
    loadSubtasks: (taskId: string) => void
    addSubtask: (subtask: ISubTask) => boolean
    updateSubtask: (index: number, subtask: ISubTask) => void
}

const SubTask: TSubTask = {
    subtasks: [],
    loadSubtasks: (taskId: string) => {
        const taskListJSON = localStorage.getItem("subtasks") ?? "[]"
        const taskList = JSON.parse(taskListJSON)

        SubTask.subtasks = taskList.filter(subtask => subtask.taskId === taskId)
    },
    addSubtask: (subtask: ISubTask) => {
        const subTaskListJSON = localStorage.getItem("subtasks") ?? "[]"
        const subtaskList = JSON.parse(subTaskListJSON)
        subtaskList.push(subtask)
        SubTask.subtasks.push(subtask)
        localStorage.setItem("subtasks", JSON.stringify(subtaskList))

        return true
    },
    updateSubtask: (index: number, subtask: ISubTask) => {
        const subTaskListJSON = localStorage.getItem("subtasks") ?? "[]"
        const subtaskList = JSON.parse(subTaskListJSON)

        subtaskList[index] = subtask;

        SubTask.subtasks = subtaskList
        localStorage.setItem("subtasks", JSON.stringify(subtaskList))
    }
}

export default SubTask