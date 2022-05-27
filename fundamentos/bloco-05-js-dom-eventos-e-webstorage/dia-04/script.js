const bgInput = document.querySelector('#bgColorInput');
const bgButton = document.querySelector('#bgColorButton');
const textInput = document.querySelector('#textColorInput');
const textButton = document.querySelector('#textColorButton');
const sizeInput = document.querySelector('#fontSizeInput');
const sizeButton = document.querySelector('#fontSizeButton');
const spacingInput = document.querySelector('#lineSpacingInput');
const spacingButton = document.querySelector('#lineSpacingButton');
const familyInput = document.querySelector('#fontFamilyInput');
const familyButton = document.querySelector('#fontFamilyButton');

//Background Color
function setBgColor() {
  const oldPrefs = JSON.parse(localStorage.getItem('preferences'));
  const bgColor = bgInput.value;
  oldPrefs[0] = bgColor;
  localStorage.setItem('preferences', JSON.stringify(oldPrefs));
  document.querySelector('body').style.backgroundColor = bgColor;
  bgInput.value = '';
}
bgInput.addEventListener('keyup', function(event){
  if (event.key === 'Enter') {
    bgButton.click();
  }
});
bgButton.addEventListener('click', setBgColor);

//Text Color
function setTextColor() {
  const oldPrefs = JSON.parse(localStorage.getItem('preferences'));
  const txtColor = textInput.value;
  oldPrefs[1] = txtColor;
  localStorage.setItem('preferences', JSON.stringify(oldPrefs));
  document.querySelector('body').style.color = txtColor;
  textInput.value = '';
}
textInput.addEventListener('keyup', function(event){
  if (event.key === 'Enter') {
    textButton.click();
  }
});
textButton.addEventListener('click', setTextColor);

//Font Size
function setFontSize() {
  const oldPrefs = JSON.parse(localStorage.getItem('preferences'));
  const size = `${sizeInput.value}px`;
  oldPrefs[2] = size;
  localStorage.setItem('preferences', JSON.stringify(oldPrefs));
  document.querySelector('body').style.fontSize = size;
  sizeInput.value = '';
}
sizeInput.addEventListener('keyup', function(event){
  if (event.key === 'Enter') {
    sizeButton.click();
  }
});
sizeButton.addEventListener('click', setFontSize);

//Line Spacing
function setLineSpacing() {
  const oldPrefs = JSON.parse(localStorage.getItem('preferences'));
  const spacing = `${spacingInput.value}px`;
  oldPrefs[3] = spacing;
  localStorage.setItem('preferences', JSON.stringify(oldPrefs));
  document.querySelector('body').style.lineHeight = spacing;
  spacingInput.value = '';
}
spacingInput.addEventListener('keyup', function(event){
  if (event.key === 'Enter') {
    spacingButton.click();
  }
});
spacingButton.addEventListener('click', setLineSpacing);

//Font Family
function setFontFamily() {
  const oldPrefs = JSON.parse(localStorage.getItem('preferences'));
  const fontType = familyInput.value;
  oldPrefs[4] = fontType;
  localStorage.setItem('preferences', JSON.stringify(oldPrefs));
  document.querySelector('body').style.fontFamily = fontType;
  familyInput.value = '';
}
familyInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    familyButton.click();
  }
});
familyButton.addEventListener('click', setFontFamily);

//Initialization
function initialRenderization() {
  if (localStorage.getItem('preferences') === null) {
    localStorage.setItem('preferences', JSON.stringify([null, null, null, null, null]));
    return;
  }
  const prefs = JSON.parse(localStorage.getItem('preferences'));
  for (let i = 0; i < prefs.length; i += 1) {
    switch (i) {
      case 0:
        document.querySelector('body').style.backgroundColor = prefs[i];
        break;
      case 1:
        document.querySelector('body').style.color = prefs[i];
        break;
      case 2:
        document.querySelector('body').style.fontSize = prefs[i];
        break;
      case 3:
        document.querySelector('body').style.lineHeight = prefs[i];
        break;
      case 4:
        document.querySelector('body').style.fontFamily = prefs[i];
        break;
    }
  }
}

window.onload = function() {
  initialRenderization();
};