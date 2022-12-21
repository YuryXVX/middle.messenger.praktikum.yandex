import Block from '../../core/Block';
import './styles.scss';

type LinkProps = {
  href: string;
  variant: string;
  class?: string[]
  content: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super(props)
  }

  render() {
    return (
      `<a 
        href="{{href}}" 
        data-nav="nav" 
        styles="{{styles}}" 
        class="link link--{{variant}} {{class}}">
        {{content}}
      </a>`
    )
  }
}

