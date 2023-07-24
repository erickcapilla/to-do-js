import FormToDo from "./formToDo.js"
import Task from "./task.js";

document.addEventListener('DOMContentLoaded', () => {
  new FormToDo()
  new Task().showTasks()

  /* ***** Alert ***** */

  const closeButtonAlert = document.getElementById('closeButtonAlert')
  closeButtonAlert.onclick = () => alert.close()

  /*  ***** Modal ***** */

  const editModal = document.getElementById('modal')
  const closeModal = document.getElementById('closeModal')
  closeModal.onclick = () => editModal.close()
})