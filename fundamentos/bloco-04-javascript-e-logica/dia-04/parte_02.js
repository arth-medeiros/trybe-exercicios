// Palindrome checker:
//
// let isPalindrome;
//
// function verifyPalindrome(word, bool) {
//
//   let reverseWord = reverseString(word);
//
//   if (word === reverseWord) {
//     bool = true;
//     return bool;
//   }
//   bool = false;
//   return bool;
// }
//
// function reverseString(string) {
//
//   let splittedString = string.split("");
//   let reversedArray = splittedString.reverse();
//   let joinedArray = reversedArray.join("");
//
//  return joinedArray;
// }
//
// console.log(verifyPalindrome("banana", isPalindrome));

// Return highest value index:
//
// let nums = [2, 3, 6, 7, 10, 1];
//
// function returnHighestIndexValue(array) {
//   let biggestIndex = 0;
//   for (let i = 0; i < array.length -1; i += 1) {
//     if (array[biggestIndex] < array[i+1]) {
//       biggestIndex = i+1;
//     }
//   }
//   return biggestIndex;
// }
//
// console.log(returnHighestIndexValue(nums));

// Return lowest value index:
//
// let nums = [2, 4, 6, 7, 10, 0, -3];
//
// function returnLowestIndexValue(array) {
//   let lowestIndex = 0;
//   for (let i = 0; i < array.length -1; i += 1) {
//     if (array[lowestIndex] > array[i+1]) {
//       lowestIndex = i+1;
//     }
//   }
//   return lowestIndex;
// }
//
// console.log(returnLowestIndexValue(nums));

//Return the name with highest char count:
//
// let names = ['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana'];
//
// function highestCharCount(array) {
//   let biggestCharCount = 0
//
//   for (let i = 0; i < array.length -1; i += 1) {
//
//     let wrd = array[i].split("");
//     let wrdNxt = array[i+1].split("");
//
//     if (wrd.length < wrdNxt.length) {
//       biggestCharCount = i + 1;
//     }
//   }
//
//   return array[biggestCharCount]
// }
//
// console.log(highestCharCount(names));

//Return wich int repeats itself the most:
//
// let nums = [2, 3, 2, 5, 8, 2, 3];
//
// function returnMostRepeated(array) {
//   let rpNum = {
//     index: 0,
//     repetitions: 0 
//   };
//
//   let currNum = {
//     index: 0,
//     repetitions: 0 
//   };
// 
//   for (let i = 0; i < array.length; i += 1) {
//     if (i === 0) {
//       currNum.index = i;
//       for (let x = 1; x < array.length; x += 1) {
//         if (array[i] === array[x]) {
//           currNum.repetitions += 1;
//         }
//       }
//       rpNum.index = currNum.index;
//       rpNum.repetitions = currNum.repetitions;
//     }
//     else {
//       currNum.index = i;
//       currNum.repetitions = 0;
//  
//       for (let x = 1; x < array.length; x += 1) {
//         if (array[i] === array[x]) {
//           currNum.repetitions += 1;
//         }
//       }
//       if (currNum.repetitions > rpNum.repetitions) {
//         rpNum.index = currNum.index;
//         rpNum.repetitions = currNum.index;
//       }
//     }
//   }
//  
//   return array[rpNum.index];
// }
//
// console.log(returnMostRepeated(nums));

