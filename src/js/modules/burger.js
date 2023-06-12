const burger = () => {
  const html = document.querySelector('html')
  const body = document.querySelector('body')
  const burger = document.querySelector('.header__burger')
  const header__nav = document.querySelector('.header__nav')
  const modal_simulator = document.querySelector('.modal-simulator')
  const modal_subscription = document.querySelector('.modal-subscription')

  const scrollLock = (isLock = true) => {
    if (isLock) {
      // html.classList.add('_lock')
      body.classList.add('_lock')
    } else {
      html.classList.remove('_lock')
      body.classList.remove('_lock')
    }
  }

  const burgerClick = (isActive = true) => {
    if (!burger.classList.contains('_active') && isActive) {
      scrollLock()
      burger.classList.add('_active')
      header__nav.classList.add('_active')
    } else {
      burger.classList.remove('_active')
      header__nav.classList.remove('_active')
      scrollLock(false)
    }
  }

  const handlerClick = e => {
    if (e.target.closest('.header__burger')) {
      burgerClick()
    }
    if (!modal_simulator.classList.contains('_active') &&
      !modal_subscription.classList.contains('_active')) {
      if (!e.target.closest('.header__burger') &&
        !e.target.closest('.header__nav')) {
        burgerClick(false)
      }
    }
  }

  document.addEventListener('click', handlerClick)
}

export default burger