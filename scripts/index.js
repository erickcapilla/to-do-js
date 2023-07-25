import FormToDo from "./formToDo.js"
import Task from "./task.js"

document.addEventListener('DOMContentLoaded', () => {
  new FormToDo()
  const tasks = new Task()
  tasks.showTasks(tasks.getTasks())

  /* ***** Alert ***** */

  const closeButtonAlert = document.getElementById('closeButtonAlert')
  closeButtonAlert.onclick = () => alert.close()

  /*  ***** Modal ***** */

  const editModal = document.getElementById('modal')
  const closeModal = document.getElementById('closeModal')
  closeModal.onclick = () => editModal.close()
})