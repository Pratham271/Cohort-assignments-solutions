/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isAlphanumeric(char) {
  return /[a-z0-9]/i.test(char); // Checks if the character is a letter or a digit
}

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;
  str = str.toLowerCase();
  while (start <= end) {
    if (!isAlphanumeric(str[start])) {
      start++;
      continue;
    }
    if (!isAlphanumeric(str[end])) {
      end--;
      continue;
    }
    if (str[start] !== str[end]) {
      return false;
    } else {
      start++;
      end--;
    }
  }
  return true;
}

module.exports = isPalindrome;
