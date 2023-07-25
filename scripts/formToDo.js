import Task from "./task.js"
import Alert from "./alert.js"

export default class FormToDo {
  constructor() {
    this.addButton = document.getElementById('addButton')
    this.formTitle = document.getElementById('formTitle')
    this.formDescription = document.getElementById('formDescription')

    this.addButton.onclick = (e) => {
      e.preventDefault()
      this.addTask()
    }
  }

  addTask() {
    if(!this.formTitle.value || !this.formDescription.value) {
      new Alert('danger', 'success', 'You may to set all data')
    } else {
      const task = new Task()
      task.addTask(this.formTitle.value, this.formDescription.value)
      this.formTitle.value= ''
      this.formDescription.value = ''
      new Alert('success', 'danger', 'Task added')
      task.showTasks(task.getTasks())
    }
  }
}