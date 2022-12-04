import template from './template.hbs';
import Component from '../../core/Component';

export default class ErrorPage extends Component {
  render() {
    return this.compile(template())
  }
}