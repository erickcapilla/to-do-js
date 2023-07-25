import Alert from "./alert.js";

export default class Task {
  constructor() {
    this.id = this.getTasks().length

    this.filterTask()
    this.searchTasks()
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) ?? []
  }

  showTasks(tasks) {
    //tasks = this.filterTask() ?? this.getTasks()
    
    const list = document.getElementById('listTasks')
    list.innerHTML = ''
    tasks.forEach((task, i) => {
      const divDetails = document.createElement('div')
      divDetails.classList.add('details-task')
      const hTitle = document.createElement('h6')
      hTitle.classList.add('title')
      hTitle.innerText = task.title
      const pDescription = document.createElement('p')
      pDescription.classList.add('description')
      pDescription.innerText = task.description
      divDetails.appendChild(hTitle)
      divDetails.appendChild(pDescription)

      const hr = document.createElement('hr')

      const labelDone = document.createElement('label')
      labelDone.htmlFor = 'done'
      labelDone.innerText = 'Done'
      const inputDone = document.createElement('input')
      inputDone.type = 'checkbox'
      inputDone.name = 'done'
      inputDone.id = 'done'
      inputDone.checked = task.done
      const actionDone = document.createElement('div')
      actionDone.classList.add('action-done')
      actionDone.appendChild(labelDone)
      actionDone.appendChild(inputDone)

      const buttonEdit = document.createElement('button')
      buttonEdit.id = 'edit'
      buttonEdit.innerText = 'Edit'
      const buttonDelete = document.createElement('button')
      buttonDelete.id = 'delete'
      buttonDelete.innerText = 'Delete'
      const actionBtns = document.createElement('div')
      actionBtns.classList.add('actions-btns')
      actionBtns.appendChild(buttonEdit)
      actionBtns.appendChild(buttonDelete)

      const actionsTask = document.createElement('div')
      actionsTask.classList.add('actions-task')
      actionsTask.appendChild(actionDone)
      actionsTask.appendChild(actionBtns)

      const divCard = document.createElement('div')
      divCard.dataset.id = i
      divCard.classList.add('card')
      divCard.classList.add('card-task')
      divCard.appendChild(divDetails)
      divCard.appendChild(hr)
      divCard.appendChild(actionsTask)
      
      buttonEdit.onclick = () => this.openUpdateForm(divCard.dataset.id)
      buttonDelete.onclick = () => this.deleteTask(divCard.dataset.id)
      inputDone.onclick = () => this.onChecked(divCard.dataset.id, inputDone)

      list.appendChild(divCard)
      
    });
  }

  addTask(title, description) {
    let tasks = this.getTasks()
    tasks.push({
      id: this.id,
      title,
      description,
      done: false
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.id++
  }

  updateTask(id, modalUpdate) {
    const tasks = this.getTasks()

    const title = document.getElementById('modalTitle').value
    const description = document.getElementById('modalDescription').value
    const done = document.getElementById('modalCheckDone').checked

    if(!itle || !description) {
      new Alert('danger', 'success', 'You may to set all data')
    } else {
      tasks[id] = {
        title,
        description,
        done
      }
      localStorage.setItem('tasks', JSON.stringify(tasks))

      new Alert('success', 'danger', 'Task updated')

      modalUpdate.close()
      this.showTasks(tasks)
    }
  }

  onChecked(id, checkbox) {
    const tasks = this.getTasks()

    tasks[id].done = checkbox.checked

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  deleteTask(id) {
    const tasks = this.getTasks()

    tasks.splice(id, 1)

    localStorage.setItem('tasks', JSON.stringify(tasks))

    this.showTasks(tasks)
    new Alert('danger', 'success', 'Task deleted')
  }

  openUpdateForm(id) {
    const modalUpdate = document.getElementById('modal')
    const modalTitle = document.getElementById('modalTitle')
    const modalDescription = document.getElementById('modalDescription')
    const modalCheckDone = document.getElementById('modalCheckDone')
    const updateButton = document.getElementById('updateButton')

    const tasks = this.getTasks()

    modalTitle.value = tasks[id].title
    modalDescription.innerText = tasks[id].description
    modalCheckDone.checked = tasks[id].done

    modalUpdate.showModal()
    updateButton.onclick = (e) => {
      e.preventDefault()
      this.updateTask(id, modalUpdate)
    }
  }

  filterTask() {
    let newTasks
    
    const filters = document.querySelectorAll('input[name="filter"]')
    
    filters.forEach((filter) => {
      filter.addEventListener('change', () => {
        const tasks = this.getTasks()
        if(filter.value == 'all') {
          newTasks = [...tasks]
        }

        if(filter.value == 'done') {
          newTasks = tasks.filter((t) => t.done === true)
        }

        if(filter.value == 'noDone') {
          newTasks = tasks.filter((t) => t.done === false)
        }

        this.showTasks(newTasks)
      })
    })
  }

  searchTasks() {
    const tasks = this.getTasks()
    const searchInput = document.getElementById('search')
    let newTasks

    searchInput.addEventListener('input', () => {
      newTasks = tasks.filter((task) => {
        const title = task.title.toLowerCase()
        const description = task.description.toLowerCase()
        const keyword = searchInput.value.toLowerCase()

        return title.includes(keyword) || description.includes(keyword)
      })

      this.showTasks(newTasks)
    })
  }
}