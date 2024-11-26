let minLength = document.querySelector("#minLength");
let maxLength = document.querySelector("#maxLength");
let isUpperCase = document.querySelector("#isUpperCase");
let isSpecialCharacters = document.querySelector("#isSpecialCharacters");
let generatePasswordButton = document.querySelector("#generatePasswordButton");

generatePasswordButton.addEventListener("click", function (event) {
  if (minLength.value > maxLength.value) {
    event.preventDefault();
    alert("Minimalna długość większa od maksymalnej!!!");
    return;
  }
  event.preventDefault();
  const password = generatePassword(
    minLength,
    maxLength,
    isUpperCase,
    isSpecialCharacters
  );
  alert(password);
});

function generatePassword(
  minLength,
  maxLength,
  isUpperCase,
  isSpecialCharacters
) {
  minLength = parseInt(minLength.value, 10);
  maxLength = parseInt(maxLength.value, 10);
  isUpperCase = isUpperCase.checked;
  isSpecialCharacters = isSpecialCharacters.checked;

  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialCharacters = "!@#$%^&*()_-+=<>?";
  let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let index;

  if (isUpperCase && isSpecialCharacters) {
    characters += upperCaseLetters + specialCharacters;
    index = Math.floor(Math.random() * upperCaseLetters.length);
    result += upperCaseLetters[index];
    index = Math.floor(Math.random() * specialCharacters.length);
    result += specialCharacters[index];
  }
  if (isUpperCase && !isSpecialCharacters) {
    characters += upperCaseLetters;
    index = Math.floor(Math.random() * upperCaseLetters.length);
    result += upperCaseLetters[index];
  }
  if (isSpecialCharacters && !isUpperCase) {
    characters += specialCharacters;
    index = Math.floor(Math.random() * specialCharacters.length);
    result += specialCharacters[index];
  }

  console.log(result);

  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) +
    minLength -
    result.length;

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    result += characters[index];
  }

  return result;
}

let form = document.querySelector("#passwordGeneratorForm");
let clearButton = document.querySelector("#clearForm");

clearButton.addEventListener("click", function () {
  form.reset();
});
