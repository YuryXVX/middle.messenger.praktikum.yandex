import { USER_DATA_MOCK } from "../../constants";
import Component from "../../core/Component";
import { pick } from "../../utils/objects-utils";
import template from './template.hbs';

export default class ChangePasswordPage extends Component {
  render() {
    return this.compile(template(pick(USER_DATA_MOCK, ['password', 'avatar'])))
  }
}