// Функция, проверяющая что длина строки не больше заданного значения.

function compareStringLength(input, length) {
  const inputString = Number.isFinite(input) ? input.toString() : input;
  return inputString.length <= length;
}

// Функция, проверяющая является ли строка палиндромом.

function isPalindrome(input) {
  const string = input.replaceAll(' ', '').toUpperCase();
  let stringBackwards = '';
  for (let i = string.length - 1; i > -1; i--) {
    stringBackwards += string[i];
  }
  return stringBackwards === string;
}

// Функция, извлекающая цифры от 0 до 9, возвращая в виде целого положительного числа.

function extractNumbers(input) {
  let output = '';
  const inputString = Number.isFinite(input) ? input.toString() : input;
  for (let i = 0; i <= inputString.length - 1; i++) {
    if (Number.isFinite(parseInt(inputString[i], 10))) {
      output += inputString[i];
    }
  }
  return parseInt(output, 10);
}