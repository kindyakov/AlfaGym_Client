export const notification = (str) => {
  const notification = document.querySelector('.notification')
  const span = notification.querySelector('span')
  span.textContent = str
  notification.classList.add('_active')
  setTimeout(() => { notification.classList.remove('_active') }, 3000)
}