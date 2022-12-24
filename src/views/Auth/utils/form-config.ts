export const fields = [
  { 
    placeholder: 'Логин',
    type: 'text',
    name: 'login',
    error: 'Только англ. буквы, символ _ и точка',
    validate: true,
    formName: 'login',
  },
  { 
    placeholder: 'Пароль',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
    formName: 'password',
  },
];