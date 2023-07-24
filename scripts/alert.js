export default class Alert {
  constructor(type, remove,  text) {
    this.alert = document.getElementById('alert')
    this.alertText = document.getElementById('alertText')
    this.closeButtonAlert = document.getElementById('closeButtonAlert')

    this.text = text
    this.type = type
    this.remove = remove

    this.closeAlert()
    this.setValues()

    this.alert.showModal()
  }

  closeAlert() {
    this.closeButtonAlert.onclick = () => this.alert.close()
  }

  setValues() {
    this.alert.classList.remove(this.remove)
    this.alert.classList.add(this.type)
    this.alertText.innerText = this.text
  }
}