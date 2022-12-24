import Block from '../../core/Block';
import { Validator } from '../form-validator';
import { omit } from '../objects-utils';

export class FormUiValidator {
  validator = Validator as typeof Validator;
  
  controlsValid = {} as Record<string, {
    value: string, valid: boolean
  }>;

  onCheck = (
    { valid, value, formName }: { name: string, valid: boolean, value: string; formName: string },
  ) => {
    this.controlsValid[formName] = { valid, value };
  };

  vaidateOnSubmit(refs: Record<string, Block>) {
    return Validator.vaidateOnSubmit(omit(refs, ['button']), this.getFormData()); 
  }

  getFormData() {
    return Object.keys(this.controlsValid)
      .reduce((payload, key) => ({ ...payload, [key]: this.controlsValid[key].value }), {});
  }
}
