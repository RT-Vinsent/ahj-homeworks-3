// import TaskOne from './taskOne/TaskOne';
import GamePlay from './taskOne/GamePlay';
import GameController from './taskOne/GameController';

export default class TaskMenu {
  constructor() {
    this.container = null; // для контейнера в DOM
    this.taskOneInited = false;
  }

  // присваиваем классу контейнер
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  bindTaskOneToDOM(containerTaskOne) {
    if (!(containerTaskOne instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.containerTaskOne = containerTaskOne;
  }

  // проверка на наличие контейнера
  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  // отрисовка HTML
  drawUI() {
    this.checkBinding();
    this.container.innerHTML = `
      <div class="controls">
        <button data-id="taskOne" class="btn">Задача № 1</button>
        <button data-id="taskTwo" class="btn">Задача № 2</button>
        <button data-id="taskFree" class="btn">Задача № 3</button>
      </div>
    `;

    this.taskOne = this.container.querySelector('[data-id=taskOne]'); // элемент Задача № 1
    this.taskTwo = this.container.querySelector('[data-id=taskTwo]'); // элемент Задача № 2
    this.taskFree = this.container.querySelector('[data-id=taskFree]'); // элемент Задача № 3

    this.taskOne.addEventListener('click', (event) => this.onTaskOneClick(event));
    this.taskTwo.addEventListener('click', (event) => this.ontaskTwoClick(event));
    this.taskFree.addEventListener('click', (event) => this.ontaskFreeClick(event));
  }

  onTaskOneClick(event) { // клик Задача № 1
    event.preventDefault();
    if (!this.taskOneInited) {
      this.taskOneInit();
    }
    if (this.taskOneInited) {
      this.taskOneClear();
    }

    this.taskOneInited = !this.taskOneInited;
  }

  taskOneInit() {
    this.gamePlay = new GamePlay(); // создаём класс управления DOM
    this.gamePlay.bindToDOM(this.containerTaskOne); // присваеваем ему div taskOne из DOM
    this.gamePlay.drawUI(); // отрисовываем HTML в DOM

    this.gameController = new GameController(this.gamePlay); // создаём класс логики
    this.gameController.init(); // инициализируем класс логики
  }

  taskOneClear() {
    this.gameController.gamePlay.clearHTML();
    this.gamePlay = '';
    this.gameController = '';
  }
}
