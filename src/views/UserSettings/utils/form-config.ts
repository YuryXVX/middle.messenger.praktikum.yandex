export const fields = [
  {
    placeholder: 'Почта',
    validate: true,
    name: 'email',
    type: 'email',
    error: 'Почта должна содержать @',
    formName: 'email',
  },
  {
    placeholder: 'Логин',
    validate: true,
    name: 'login',
    type: 'text',
    error: 'Только англ. буквы, символ _ и точка',
    formName: 'login',
  },
  {
    placeholder: 'Имя',
    validate: true,
    name: 'first_name',
    type: 'text',
    error: 'Имя должно начинаться с заглавной буквы',
    formName: 'firstName',
  },
  {
    placeholder: 'Фамилия',
    validate: true,
    name: 'second_name',
    type: 'text',
    error: 'Фамилия должна начинаться с заглавной буквы',
    formName: 'secondName',
  },
  {
    placeholder: 'Имя в чате',
    validate: true,
    name: 'сhat_name',
    type: 'text',
    error: 'Не может быть пустым',
    formName: 'chatName',
  },
  {
    placeholder: 'Телефон',
    validate: true,
    name: 'phone',
    type: 'phone',
    error: 'Телефон может начинаться с +7',
    formName: 'phone',
  },
];
