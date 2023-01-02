// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { faker } from '@faker-js/faker';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='filterable-list'>
    <h2>A Filterable List</h2>
    <input type='text' data-query='' placeholder='Search for names'>
    <ul data-list=''></ul>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create Class
class App {
  constructor() {
    this.DOM = {
      input: document.querySelector('[data-query]'),
      list: document.querySelector('[data-list]'),
    };

    this.PROPS = {
      users: [],
    };

    this.renderHTML(this.PROPS.users);

    this.DOM.input.addEventListener('keyup', this.onInput);
  }

  /**
   * @function onInput - Input change handler
   * @param value
   */
  onInput = ({ target: { value } }) => {
    if (value.trim().length === 0) {
      document.querySelectorAll('[data-name]').forEach(name => name.parentElement.style.display = 'flex');
    }
    setTimeout(() => {
      document.querySelectorAll('[data-name]').forEach(name => {
        name.parentElement.style.display = name.textContent
          .toLowerCase()
          .indexOf(value.toLowerCase()) > -1 ? 'flex' : 'none';
      });
    }, 100);
  };

  /**
   * @function renderHTML - Render HTML
   */
  renderHTML = () => {
    Array.from({ length: 100 }).forEach(() => this.PROPS.users.push(faker.name.findName()));
    this.DOM.list.innerHTML = `${this.PROPS.users.sort().map(user => `<li><span data-name=''>${user}</span> <span>(${user[0]})</span></li>`).join('')}`;
  };
}

// ⚡️Class instance
new App();
