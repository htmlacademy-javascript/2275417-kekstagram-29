// Функция, проверяющая что длина строки не больше заданного значения.

function compareStringLength(input, length) {
  const inputString = Number.isFinite(input) ? input.toString() : input;
  return inputString.length <= length;
}

compareStringLength('sss', 3);

// Функция, проверяющая является ли строка палиндромом.

function isPalindrome(input) {
  const string = input.replaceAll(' ', '').toUpperCase();
  let stringBackwards = '';
  for (let i = string.length - 1; i > -1; i--) {
    stringBackwards += string[i];
  }
  return stringBackwards === string;
}

isPalindrome('sdds');

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

extractNumbers('dx0451');

function parseTime(timeInHours) {
  const [hour, minute] = timeInHours.split(':');
  return hour * 60 + Number(minute);
}

function setMeeting(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartMinutes = parseTime(dayStart);
  const dayEndMinutes = parseTime(dayEnd);
  const meetingStartMinutes = parseTime(meetingStart);

  return (
    meetingStartMinutes >= dayStartMinutes &&
    meetingStartMinutes + meetingDuration <= dayEndMinutes
  );
}

setMeeting('8:00', '18:00', '14:00', 120);
