/* eslint-disable no-console */
import HomeWorkMenu from './HomeWorkMenu';

const containerNav = document.getElementById('nav');
const containerTaskOne = document.getElementById('taskOne');
const containerTaskTwo = document.getElementById('taskTwo');

const homeWorkMenu = new HomeWorkMenu();

homeWorkMenu.bindToDOM(containerNav);
homeWorkMenu.bindTaskOneToDOM(containerTaskOne);
homeWorkMenu.bindTaskTwoToDOM(containerTaskTwo);

homeWorkMenu.drawUI();

console.log('app started');
