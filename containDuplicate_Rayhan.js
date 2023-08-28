/**
 * write a function that returns true if there's duplicate in the array, and false otherwise.
 * SEE EXAMPLE BELLOW!
 * 
 * 
Example
console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true

 * Determines if the array contains any duplicate value.

 * @param {number[]} nums - The input array of integers.
 * @return {boolean} Returns true if the array contains any duplicate value, false otherwise.
 */
function containDuplicate(nums) {
   const numSet = [];
   for (const num of nums) {
      if (numSet[num]) {
         console.log(numSet[num]);
         return true;
      }
      numSet.push(num);
   }

   return false;
}
console.log(containDuplicate([1, 2, 3, 1])); //true
console.log(containDuplicate([1, 2, 3, 4])); //false
console.log(containDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));
console.log(containDuplicate([3, 4, 3])); //true
