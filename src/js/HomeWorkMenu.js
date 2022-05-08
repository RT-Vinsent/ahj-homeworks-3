// import TaskOne from './taskOne/TaskOne';
import GamePlay from './taskOne/GamePlay';
import GameController from './taskOne/GameController';
import TopTasksPlay from './taskTwo/TopTasksPlay';
import TopTasksControl from './taskTwo/TopTasksControl';

export default class HomeWorkMenu {
  constructor() {
    this.container = null; // для контейнера в DOM
    this.taskOneInited = false;
    this.taskTwoInited = false;
  }

  static checkContainer(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
  }

  // присваиваем классу контейнер
  bindToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.container = container;
  }

  bindTaskOneToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.containerTaskOne = container;
  }

  bindTaskTwoToDOM(container) {
    HomeWorkMenu.checkContainer(container);
    this.containerTaskTwo = container;
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
    this.taskTwo.addEventListener('click', (event) => this.onTaskTwoClick(event));
    this.taskFree.addEventListener('click', (event) => this.onTaskFreeClick(event));
  }

  // клик Задача № 1
  onTaskOneClick(event) {
    event.preventDefault();

    if (this.taskOneInited) { this.taskOneRemove(); } // удаление Задачи № 1
    if (this.taskTwoInited) { this.taskTwoRemove(); } // удаление Задачи № 2

    if (!this.taskOneInited) { this.taskOneInit(); } // инициализация Задачи № 1

    this.taskOneInited = !this.taskOneInited; // состояние задачи № 1
    this.taskTwoInited = false; // состояние задачи № 2
  }

  // клик Задача № 2
  onTaskTwoClick(event) {
    event.preventDefault();

    if (this.taskOneInited) { this.taskOneRemove(); } // удаление Задачи № 1
    if (this.taskTwoInited) { this.taskTwoRemove(); } // удаление Задачи № 2

    if (!this.taskTwoInited) { this.taskTwoInit(); } // инициализация Задачи № 2

    this.taskOneInited = false; // состояние задачи № 1
    this.taskTwoInited = !this.taskTwoInited; // состояние задачи № 2
  }

  // создание Задачи № 1
  taskOneInit() {
    this.gamePlay = new GamePlay(); // создаём класс управления DOM
    this.gamePlay.bindToDOM(this.containerTaskOne); // присваеваем ему div taskOne из DOM
    this.gamePlay.drawUI(); // отрисовываем HTML в DOM

    this.gameController = new GameController(this.gamePlay); // создаём класс логики
    this.gameController.init(); // инициализируем класс логики
  }

  // создание Задачи № 2
  taskTwoInit() {
    this.topTasksPlay = new TopTasksPlay(); // создаём класс управления DOM
    this.topTasksPlay.bindToDOM(this.containerTaskTwo); // присваеваем ему div taskTwo из DOM
    this.topTasksPlay.drawUI(); // отрисовываем HTML в DOM

    this.TopTasksControl = new TopTasksControl(this.topTasksPlay); // создаём класс логики
    this.TopTasksControl.init(); // инициализируем класс логики
  }

  // удаление Задачи № 1
  taskOneRemove() {
    this.gameController.gamePlay.clearHTML();
    this.gamePlay = '';
    this.gameController = '';
  }

  // удаление Задачи № 2
  taskTwoRemove() {
    this.TopTasksControl.topTasksPlay.clearHTML();
    this.topTasksPlay = '';
    this.TopTasksControl = '';
  }
}
