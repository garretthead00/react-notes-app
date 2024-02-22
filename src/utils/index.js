import { notebooks } from "../data"
export const getNotebookData = (note) => {
    return notebooks.filter((notebook) => notebook.name === note.notebook)[0] || {}
}

export const getNotebookColor = (notebookName) => {
    return notebooks.filter((notebook) => notebook.name === notebookName)[0]?.color || ""
}