import './styles.scss';
import Block from '../../core/Block';

export class AvatarEdit extends Block {
  render() {
    return (`
      <div tabindex="-1">
        <div class="modal__overlay"></div>

        <div class="modal">
          <div class="modal__content">
            <div class="avatar-edit__modal">
              <h3>Загрузите файл</h3>

              <form class="avatar-edit__form">
                <input type="file" class="avatar-edit__input" />
                <button class="avatar-edit__button link">Выбрать файл</button>        
              </form>

              <div class="avatar-edit__save-button">
                {{> button content="Поменять" variant="main" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    `)
  }
}

// TODO необходимо сделать комонент potal и modal
