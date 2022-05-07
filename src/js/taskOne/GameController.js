import SoundHit from './SoundHit';
import randomСondition from './randomСondition';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay; // класс который управляет DOM
    this.gameStarted = false; // индикатор начата игра или нет
    this.turn = true; // разрешён удар по гному или нет
  }

  init() {
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this)); // клик по кнопке новая игра
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this)); // клик по ячейкам
  }

  // кнопка новая игра
  onNewGameClick() {
    this.gamePlay.startGame(); // удалям окошко конца игры
    this.gamePlay.cellActiveRemove(this.lastCell); // удаляем гоблина
    this.lastCell = false; // последняя ячейка гнома
    this.hits = 0; // кол-во попаданий по голбину
    this.misses = 0; // кол-во промахов
    this.gameStarted = true; // идёт игра или нет

    this.gamePlay.changeHit(this.hits); // изменяем счётчик попаданий в DOM
    this.gamePlay.changeMisses(this.misses); // изменяем счётчик промахов в DOM

    this.interval(); // запускаем интервал
  }

  // клик по ячейкам
  onCellClick(index) {
    if (!this.gameStarted) { return; }
    if (this.lastCell === index && this.turn) {
      this.turn = false; // запрещаем удар по гному
      this.hits += 1; // увеличиваем сётчик попаданий
      this.gamePlay.changeHit(this.hits); // изменяем счётчик попаданий в DOM
      this.gamePlay.cellActiveRemove(this.lastCell); // удаляем гоблина
      SoundHit.play();
    }
    if (this.lastCell !== index) {
      this.misses += 1; // увеличиваем сётчик промахов
      this.gamePlay.changeMisses(this.misses); // изменяем счётчик промахов в DOM
    }
    this.gameOver(); // проверка на поражение
  }

  // рандомное появление гоблина
  goblinAppeared() {
    this.gamePlay.cellActiveRemove(this.lastCell); // удаляем гоблина
    this.lastCell = randomСondition(this.lastCell, this.gamePlay.boardSize); // новая ячейка
    this.gamePlay.cellActiveAdd(this.lastCell); // добавляем гоблина
    this.turn = true; // разрешаем удар по гному
  }

  // интервальное появление гоблина
  interval() {
    clearInterval(this.timerID); // очищаем интервал
    this.timerID = setInterval(this.goblinAppeared.bind(this), 1000); // запускам интервал
  }

  // проверка на поражение
  gameOver() {
    if (this.misses >= 5 && this.gameStarted) {
      this.gamePlay.endGame();
      this.gameStarted = false;
    }
  }
}
