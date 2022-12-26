import Block from '../../core/Block';
import './styles.scss';

export class ListItem extends Block {
  protected componentName = 'ListItem';

  render() {
    return (
      `<li class="list-item">
        <span>{{key}}</span>
        <span>{{value}}</span>
      </li>
    `);
  }
}
