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
  };
}

export {};