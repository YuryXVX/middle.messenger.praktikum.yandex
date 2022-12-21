import Block from '../../core/Block';
import './styles.scss'

type ListItemProps = {
  key: string;
  value: string;
}

export  class ListItem extends Block {
  constructor(props: ListItemProps) {
    super(props)
  }

  render() {
    return (
      `<li class="list-item">
        <span>{{key}}</span>
        <span>{{value}}</span>
      </li>
    `)
  }
}
