import ChatAPI from './api/ChatAPI';

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
    this.ws = null;
    this.host = null;
    this.chatData = [];
  }

  init() {
    this.registerEvents();
    this.showLoginForm();
  }

  loginSubmit() {
    const loginForm = document.querySelector('form.modal__content');
    loginForm.addEventListener('submit', this.showChatForm);
    loginForm.addEventListener('submit', this.onLoginChatHandler.bind(this));
  }

  drawChatHandler(evt) {
    this.onEnterChatHandler(JSON.parse(evt.data));
  }

  showLoginForm() {
    function createLoginForm() {
      const div = document.createElement('div');

      const formString = `<form class="modal__content" novalidate>
      <div class="modal__header  ">
        <label class="form__label" for="login">Выберете псевдоним</label>
      </div>
      <div class="modal__body ">
        <input name="login" id="login" class="form__input" type="text"required autofocus>
      </div>
      <div class="modal__footer">
        <button type="submit" class="modal__ok">Продолжить</button>
        <button type="reset" class="modal__close">Закрыть</button>
      </div>
      <div class="error hidden">
      <div class="form__hint">
       awcawcaw
      </div>
    </div>
      </form>`;

      div.innerHTML = formString.trim();

      return div.firstChild;
    }

    this.bindToDOM(createLoginForm());
    this.loginSubmit();
  }

  showChatForm() {
    function createChatForm() {
      const div = document.createElement('div');

      const formString = `<div class="container hidden">
      <div class="chat__container">
        <div class="  chat__userlist">
          <div class="chat__connect">
           
          </div>
        </div>
        <div class = "chat__area">
        <button class ="chat__close" type="reset">Close</button>
          <div class=" chat__messages-container">
            <div class="message__container message__container-interlocutor">
    
            </div>
            <div class="message__container message__container-yourself">
             
            </div>
    
          </div>
          <div class="chat__messages-input">
            <form class=".form form__group" novalidate>
              <input type="text" class="form message__input" placeholder="Type your message here">
            </form>
          </div>
        </div>
    
      </div>
      </div>`;
      div.innerHTML = formString.trim();
      return div.firstChild;
    }

    this.bindToDOM(createChatForm());
  }

  renderChat(chatData) {
    this.usersId = [];
    function camposeDate(timestamp) {
      const stamp = new Date(timestamp);
      const dateStamp = stamp.getDate() < 10 ? `0${stamp.getDate()}` : stamp.getDate();
      const mounth = stamp.getMonth() < 10 ? `0${stamp.getMonth()}` : stamp.getMonth();
      const yearStamp = String(stamp.getFullYear())[0] + String(stamp.getFullYear())[1];
      const taskDate = `${dateStamp}.${mounth}.${yearStamp}`;
      return taskDate;
    }
    function camposeTime(timestamp) {
      const stamp = new Date(timestamp);
      const hours = stamp.getHours() < 10 ? `0${stamp.getHours()}` : stamp.getHours();
      const min = stamp.getMinutes() < 10 ? `0${stamp.getMinutes()}` : stamp.getMinutes();
      const taskTime = `${hours}:${min}`;
      return taskTime;
    }
    function deletePreviosChat(parent) {
      while (parent.firstChild) {
        parent.firstChild.remove();
      }
    }
    const chatMembers = document.querySelector('div.chat__connect');
    const messageInt = document.querySelector('div.message__container-interlocutor');
    const messageHost = document.querySelector('div.message__container-yourself');
    const div = document.createElement('div');

    if (Array.isArray(chatData)) {
      deletePreviosChat(chatMembers);
      deletePreviosChat(messageInt);
      deletePreviosChat(messageHost);

      chatData.forEach((element) => {
        if (!this.usersId.includes(element.id)) {
          if (element.host) {
            const formString = `<div class="chat__user message__container-host">
            ${element.name}
            </div>`;
            div.innerHTML = formString.trim();
          } else {
            const formString = `<div class="chat__user">
          ${element.name}
        </div>`;
            div.innerHTML = formString.trim();
          }
          this.usersId.push(element.id);
          chatMembers.appendChild(div.firstChild);
        }
      });
      chatData.forEach((element) => {
        // const div = document.createElement('div');
        if (element.message) {
          if (element.host) {
            const formString = `<div class="message">
                <div class="message__header message__container-yourself ">
                <span class="messageAuthor"> ${element.name}, </span>
                <span class="messageDate">
                  <span class="date">${camposeDate(element.created)}</span>
                  <span class="time">${camposeTime(element.created)}</span>
                </span>  
                </div>
                <div class="messageText">
                  ${element.message}
                </div>
              </div>`;
            div.innerHTML = formString.trim();
            messageHost.appendChild(div.firstChild);
          } else {
            const formString = `<div class="message">
          <div class="message__header">
          <span class="messageAuthor"> ${element.name}, </span>
          <span class="messageDate">
            <span class="date">${camposeDate(element.created)}</span>
            <span class="time">${camposeTime(element.created)}</span>
          </span>  
          </div>
          <div class="messageText">
            ${element.message}
          </div>
        </div>`;
            div.innerHTML = formString.trim();
            messageInt.appendChild(div.firstChild);
          }
        }
      });
    } else if (typeof chatData === 'object') {
      // const div = document.createElement('div');
      if (!this.usersId.includes(chatData.id)) {
        if (chatData.host) {
          const formString = `<div class="chat__user message__container-host
          ">
          ${chatData.name}
        </div>`;
          div.innerHTML = formString.trim();
        } else {
          const formString = `<div class="chat__user">
          ${chatData.name}
        </div>`;
          div.innerHTML = formString.trim();
        }
      }
      if (chatData.message) {
        // const div = document.createElement('div');
        if (chatData.host) {
          const formString = `<div class="message">
                  <div class="message__header message__container-yourself ">
                  <span class="messageAuthor"> ${chatData.name}, </span>
                  <span class="messageDate">
                    <span class="date">${camposeDate(chatData.created)}</span>
                    <span class="time">${camposeTime(chatData.created)}</span>
                  </span>  
                  </div>
                  <div class="messageText">
                    ${chatData.message}
                  </div>
                </div>`;
          div.innerHTML = formString.trim();
          messageHost.appendChild(div.firstChild);
        } else {
          const formString = `<div class="message">
            <div class="message__header">
            <span class="messageAuthor"> ${chatData.name}, </span>
            <span class="messageDate">
              <span class="date">${camposeDate(chatData.created)}</span>
              <span class="time">${camposeTime(chatData.created)}</span>
            </span>  
            </div>
            <div class="messageText">
              ${chatData.message}
            </div>
          </div>`;
          div.innerHTML = formString.trim();
          messageInt.appendChild(div.firstChild);
        }
      }
    }
  }

  onEnterChatHandler(chatData) {
    const loginForm = document.querySelector('form.modal__content');
    const chatForm = document.querySelector('div.container');
    this.renderChat(chatData);
    loginForm.classList.add('hidden');
    chatForm.classList.remove('hidden');

    const messageForm = document.querySelector('form.form__group');

    messageForm.addEventListener('submit', this.sendMessage);

    this.ws.removeEventListener('message', this.drawChatHandler);
    const closeForm = document.querySelector('button.chat__close');

    closeForm.addEventListener('click', this.exitChat);
  }

  onLoginChatHandler(e) {
    e.preventDefault();
    const loginInput = document.querySelector('input.form__input');
    const loginAttempt = async () => {
      const api = new ChatAPI('http://localhost:3000');
      const response = await api.create(loginInput.value);
      return response;
    };
    loginAttempt()
      .then((response) => {
        if (response.status === 'error') {
          const loginError = document.querySelector('div.error');
          const errorHint = document.querySelector('div.form__hint');
          loginError.classList.remove('hidden');
          errorHint.textContent = response.message;
        }
        if (response.status === 'ok') {
          this.host = response.user;
          this.ws = new WebSocket('ws://localhost:3000/ws');
          this.ws.addEventListener('message', this.drawChatHandler);
        }
      })
      .catch((err) => {
        console.error('Произошла ошибка: ', err);
      });
  }

  sendMessage(e) {
    e.preventDefault();
    const messageInput = document.querySelector('input.message__input');

    const msg = {
      id: this.host.id,
      name: this.host.name,
      host: true,
      message: messageInput.value,
      created: new Date(Date.now()),
      type: 'send',
    };
    this.ws.send(JSON.stringify(msg));
    this.ws.addEventListener('message', (evt) => {
      this.renderChat((JSON.parse(evt.data)));
    });
    messageInput.value = '';
  }

  exitChat(e) {
    e.preventDefault();
    const messageForm = document.querySelector('form.form__group');
    const msg = {
      id: this.host.id,
      name: this.host.name,
      host: true,
      message: '',
      created: new Date(Date.now()),
      type: 'exit',
    };
    this.ws.send(JSON.stringify(msg));
    this.ws.addEventListener('message', (evt) => {
      this.renderChat((JSON.parse(evt.data)));
    });
    messageForm.reset();
    this.ws.close();
  }

  messageSubmit() {
    const messageForm = document.querySelector('form.form__group');

    messageForm.addEventListener('submit', this.sendMessage);
  }

  bindToDOM(element) {
    this.container.appendChild(element);
  }

  registerEvents() {
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showChatForm = this.showChatForm.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.onEnterChatHandler = this.onEnterChatHandler.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.drawChatHandler = this.drawChatHandler.bind(this);
    this.exitChat = this.exitChat.bind(this);
  }
}
