import Block from '../../core/Block';
import './styles.scss';

type LinkProps = {
  href: string;
  styles: Record<string, string>;
  onClick: () => void;
};

export class Link extends Block {
  protected componentName = 'Link';

  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    });   
  }


  handleLinkClick = (evt: any) => {
    evt.preventDefault();
    this.props.onClick();
  };

  render() {
    return (
      `<a 
        href="{{href}}" 
        data-nav="nav" 
        ref="Link"
        styles="{{styles}}" 
        class="link link--{{variant}} {{class}}">
        {{content}}
      </a>`
    );
  }
}


