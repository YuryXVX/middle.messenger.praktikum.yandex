import Block from '../../core/Block';
import './styles.scss';

type AvatarProps = {
  src: string;
  size: string;
  onClick?: () => void;
  events?: {
    click: AvatarProps['onClick'];
  }
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    })
  }

  render() {
    return (
      `<div 
        class="avatar"
        style="--size: ${this.props.size || 130}"
      >
        <img 
          src="{{src}}"   
          width="${this.props.size || 130}px"
          height="${this.props.size || 130}px"
          alt="аватар пользователя"
        />
      </div>
    `)
  }
}
