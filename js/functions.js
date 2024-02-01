
// Функция, определяющая, является ли строка палиндромом

const palindrome = function (phrase) {
  let preparedPhrase = phrase.replaceAll(' ', '');
  preparedPhrase = preparedPhrase.toLowerCase();
  const preparedPhraseLength = preparedPhrase.length - 1;
  for (let i = 0; i < Math.floor(preparedPhraseLength / 2); i++) {
    if (preparedPhrase[i] === preparedPhrase[preparedPhraseLength - i]) {
      continue;
    } else {
      console.log('Это не палиндром');
      return false;
    }
  }
  console.log('Это палиндром');
  return true;
};

// Функция, вычленяющая цифры из строки //
//и выдающая результат в виде их последовательности.//

let extractDigits = function (string) {
  const toString = String(string);
  const stringLength = toString.length - 1;
  let setOfDigits = '';
  for (let i = 0; i <= stringLength; i++) {
    if (toString[i] >= '0' && toString[i] <= '9') {
      setOfDigits += toString[i];
    }
  }
  if(setOfDigits !== '') {
    return setOfDigits;
  }
  else {
    return NaN;
  }
};

// Функция, добавляющая символы из заданного набора
//к входящей строке до указанной длины

function getString (incString, stringLength, addSymbols) {
  const inputLength = incString.length;
  const addLength = addSymbols.length;
  if (inputLength >= stringLength) {
    return incString;
  } else {
    //'дуб', 7, 'бук' difference = 4, quantity = 1, leftover = 1
    const difference = stringLength - inputLength;
    const quantity = Math.floor(difference / addLength);
    const leftover = difference % addLength;
    let combinedString1 = '';
    for (let i = 0; i < quantity; i++) {
      combinedString1 += addSymbols;
    }
    let currentIndex = 0;
    let combinedString2 = '';
    for (let j = 0; j < leftover; j++){
      combinedString2 += addSymbols[currentIndex];
      if (addSymbols[currentIndex + 1]) {
        currentIndex += 1;
      } else {
        currentIndex = 0;
      }
    }
    const totalString = combinedString1 + combinedString2 + incString;
    return totalString;
  }
}

