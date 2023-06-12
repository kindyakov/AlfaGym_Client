import simulator from "./modalHtml.js"
import { validateSimulator } from "./validate.js"
import { notification } from "./notification.js"
import Inputmask from "inputmask"
import { sendMessage } from "./request.js"

const ModalSimulator = () => {
  const html = document.querySelector('html')
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal-simulator')
  const modal_wrapper = modal.querySelector('.modal__wrapper')
  const loader = document.querySelector('.loader')

  const open = () => {
    modal.classList.add('_active')
    scrollLock()
  }

  const close = () => {
    modal.classList.remove('_active')
    scrollLock(false)
    setTimeout(() => modal_wrapper.innerHTML = simulator['Default'], 200)
  }

  const scrollLock = (isLock = true) => {
    if (isLock) {
      // html.classList.add('_lock')
      body.classList.add('_lock')
      // Disable scrolling.
      // document.ontouchmove = e => e.preventDefault()
    } else {
      html.classList.remove('_lock')
      body.classList.remove('_lock')
      // Enable scrolling.
      // document.ontouchmove = (e) => true
    }
  }

  const handlerBox = (box) => {
    const type = box.dataset.type
    modal_wrapper.innerHTML = simulator[type]
  }

  const handlerForm = (e) => {
    const box_content = e.target.closest('.trainer__box-content')
    const [name, price] = box_content.dataset.simulator.split(',')
    modal_wrapper.innerHTML = simulator['formSimulator']

    submit()

    const input_simulator = modal_wrapper.querySelector('input[name="simulator"]')
    const input_price = modal_wrapper.querySelector('input[name="price"]')
    input_simulator.value = name
    input_price.value = price + ' ₽/месяц'

  }

  const reauestMessage = async (data, rout) => {
    try {
      const response = await sendMessage(data, rout);
      loader.classList.remove('_active')

      if (response.ok) {
        close()
        notification('✔ Заявка обработана')
      } else { }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }

  const createFormData = (form) => {
    const formData = new FormData(form)
    const unmaskPhone = Inputmask.default.unmask(formData.get('phone'), { mask: "+7 (999) 999-99-99" })
    formData.set('phone', `7${unmaskPhone}`)
    return Array.from(formData)
  }

  const createData = (array) => {
    let data = {}
    array.forEach(arr => {
      data[arr[0]] = arr[1]
    });
    return data
  }

  const submit = () => {
    const validateForm = validateSimulator('#rent-simulator')
    const form = modal_wrapper.querySelector("#rent-simulator")

    form.addEventListener('submit', () => {
      if (!validateForm.isValid) return
      const formData = createFormData(form)
      const data = createData(formData)
      loader.classList.add('_active')

      if (data.messenger === 'whatsapp') {
        reauestMessage(data, 'whatsapp/simulator')
      } else if (data.messenger === 'telegram') {
        reauestMessage(data, 'telegram/simulator')
      }
    })
  }

  const handlerClick = e => {
    if (e.target.closest('.services__button')) {
      e.preventDefault()
      open()
    }
    if (e.target.closest('.modal__close') || e.target.classList.contains('modal__content')) {
      close()
    }
    if (e.target.closest('.modal__box')) {
      handlerBox(e.target.closest('.modal__box'))
    }
    if (e.target.closest('.back')) {
      modal_wrapper.innerHTML = simulator['Default']
    }
    if (e.target.closest('.trainer__btn-rent')) {
      handlerForm(e)
    }
  }

  window.addEventListener('click', handlerClick)
  window.addEventListener('keyup', e => e.key == 'Escape' && close())
}

export default ModalSimulator