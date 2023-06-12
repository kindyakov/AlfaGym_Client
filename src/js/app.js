import checkSupportWebP from "./modules/checkSupportWebP.js"
import ModalSimulator from "./modules/modalSimulator.js"
import ModalSubscription from "./modules/modalSubscription.js"
import burger from "./modules/burger.js"
import preloadImages from "./modules/preloadImages.js"
import { validateMailing } from "./modules/validate.js"
import { notification } from "./modules/notification.js"

checkSupportWebP()
preloadImages()
ModalSimulator()
ModalSubscription()
burger()

const footerWpSvg = document.querySelector('.footer__wp-svg')
const btnSvg = document.querySelector('.btn-svg')
const form_mailing = document.querySelector('#mailing')
const validateForm = validateMailing('#mailing')

const btnSvgClick = (isActive = true) => {
  if (!btnSvg.classList.contains('_active') && isActive) {
    footerWpSvg.classList.add('_active')
    btnSvg.classList.add('_active')
  } else {
    footerWpSvg.classList.remove('_active')
    btnSvg.classList.remove('_active')
  }
}

const submitMailing = (e) => {
  e.preventDefault()
  if (!validateForm.isValid) return
  notification('Cпасибо за подписку')
  validateForm.refresh()
  form_mailing.querySelector('input[name="email"]').value = ''
}

const handlerClick = (e) => {
  if (e.target.closest('.btn-svg')) {
    btnSvgClick()
  }
  if (!e.target.closest('.btn-svg') && !e.target.closest('.footer__wp-svg')) {
    btnSvgClick(false)
  }
}

form_mailing.addEventListener('submit', submitMailing)
document.addEventListener('click', handlerClick)