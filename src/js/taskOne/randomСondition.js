/**
 *
 * @param lastCell последняя ячейка гоблина
 * @param boardSize размер игрового поля
 * @returns возвращает рандомный индекс для ячейки
 */
export default function randomСondition(lastCell, boardSize) {
  const rand = () => {
    // рандомим число от 0 до максимально допустимого
    const random = Math.floor(Math.random() * (boardSize ** 2));

    // если рандом совпадает с последней ячейкой, то перезапускаем rand
    if (random === lastCell) { return rand(); }

    return random; // возвращаем число в rand не равное lastCell
  };

  return rand(); // возвраащем новое рандомно допустимое число
}
