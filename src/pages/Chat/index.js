import template from './template.hbs';
import Component from "../../core/Component";
import './styles.scss';

export default class ChatPage extends Component {
  render() {
    return this.compile(template());
  }
} 