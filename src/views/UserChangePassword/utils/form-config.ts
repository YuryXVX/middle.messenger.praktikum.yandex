export const fields = [
  { 
    placeholder: 'Старый пароль',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
    formName: 'oldPassword',
  },
  { 
    placeholder: 'Новый Пароль',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
    formName: 'newPassword',
  },
  { 
    placeholder: 'Повторите новый пароль',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
    formName: 'newPasswordRepeat',
  }, 
];
