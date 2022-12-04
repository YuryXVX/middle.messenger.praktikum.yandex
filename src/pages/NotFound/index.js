import Component from '../../core/Component';
import template from './template.hbs';

import './styles.scss';

export default class NotFoundPage extends Component {
  render() {
    return this.compile(template())
  }
}