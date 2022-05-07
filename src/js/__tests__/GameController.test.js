/* eslint-disable no-console */
import GamePlay from '../taskOne/GamePlay';
import GameController from '../taskOne/GameController';
import SoundHit from '../taskOne/SoundHit';

jest.mock('../taskOne/GamePlay');
jest.mock('../taskOne/SoundHit');
beforeEach(() => { jest.resetAllMocks(); });

const gamePlay = new GamePlay();
// иммитация методов класса gamePlay
gamePlay.startGame.mockReturnValue(console.log('метод .gamePlay.startGame был вызван'));
gamePlay.cellActiveRemove.mockReturnValue(console.log('метод .gamePlay.cellActiveRemove был вызван'));
gamePlay.changeHit.mockReturnValue(console.log('метод .gamePlay.changeHit был вызван'));
gamePlay.changeMisses.mockReturnValue(console.log('метод .gamePlay.changeMisses был вызван'));
gamePlay.endGame.mockReturnValue(console.log('метод .gamePlay.endGame был вызван'));
gamePlay.cellActiveRemove.mockReturnValue(console.log('метод .gamePlay.cellActiveRemove был вызван'));
gamePlay.cellActiveAdd.mockReturnValue(console.log('метод .gamePlay.cellActiveAdd был вызван'));

// делаем заглушку на функцию SoundHit.play
SoundHit.play = jest.fn(() => console.log('метод .soundHit'));

test('test gameController.onNewGameClick()', () => {
  const expected = {
    turn: true,
    lastCell: false,
    hits: 0,
    misses: 0,
    gameStarted: true,
  };

  const gameController = new GameController(gamePlay); // создание класса GameController

  // делаем заглушку на функцию interval которая использует setInterval
  gameController.interval = jest.fn(() => console.log('метод .interval из onNewGameClick()'));
  gameController.onNewGameClick();

  const received = {
    turn: gameController.turn,
    lastCell: gameController.lastCell,
    hits: gameController.hits,
    misses: gameController.misses,
    gameStarted: gameController.gameStarted,
  };

  expect(received).toEqual(expected);
});

test.each([
  [1, true, true],
  [1, false, false],
  [6, true, false],
  [6, false, false],
])(
  ('test gameController.gameOver()'),
  (misses, gameStarted, expected) => {
    const gameController = new GameController(gamePlay);
    gameController.misses = misses;
    gameController.gameStarted = gameStarted;

    gameController.gameOver();

    const received = gameController.gameStarted;

    expect(received).toEqual(expected);
  },
);

test('test gameController.goblinAppeared()', () => {
  const expected = true;

  const gameController = new GameController(gamePlay); // создание класса GameController

  // делаем заглушку на функцию interval которая использует setInterval
  gameController.gameOver = jest.fn(() => console.log('метод .gameOver из goblinAppeared()'));
  gameController.goblinAppeared();

  const received = gameController.turn;

  expect(received).toEqual(expected);
});

test('test gameController.onCellClick() gameStarted = false', () => {
  const expected = undefined;

  const gameController = new GameController(gamePlay); // создание класса GameController
  gameController.gameStarted = false;

  const received = gameController.onCellClick(1);

  expect(received).toEqual(expected);
});

test('test gameController.onCellClick() lastCell === index', () => {
  const expected = {
    turn: false,
    hits: 6,
  };

  const gameController = new GameController(gamePlay); // создание класса GameController
  gameController.gameStarted = true;
  gameController.lastCell = 1;
  gameController.turn = true;
  gameController.hits = 5;

  gameController.onCellClick(1);

  const received = {
    turn: gameController.turn,
    hits: gameController.hits,
  };

  expect(received).toEqual(expected);
});

test('test gameController.onCellClick() lastCell !== index', () => {
  const expected = 3;

  const gameController = new GameController(gamePlay); // создание класса GameController
  gameController.gameStarted = true;
  gameController.lastCell = 1;
  gameController.misses = 2;

  gameController.onCellClick(2);

  const received = gameController.misses;

  expect(received).toEqual(expected);
});

test('test gameController.init()', () => {
  const expected = undefined;

  const gameController = new GameController(gamePlay); // создание класса GameController
  const received = gameController.init();

  expect(received).toEqual(expected);
});

test('test gameController.interval()', () => {
  const expected = undefined;

  global.setInterval = jest.fn();

  const gameController = new GameController(gamePlay); // создание класса GameController
  const received = gameController.interval();

  expect(received).toEqual(expected);
});
