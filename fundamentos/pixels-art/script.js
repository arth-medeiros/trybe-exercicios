const pixelParent = document.querySelector('#pixel-board');
const paletteList = document.querySelectorAll('.color');
let pixelList = document.querySelectorAll('.pixel');
const sizeInput = document.querySelector('#board-size');
const colorList = ['Red', 'Cyan', 'Blue', 'DarkBlue', 'LightBlue', 'Purple', 'Yellow', 'Lime',
  'Magenta', 'Pink', 'Gray', 'Orange', 'Brown', 'Maroon', 'Green', 'Olive', 'Aquamarine'];
const vqvButton = document.querySelector('#generate-board');
const buttonClear = document.querySelector('#clear-board');

function selectColor(origin) {
  document.querySelector('.selected').classList.remove('selected');
  origin.target.classList.add('selected');
}

function paintPixel(origin) {
  const selectedColor = document.querySelector('.selected');
  const selectColorValue = window.getComputedStyle(selectedColor, null);
  const clickedPixel = origin.target;
  clickedPixel.style.backgroundColor = selectColorValue.getPropertyValue('background-color');
}

function clearBoard() {
  pixelList = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelList.length; i += 1) {
    pixelList[i].style.backgroundColor = 'white';
  }
}

function checkIfValid() {
  if (sizeInput.value === '') {
    return false;
  }
  return true;
}

function deleteOldGrid() {
  pixelList = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelList.length; i += 1) {
    pixelParent.removeChild(pixelList[i]);
  }
}

function concatenateArray(array) {
  return array.join(' ');
}

function checkSize(value) {
  let number = value;
  if (number < 5) {
    number = 5;
    return number;
  }
  if (number > 50) {
    number = 50;
    return number;
  }
  return number;
}

function getGridSize() {
  let gridSize = sizeInput.value;
  gridSize = checkSize(gridSize);
  const infoContainer = [];
  for (let i = 0; i < gridSize; i += 1) {
    infoContainer.push('40px');
  }
  const gridDimensions = concatenateArray(infoContainer);
  return gridDimensions;
}

function generatePixels() {
  let pixelCount = sizeInput.value;
  pixelCount = checkSize(pixelCount);
  pixelCount *= pixelCount;
  for (let i = 0; i < pixelCount; i += 1) {
    const newPixel = document.createElement('div');
    newPixel.classList.add('pixel');
    newPixel.addEventListener('click', paintPixel);
    newPixel.style.backgroundColor = 'white';
    pixelParent.appendChild(newPixel);
  }
}

function setGridProperties(string) {
  pixelParent.style.gridTemplateColumns = string;
  pixelParent.style.gridTemplateRows = string;
}

function generateGrid() {
  if (checkIfValid()) {
    deleteOldGrid();
    generatePixels();
    const gridSize = getGridSize();
    setGridProperties(gridSize);
    return;
  }
  return alert('Board inválido!');
}

function randomColors() {
  for (let i = 1; i < paletteList.length; i += 1) {
    const randomSelector = Math.floor(Math.random() * colorList.length);
    paletteList[i].style.backgroundColor = colorList[randomSelector];
  }
}

function setPaletteEvents() {
  document.querySelector('#black').classList.add('selected');
  for (let i = 0; i < paletteList.length; i += 1) {
    paletteList[i].addEventListener('click', selectColor);
  }
}

function setPixelEvents() {
  pixelList = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelList.length; i += 1) {
    pixelList[i].addEventListener('click', paintPixel);
  }
}

function setButtonEvents() {
  buttonClear.addEventListener('click', clearBoard);
  sizeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      vqvButton.click();
    }
  });
  vqvButton.addEventListener('click', generateGrid);
}

window.onload = function load() {
  setPaletteEvents();
  randomColors();
  setPixelEvents();
  setButtonEvents();
};
