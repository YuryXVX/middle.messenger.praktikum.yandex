declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type FieldControl = { 
    placeholder: string;
    type: string;
    name: string;
    error: string;
    validate: boolean;
    formName: string;
  };

  export type UserDTO = {
    id: number,
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string,
    avatar: string;
  };

  export type UserSignUpDTO = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
    repeatPassword: string;
  };

  export type UserEntity = {
    id: number;
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
  };

  export type AppState = {
    user: UserEntity | null;
    auth: {
      login: string;
      password: string;
    }

    registration: UserSignUpDTO;

    reason: string;
    isLoading: boolean,

  };

  export type AnyLiteral = Record<string, any>;
}

export {};
