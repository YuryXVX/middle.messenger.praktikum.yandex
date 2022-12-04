import Component from '../../core/Component';
import template from './template.hbs';
import './styles.scss';

import { USER_DATA_MOCK } from '../../constants';

export default class UserPage extends Component {
  render() {   
    return this.compile(template(USER_DATA_MOCK))
  }
}