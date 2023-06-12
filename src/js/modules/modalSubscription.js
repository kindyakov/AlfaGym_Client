import Inputmask from "inputmask"
import { validateSubscription } from "./validate.js"
import { notification } from "./notification.js"
import { sendMessage } from "./request.js"

const ModalSubscription = () => {
  const html = document.querySelector('html')
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal-subscription')
  const form = modal.querySelector('#subscription')
  const loader = document.querySelector('.loader')
  const validateForm = validateSubscription('#subscription')

  const open = () => {
    modal.classList.add('_active')
    scrollLock()
  }

  const close = () => {
    modal.classList.remove('_active')
    scrollLock(false)
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

  const addTarrif = (btn) => {
    const price_card = btn.closest('.price__card')
    const [tariff, price] = price_card.dataset.tariff.split(',');
    const input_tariff = form.querySelector('input[name="tariff"]')
    const input_price = form.querySelector('input[name="price"]')

    input_tariff.value = tariff
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


  const createFormData = () => {
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

  const submit = (e) => {
    if (!validateForm.isValid) return
    const formData = createFormData()
    const data = createData(formData)
    loader.classList.add('_active')

    if (data.messenger === 'whatsapp') {
      reauestMessage(data, 'whatsapp/tariff')
    } else if (data.messenger === 'telegram') {
      reauestMessage(data, 'telegram/tariff')
    }
  }

  const handlerClick = e => {
    if (e.target.closest('.price__button')) {
      const btn = e.target.closest('.price__button')
      addTarrif(btn)
      open(e)
    }
    if (e.target.closest('.modal__close') || e.target.classList.contains('modal__content')) {
      close()
    }
  }

  form.addEventListener('submit', submit)
  window.addEventListener('click', handlerClick)
  window.addEventListener('keyup', e => e.key == 'Escape' && close())
}

export default ModalSubscription