import Component from '../../core/Component';
import template from './template.hbs';

import { USER_DATA_MOCK } from '../../constants';
import { omit } from '../../utils/objects-utils';

export default class UserSettingsPage extends Component {
  render() {
    return this.compile(template(omit(USER_DATA_MOCK, ['password'])))
  }
}