export const fields: FieldControl[] = [
  {
    placeholder: 'Почта',
    validate: true,
    name: 'email',
    type: 'email',
    error: 'Почта должна содержать @'
  },
  {
    placeholder: 'Логин',
    validate: true,
    name: 'login',
    type: 'text',
    error: 'Только англ. буквы, символ _ и точка'
  },
  {
    placeholder: 'Имя',
    validate: true,
    name: 'first_name',
    type: 'text',
    error: 'Имя должно начинаться с заглавной буквы'
  },
  {
    placeholder: 'Фамилия',
    validate: true,
    name: 'second_name',
    type: 'text',
    error: 'Фамилия должна начинаться с заглавной буквы'
  },
  {
    placeholder: 'Телефон',
    validate: true,
    name: 'phone',
    type: 'phone',
    error: 'Телефон может начинаться с +7'
  },
  { 
    placeholder: 'Пароль',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
  },
  { 
    placeholder: 'Пароль (еще раз)',
    type: 'password',
    name: 'password',
    error: 'Мин. 8 - Макс. 40 символов, обязательно заглавная буква и цифра',
    validate: true,
  }
];