import Block from '../../core/Block';
import './styles.scss';


export class Link extends Block {
  protected componentName = 'Link';

  render() {
    return (
      `<a 
        href="{{href}}" 
        data-nav="nav" 
        styles="{{styles}}" 
        class="link link--{{variant}} {{class}}">
        {{content}}
      </a>`
    );
  }
}


