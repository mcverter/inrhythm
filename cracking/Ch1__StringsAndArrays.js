const assert = require('assert')

/**
 * 1.1
 Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you
 cannot use additional data structures?
 */

function isUniqueSort(str) {
  let strArr = str.split('');
  strArr.sort();

  for (let i=0; i<strArr.length-1; i++) {
    if(strArr[i] === strArr[i+1]) {
      return false;
    }
  }
  return true;
}

function isUniqueHash(str) {
  const charHash = {};

  for (let i=0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (charHash[ch]) {
      return false;
    }
    charHash[ch] = true;
  }
  return true;
}

assert(isUniqueHash('hello')===false);
assert(isUniqueHash('hiya')===true);
assert(isUniqueSort('hello')===false);
assert(isUniqueSort('hiya')===true);


/**
 * 1.2
 Check Permutation: Given two strings, write a method to decide if one is a permutation of the
 other
 */

function isPermutationSort(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  return str1.split('').sort().join('') ==
    str2.split('').sort().join('')
}

function isPermutationHash(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charHash = {};
  for (let i=0; i < str1.length; i++) {
    let ch = str1.charAt(i);
    if (charHash[ch]) {
      charHash[ch]++;
    } else {
      charHash[ch] = 1;
    }
  }

  for (let i=0; i < str2.length; i++) {
    let ch = str2.charAt(i);
    if (charHash[ch]) {
      charHash[ch]--;
    } else {
      return false;
    }
  }

  Object.keys(charHash).forEach(ch => {
    if (charHash[ch] !== 0) {
      return false;
    }
  });

  return true;
}


assert(isPermutationHash('cat', 'act'));
assert(! isPermutationHash('sad', 'ick'));
assert(isPermutationHash('cat', 'act'));
assert(! isPermutationHash('sad', 'ick'));
assert(! isPermutationHash('cate', 'act'));
assert(! isPermutationHash('cate', 'cat'));


/**
 URLify: Write a method to replace all spaces in a string with '%20'. You may assume that the string
 has sufficient space at the end to hold the additional characters, and that you are given the "true"
 length of the string. (Note: If implementing in Java, please use a character array so that you can
 perform this operation in place.)
 EXAMPLE
 ", 13
 Input: "Mr John Smith
 Output: "Mr%20John%20Smith"
 */
function urlify(str) {
  const originalLen = str.length;
  let numSpace = 0;

  for (let i=0; i < originalLen; i++) {
    if (str.charAt(i) === " ") {
      numSpace++;
    }
  }

  const urlArr = Array(originalLen + (3*numSpace));

  let writeIndex =  0;
  for (let i=0; i < originalLen; i++) {
    let char = str.charAt(i);

    if (char === " ") {
      urlArr[writeIndex++] = '%';
      urlArr[writeIndex++] = '2';
      urlArr[writeIndex++] = '0';
    } else {
      urlArr[writeIndex++] = char;
    }
  }
  return urlArr.join('');
}

assert.equal(urlify('Mr John Smith'), 'Mr%20John%20Smith');

/**
 Test Palindrome
*/

function isPalindrome(str) {
  const len = str.length;

  for (let i=0; i < len/2; i++) {
    if (str[i] !== str[len-(i+1)]) {
      return false;
    }
  }
  return true;
}

assert(isPalindrome("tacocat"));

/**
 Cracking the Coding Interview, 6th EditionChapter 1 I Arrays and Strings
 1.4
 Palindrome Permutation: Given a string, write a function to check if it is a permutation of a palin­
 drome. A palindrome is a word or phrase that is the same forwards and backwards. A permutation
 is a rearrangement of letters. The palindrome does not need to be limited to just dictionary words.
 EXAMPLE
 Input: Tact Coa
 Output: True (permutations: "taco cat", "atco eta", etc.)
 Hints: #106, #121, #134, #136
 1.5
madamimadam
 */

function isPermutatedPalindrome(s) {
  let str = s.toLowerCase();
  let charHash = {};
  let oddMiddles = 0;
  let evenSides = 0;

  for (let i=0; i<str.length;i++){
    let ch = str.charAt(i);
    charHash[ch] = charHash[ch] ? charHash[ch] + 1 : 1
  }


  for (ch in charHash) {
    if (charHash[ch] % 2 === 0) {
      evenSides++;
    } else {
      oddMiddles++;
    }
  }
  return (evenSides && oddMiddles<=2);
}

assert(isPermutatedPalindrome("Tact Coa")); // 'taco cat'

/**
 One Away: There are three types of edits that can be performed on strings: insert a character,
 remove a character, or replace a character. Given two strings, write a function to check if they are
 one edit (or zero edits) away.
 EXAMPLE
 ->
 pales, pale ->
 pale, bale ->
 pale, bake ->
 pale,
 ple
 true
 true
 true
 false
 Hints:#23, #97, #130
 1.6
 */
function isOneAway(str1, str2) {
  let str1Len = str1.length,
    str2Len = str2.length,
    lenDiff = str1.length - str2.length;

  if (Math.abs(lenDiff) > 1) {
    return false;
  }


  let shortestString,
    shortestLength,
    longestString,
    numAway = lenDiff;


  if (lenDiff < 1) {
    shortestString = str1;
    shortestLength = str1Len;
    longestString = str2;
  } else {
    shortestString = str2;
    shortestLength = str2Len;
    longestString = str1;
  }

  let checkNext = false;

  for (let i=0; i<shortestLength; i++) {
    if (shortestString[i] !== longestString[i + checkNext]) {
      if (checkNext) {
        return false;
      } else if (lenDiff && (shortestString[i] === longestString[i+1])) {
        checkNext = true;
      } else if (numAway) {
        return false;
      } else {
        numAway = 1;
      }
    }
  }
  return true;

}

assert(isOneAway('pales', 'pale'));
assert(isOneAway('pale', 'bale'));
assert(! isOneAway('pale', 'bake'));
assert(isOneAway('pale', 'ple'));
assert(! isOneAway('pale', 'palers'));
/**
 String Compression: Implement a method to perform basic string compression using the counts
 of repeated characters. For example, the string aabcccccaaa would become a2blc5a3. If the
 "compressed" string would not become smaller than the original string, your method should return
 the original string. You can assume the string has only uppercase and lowercase letters (a - z).
 Hints:#92, #110
*/

function compression(str) {
  let len = str.len;
  if (len < 1) {
    return '';

  }
  let currChar = str.charAt(0);
  let currCount = 1;

  let compressedString = '';

  for (let i=1; i<str.length; i++) {
   let ch = str.charAt(i);
   if (ch === currChar) {
     currCount++;
   } else {
     compressedString += currChar + currCount;
     currChar = ch;
     currCount = 1;
   }
  }

  compressedString += currChar + currCount;

  return (compressedString.length < str.length) ?  compressedString : str;
}

assert(compression('aabcccccaaa', 'a2blc5a3'));

/**
 1.7
 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4
 bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
 Hints: #51, # 100
 1.8
 Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and
 column are set to 0.
 Hints:#17, #74, #702
 1.9
 String Rotation:Assumeyou have a method isSubstringwhich checks if one word is a substring
 of another. Given two strings, sl and s2, write code to check if s2 is a rotation of sl using only one
 call to isSubstring (e.g., "waterbottle" is a rotation of"erbottlewat").
 */