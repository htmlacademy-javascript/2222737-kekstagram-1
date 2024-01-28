
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

