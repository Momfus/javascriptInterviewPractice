
/**
 * Exercise 1
 */

/*
      Using javascript, resolve this with variables and function names that are human friendly:

      You are keeping score for a baseball game with strange rules. The game consists of several roundes, where the scores of past rounds may affect future rounds
   scores.

      At the beginning of the game, you start with an empty record. You are given a list of strings 'ops', where'ops[i]' is the 'ith' operation you must apply to 
   the record and is one of the following:

      1. An integer x - Record of a new score of x.
      2. "+" - Record a new score that is the sum of the previous two scores. Its guaranteed there will always be two previous scores.
      3. "D" - Record a new score that is double the previous score. Its guaranteed there will always be a previous score.
      4. "C" Invalidate the previous score, removing it from the record. Its guaranteed there will always be a previous score.

   Return the sum of all scores on the record.

   > Example of an execution:

      Input: ops = ["5", "2", "C", "D", "+"]
      Output: 30
      Explanation:
         "5" - Add 5 to the record, record is now [5]
         "2" - Add 2 to the record, record is now [5,2]
         "C" - INvalidate and remove the previous score, record is now [5]
         "D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
         "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
         The total sum is 5 + 10 + 15 = 30.

   > Example 2:
      Input: ops = ["5", "-2", "4", "C", "D", "9", "+", "+"]
      Output: 27
      explanation:
         "5" - Add 5 to the record, record is now [5].
         "-2" - Add -2 to the record, record is now [5, -2].
         "4" - Add 4 to the record, record is now [5, -2, 4].
         "C" - Invalidate and remove the previous score, record is now [5, -2]
         "D" - Add 2 * -2  = -4 to the record, record is now [5, -2, -4]
         "9" - Add 9 to the record, record is now [5, -2, -4, 9]
         "+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5]
         "+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14]
         The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

   > Example 3:
      Input: ops = ["1"]
      Output: 1

   Constraints: 
      1) 1 <= ops.length <=1000
      2) ops[i] is "C", "D", "+" or a string representing an integer in the range [-3 * 104,  3*104]
      3) For operation "+" there will always be at least two previous scores on the record
      4) For operations "C" and "D", there will alwaybs be at least one previous score on the record


*/

function baseballScores(ops) {
   let scores = [];
   let sum = 0;
 
   for (let i = 0; i < ops.length; i++) {
     let op = ops[i];
 
     if (op === 'C') {
       scores.pop();
     } else if (op === 'D') {
       scores.push(scores[scores.length - 1] * 2);
     } else if (op === '+') {
       scores.push(scores[scores.length - 1] + scores[scores.length - 2]);
     } else {
       scores.push(parseInt(op));
     }
   }
 
   for (let i = 0; i < scores.length; i++) {
     sum += scores[i];
   }
 
   return sum;
 }



 
/**
 * Exercise 2
 */

 /*

 Given  a string "s" contains just the caracters "(", ")", "´{", "}", "[", and "]", determine if the input string is valid .

  An input string is valid if: 
    1) 1 <= s.length <= 104
    2) s consists of parentheses only '()[]{}'

  Example 1:
    Input: s = "()"
    output: valid

  example 2: 
    Input: s = "(]"
    output: invalid

*/

function isValid(s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    let c = s[i];

    if (c === '(' || c === '[' || c === '{') {
      stack.push(c);
    } else {
      let last = stack.pop();

      if ((c === ')' && last !== '(') || (c === ']' && last !== '[') || (c === '}' && last !== '{')) {
        return false;
      }
    }
  }

  return stack.length === 0;

}


/**
 * Exercise 3
 */

 /*

    Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set mut 
  not contain duplicate subsets. Return the solution in specified order.

  Example 1:
    * Input: numbs = [1,2,3]
    * Output: [ [], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

  Example 2:
    * Input: numbs = [0]
    * Output: [[], [0]]

  constraints:
    1) 1 <= nums.length <= 10
    2) -10 <= num[i] <= 10
    3) All the numbers of nums are unique
*/

function findSubsets(nums) {
  
  const subsets = [[]];

  for (const num of nums) {

    const subsetCount = subsets.length;
    for (let i = 0; i < subsetCount; i++) {

      const currentSubset = subsets[i];
      const newSubset = [...currentSubset, num];
      subsets.push(newSubset);
      
    }

  }

  return subsets;
}

function showSubSetSolution(nums) {
  const subsets = findSubsets(nums);
  console.debug(`[${subsets.map(subset => subset.join(", ")).join("], [")}]`);
}

/**
 * Exercise 4
 */

 /*
  Given a string of 10 digits illustrating how the keys are positioned. To type a 
  digit, you start from index zero to the index of the target digit. It takes |a- b| 
  milliseconds to move from index a to index b.

  Write a function to calculate the number of milliseconds needed to type a number 
  with one finger.

  Example 1: 
    * Input: digits "0123456789", num = "210"
    * Output: 4

  Example 2: 
    * Input: digits = "8459761203", num "5439"
    * Output: 17

  Contraints:
    1) digits.length == 10
    2) digits contains each digit [0-9] exactly once in some order.
    3) 1 <= num.length <= 10^4
    4) num[i] is digit.

  Call example:

  const a = "0123456789"
  const b = "210"

  const output = solution(a,b)
  console.log(output)

 */

  function calculateTypingTime(digits, numbs) {
    let milliseconds = 0;
    let currentIndex = 0;
  
    for (const digit of numbs) {
      const targetIndex = digits.indexOf(digit);

      console.log(currentIndex, targetIndex,  Math.abs(currentIndex - targetIndex) );
      milliseconds += Math.abs(currentIndex - targetIndex);
      currentIndex = targetIndex;
    }
  
    return milliseconds;
    
  }
  
