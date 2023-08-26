// Title: Unique Characters

// Example:
// console.log(hasUniqueCharacters("abcdefg")); // Output: true
//console.log(hasUniqueCharacters("hello")); // Output: false

function hasUniqueCharacters(str) {
   const seenCharacters = {};

   for (let char of str) {
      if (seenCharacters[char]) {
         console.log(seenCharacters);
         return false;
      }
      console.log(seenCharacters);
      seenCharacters[char] = true;
   }

   return true;
}

console.log(hasUniqueCharacters('abcdefg')); // Output: true
console.log(hasUniqueCharacters('kakiku')); // Output: false
