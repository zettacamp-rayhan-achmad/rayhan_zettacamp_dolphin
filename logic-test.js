// Title: Unique Characters

// Example:
// console.log(hasUniqueCharacters("abcdefg")); // Output: true
//console.log(hasUniqueCharacters("hello")); // Output: false

function hasUniqueCharacters(str) {
   // Create an object to keep track of characters we've seen
   const seenCharacters = {};

   // Loop through each character in the string
   for (let char of str) {
      // If the character is already in the object, return false
      if (seenCharacters[char]) {
         console.log(seenCharacters);
         return false;
      }
      // Mark the character as seen
      console.log(seenCharacters);
      seenCharacters[char] = true;
   }

   // If we haven't returned false, all characters are unique
   return true;
}

console.log(hasUniqueCharacters('abcdef')); // Output: true
console.log(hasUniqueCharacters('hallo')); // Output: false
