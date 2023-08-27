/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */
function majorityElement(nums) {
   let count = 0;
   let element = null;

   for (const num of nums) {
      if (count === 0) {
         element = num;
         count = 1;
      } else if (num === element) {
         count++;
      } else {
         count--;
      }
   }

   return element;
}

console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2]));
