import './styles.scss';
import Block from '../../core/Block';

type ButtonProps = {
  id: string;
  disabled: boolean;
  variant: string;
  onClick: () => void;
  events?: {
    click: () => void;
  }
};

export class Button extends Block<ButtonProps> {
  protected componentName = 'Button';

  constructor(props: ButtonProps) {
    super({
      ...props,
      variant: props.variant || 'main',
      events: {
        click: props.onClick,
      },
    });
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.getContent().removeAttribute('disabled');
    }
  }

  render() {
    return (
      `<button 
        data-id="{{id}}"
        disabled="{{disabled}}" 
        class='chat__button chat__button--{{variant}}'
      >
        {{content}}
      </button>`
    );
  }
}
