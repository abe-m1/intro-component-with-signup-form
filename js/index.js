const submitButton = document.querySelector('#button-submit');

const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

function generateErrorIcon(element, type = null) {
  // if there is already an error message return without adding anything
  if (element.classList.contains('form-error') && !type) {
    // with email input, and case where previous error message of invalid email
    // and user empties the field, the message will change back to 'not-empty' message
    if (element === emailInput) {
      element.parentElement.firstElementChild.nextElementSibling.textContent =
        'Email cannot be empty';
    }
    return;
  } else if (element.classList.contains('form-error') && type) {
    //if there already was an error message, and type parameter is being passed in
    //notifying that email format is not valid, change the text of the error
    element.parentElement.firstElementChild.nextElementSibling.textContent =
      'Looks like this is not an email';
    emailInput.style.color = 'red';
    return;
  }

  //grab placeholder text in order to dynamically set error message name
  let messageText = element.placeholder;

  //create the icon
  const img = document.createElement('img');
  img.src = 'images/icon-error.svg';
  img.classList.add('error-circle');
  img.style.display = 'block';

  // create error message
  const message = document.createElement('div');
  message.classList.add('error-message');
  message.style.display = 'block';
  let divText;

  if (type && type === 'format-error') {
    divText = document.createTextNode(`Looks like this is not an email`);
  } else {
    divText = document.createTextNode(`${messageText} cannot be empty`);
  }

  message.appendChild(divText);

  //insert the two new error elements
  const elem = document.getElementById(element.id);
  elem.insertAdjacentElement('afterend', img);
  elem.insertAdjacentElement('afterend', message);

  //add class so field will get red border
  elem.classList.add('form-error');

  // if is email, change text to red
  if (element === emailInput) {
    element.style.color = 'red';
  }
  return;
}

function removeErrorMessage(element) {
  //if the form field is not empty, remove the errors
  const children = element.parentElement;

  //remove the red border
  element.parentNode.firstElementChild.classList.remove('form-error');

  // remove icon
  const second = element.parentNode.firstElementChild.nextElementSibling;
  if (second) {
    children.removeChild(second);
  }

  // remove message
  const third = element.parentNode.firstElementChild.nextElementSibling;
  if (third) {
    children.removeChild(third);
  }

  // if is email, change text back to black
  if (element === emailInput) {
    emailInput.style.color = '#000';
  }
}

function validate(e) {
  e.preventDefault();

  //check each input field and run either of two functions, passing in the element
  if (firstNameInput.value) {
    removeErrorMessage(firstNameInput);
  } else {
    generateErrorIcon(firstNameInput);
  }

  if (lastNameInput.value) {
    removeErrorMessage(lastNameInput);
  } else {
    generateErrorIcon(lastNameInput);
  }

  if (emailInput.value) {
    // if email value exists check if is a valid email
    const regEx = /^.+@\w+\.\w+$/;
    if (regEx.test(String(emailInput.value).toLowerCase())) {
      removeErrorMessage(emailInput);
    } else {
      generateErrorIcon(emailInput, 'format-error');
    }
  } else {
    // email field is empty
    generateErrorIcon(emailInput);
  }

  if (passwordInput.value) {
    removeErrorMessage(passwordInput);
  } else {
    generateErrorIcon(passwordInput);
  }
}

submitButton.addEventListener('click', validate);
