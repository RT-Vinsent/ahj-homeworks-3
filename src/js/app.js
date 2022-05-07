/* eslint-disable no-console */
import TaskMenu from './TaskMenu';

const containerNav = document.getElementById('nav');
const containerTaskOne = document.getElementById('taskOne');

const taskMenu = new TaskMenu();

taskMenu.bindToDOM(containerNav);
taskMenu.bindTaskOneToDOM(containerTaskOne);

taskMenu.drawUI();

console.log('app started');
