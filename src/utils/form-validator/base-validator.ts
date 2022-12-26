import Block from '../../core/Block';

export class Validator {
  static REG_EXP_FOR_NAME_AND_SURNAME = /^[A-Z]|[А-Я][A-Za-zА-Яа-я]+$/u;

  static rules = (rule: string): (value: string) => boolean => {
    const rules = {
      login: (value: string) => {
        if (value.length === 20) return isNaN(Number(value));

        return /^[0-9a-zA-Z._]{3,20}$/.test(value);
      },

      password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/.test(value),
      email: (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
      phone: (value: string) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
      ['first_name']: (value: string) => Validator.REG_EXP_FOR_NAME_AND_SURNAME.test(value),
      ['second_name']: (value: string) => Validator.REG_EXP_FOR_NAME_AND_SURNAME.test(value),

      isEmpty: (value: string) => value.trim() !== '',
    } as Record<string, (value: string) => boolean>;

    return rules[rule] ? rules[rule] : rules.isEmpty;
  };

  static vaidateOnSubmit(refs: Record<string, Block>, formData: Record<string, string>): boolean {
    const keyRefs = Object.keys(refs);
    const errors: boolean[] = [];

    for (const key of keyRefs) {
      const component = refs[key] as Block;
      const { value, name, dataset } = (component.refs.input.getContent() as HTMLInputElement);

      const validator = Validator.rules(name);

      if (!validator(value)) {
        if ('error' in dataset) {
          component.refs.hint.setState({
            errorMessage: dataset.error,
          });
        }
      }

      errors.push(validator(value));
    }

    return errors.every(valid => valid);
  }
}
