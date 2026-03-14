/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  //  Agar char not a string or empty, return ""
  //  Base case: n <= 0 => return ""
  if(typeof char !== "string" || !char || typeof n !== "number" || !Number.isInteger(n) || n<=0)
    return ""
  
  //  Recursive: char + repeatChar(char, n - 1)
  return char + repeatChar(char, n-1);
}

export function sumNestedArray(arr) {
  //  Base case: empty array => 0
  //  Agar input not array, return 0
  if(!Array.isArray(arr) || arr.length === 0) return 0

  let sum = 0;

  //  Sum all numbers in an arbitrarily nested array
  for(let i = 0; i<arr.length ; i++){
    if(Array.isArray(arr[i])){
      sum += sumNestedArray(arr[i]);
    } else if(typeof arr[i] === "number" && arr[i]){
        sum += arr[i];
    }
  }

  return sum;
  //  e.g., [1, [2, [3, 4]], 5] => 15
  //  Skip non-number values
}

export function flattenArray(arr) {
  // Agar input not array, return []
  if(!Array.isArray(arr) || arr.length === 0) 
    return []

  let flatArr = [];

  // Flatten an arbitrarily nested array into a single flat array
  for(let i = 0; i<arr.length ; i++) {
    if(!Array.isArray(arr[i])){
        flatArr.push(arr[i]);
    } else {
      flatArr = [...flatArr, ...flattenArray(arr[i])]
    }
  }

  return flatArr;
  // e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
  
}

export function isPalindrome(str) {
  // Agar input not string, return false
  if(typeof str !== "string") return false
  // Base case: string length <= 1 => true
  if(str.length <=1) return true
  
  // Case-insensitive comparison
  str = str.toLowerCase();
  // Compare first and last chars
  if(str[0] !== str[str.length-1]){
    return false
  }

  //  recurse on middle
  return isPalindrome(str.slice(1, str.length-1))
}

export function generatePattern(n) {
  //  Agar n <= 0, return []
  //  Agar n is not a positive integer, return []
  if(typeof n !== "number" || !Number.isInteger(n) || n<=0) return []
  //  Generate symmetric mehndi border pattern
  //  n = 1 => ["*"]
  //  n = 2 => ["*", "**", "*"]
  //  n = 3 => ["*", "**", "***", "**", "*"]
  //  Pattern goes from 1 star up to n stars, then back down to 1
  //  Use recursion to build the ascending part, then mirror it

  //base case
  if(n===1)
    return ["*"]

  let arr = []

  arr = generatePattern(n-1).slice(0, n-1)

  let reverseArr = [...arr].reverse()
  arr.push("*".repeat(n))

  return [...arr, ...reverseArr]

  

}
