//Функция, возвращающая случайное целое число из переданного диапазона включительно.
//Функция была взята с сайта https://learn.javascript.ru/task/random-int-min-max
function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
randomInteger();

//Функция для проверки максимальной длины строки
 function commentLength (string,maxLength) {
if (string.length > maxLength) {
  return false
  }
  return true
}
commentLength();
