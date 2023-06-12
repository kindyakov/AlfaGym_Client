import Inputmask from "inputmask";
import JustValidate from "just-validate";

export const validateSimulator = (form) => {
  const forma = document.querySelector(form)
  const input_phone = forma.querySelector('input[name="phone"]')
  const validateForm = new JustValidate(form, {
    errorLabelStyle: {
      color: '#d31111',
      validateBeforeSubmitting: false,
    },
  });

  Inputmask.default("+7 (999) 999-99-99").mask(input_phone)

  validateForm
    .addField('input[name="name"]', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="phone"]', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      {
        validator: value => {
          const unmaskPhone = Inputmask.default.unmask(value, { mask: "+7 (999) 999-99-99" });
          return Boolean(Number(unmaskPhone) && unmaskPhone.length === 10)
        },
        errorMessage: 'Не верный формат',
      }
    ])
    .addField('select[name="messenger"]', [
      {
        rule: 'required',
        errorMessage: 'Выберете способ связи',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="privacy-policy"]', [
      {
        rule: 'required',
        errorMessage: '',
      },
    ])

  return validateForm
}

export const validateSubscription = (form) => {
  const forma = document.querySelector(form)
  const input_phone = forma.querySelector('input[name="phone"]')
  const validateForm = new JustValidate(form, {
    errorLabelStyle: {
      color: '#d31111',
      validateBeforeSubmitting: false,
    },
  });

  Inputmask.default("+7 (999) 999-99-99").mask(input_phone)

  validateForm
    .addField('input[name="name"]', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])
    .addField('input[name="phone"]', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      {
        validator: value => {
          const unmaskPhone = Inputmask.default.unmask(value, { mask: "+7 (999) 999-99-99" });
          return Boolean(Number(unmaskPhone) && unmaskPhone.length === 10)
        },
        errorMessage: 'Не верный формат',
      }
    ])
    .addField('select[name="messenger"]', [
      {
        rule: 'required',
        errorMessage: 'Выберете способ связи',
      },
      {
        rule: 'minLength',
        value: 0,
        errorMessage: 'Пустое поле',
      },
    ])

  return validateForm
}

export const validateMailing = (form) => {
  const validateForm = new JustValidate(form, {
    errorLabelStyle: {
      color: '#d31111',
      validateBeforeSubmitting: false,
    },
  });

  validateForm
    .addField('input[name="email"]', [
      {
        rule: 'required',
        errorMessage: 'Введите почту',
      },
      {
        rule: 'email',
        errorMessage: 'Не верный формат',
      },
    ])

  return validateForm
}