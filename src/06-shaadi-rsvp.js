/**
 * 💒 Shaadi RSVP Manager - Callback Functions
 *
 * Big fat Indian wedding ki planning chal rahi hai! Guest list manage
 * karna hai using callback functions. Callback matlab ek function jo
 * doosre function ko argument ke roop mein diya jaata hai.
 *
 * Functions:
 *
 *   1. processGuests(guests, filterFn)
 *      - guests: array of guest objects
 *      - filterFn: callback function that takes a guest, returns true/false
 *      - Returns: array of guests for which filterFn returned true
 *      - Agar guests not array or filterFn not function, return []
 *
 *   2. notifyGuests(guests, notifyCallback)
 *      - Calls notifyCallback(guest) for EACH guest in array
 *      - Collects return values from each callback call
 *      - Returns: array of callback results
 *      - Agar guests not array or notifyCallback not function, return []
 *
 *   3. handleRSVP(guest, onAccept, onDecline)
 *      - If guest.rsvp === "yes", call onAccept(guest) and return its result
 *      - If guest.rsvp === "no", call onDecline(guest) and return its result
 *      - If guest.rsvp is anything else, return null
 *      - Agar guest null/undefined or callbacks not functions, return null
 *
 *   4. transformGuestList(guests, ...transformFns)
 *      - Takes guest array and any number of transform functions
 *      - Each transformFn takes an array and returns a new array
 *      - Apply transforms LEFT to RIGHT (first fn first)
 *      - Return the final transformed array
 *      - Agar guests not array, return []
 *
 * Hint: Callbacks are just functions passed as arguments to other functions.
 *   The receiving function decides WHEN to call them.
 *
 * @example
 *   processGuests(
 *     [{ name: "Rahul", side: "bride" }, { name: "Priya", side: "groom" }],
 *     guest => guest.side === "bride"
 *   )
 *   // => [{ name: "Rahul", side: "bride" }]
 *
 *   handleRSVP({ name: "Amit", rsvp: "yes" }, g => `${g.name} is coming!`, g => `${g.name} declined`)
 *   // => "Amit is coming!"
 */
export function processGuests(guests, filterFn) {
  //  guests: array of guest objects
  //  Agar guests not array or filterFn not function, return []
  if (!Array.isArray(guests) || guests.length === 0 || typeof filterFn !== "function") return []
  //  filterFn: callback function that takes a guest, returns true/false
  //  Returns: array of guests for which filterFn returned true
  const arr = []

  for(let i = 0; i<guests.length; i++){
    if(filterFn(guests[i])){
      arr.push(guests[i])
    }
  }
  return arr;
}

export function notifyGuests(guests, notifyCallback) {
  //  Agar guests not array or notifyCallback not function, return []
  if(!Array.isArray(guests) || guests.length === 0 || typeof notifyCallback !== "function") return []

  const arr = [];
  //  Calls notifyCallback(guest) for EACH guest in array
  guests.forEach(element => {
    //  Collects return values from each callback call
    arr.push(notifyCallback(element))
  })
  //  Returns: array of callback results
  return arr;
}

export function handleRSVP(guest, onAccept, onDecline) {
  //  Agar guest null/undefined or callbacks not functions, return null
  if(typeof guest !== "object" || Array.isArray(guest) || !guest || typeof onAccept !== "function"|| typeof onDecline !== "function")
    return null
  //  If guest.rsvp === "yes", call onAccept(guest) and return its result
  if(guest.rsvp === "yes"){
    return onAccept(guest)
    //  If guest.rsvp === "no", call onDecline(guest) and return its result
  } else if (guest.rsvp === "no") {
    return onDecline(guest)
  } 
  //  If guest.rsvp is anything else, return null
  return null

}

export function transformGuestList(guests, ...transformFns) {
  //  Agar guests not array, return []
  if(!Array.isArray(guests) || guests.length === 0)
    return []
  
  let arr = [...guests];
  
  //  Each transformFn takes an array and returns a new array
  //  Apply transforms LEFT to RIGHT (first fn first)
  transformFns.forEach(fn => {
    arr  = fn(arr)
  })
  //  Return the final transformed array
  return arr;
}



