/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {

  //  Factory: returns a function (hero, villain) => string
  switch (genre) {

    case "action":
      return (hero, villain) => {
        if(typeof hero !== "string" || !villain || typeof hero !== "string" || !hero )
          return "..."
        return `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
      }

    case "romance":
      return (hero, villain) => {
        if(typeof hero !== "string" || !villain || typeof hero !== "string" || !hero )
          return "..."
        return `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
      }

    case "comedy":
      return (hero, villain) => {
        if(typeof hero !== "string" || !villain || typeof hero !== "string" || !hero )
          return "..."
        return `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`;
      }

    case "drama":
      return (hero, villain) => {
        if(typeof hero !== "string" || !villain || typeof hero !== "string" || !hero )
          return "..."
        return `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
      }

  
    default:
      return null
  }
  //  Genres and their dialogue templates:
  //  "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
  //  "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
  //  "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
  //  "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
  //  Unknown genre => return null (not a function, just null)
  //  Returned function: if hero or villain empty/missing, return "..."
}

export function createTicketPricer(basePrice) {
  //  Agar basePrice not positive number => return null (not a function)
  if(typeof basePrice !== "number" || !basePrice || basePrice < 0)
    return null
  //  Factory: returns a function (seatType, isWeekend = false) => price
  //  Seat multipliers: silver=1, gold=1.5, platinum=2
  return (seatType, isWeekend) => {
    let multiplier;
    switch (seatType) {
      case "silver":
        multiplier = 1;
        break;
    
      case "gold":
        multiplier = 1.5;
        break;
    
      case "platinum":
        multiplier = 2;
        break;
    
      //  Unknown seatType in returned fn => return null
      default:
        return null
    }
    //  Agar isWeekend, multiply final price by 1.3 (30% extra)
    //  Round to nearest integer
    return Math.round(multiplier * (isWeekend?1.3:1) * basePrice)
  }
}

export function createRatingCalculator(weights) {
  //  Agar weights not an object => return null
  if(typeof weights !== "object" || Array.isArray(weights) || !weights)
    return null

  return (scores) => {
    if(typeof scores !== "object" || Array.isArray(scores) || !scores)
      return null 

    return parseFloat((
      ((weights.story || 0) * (scores.story || 0)) +
      ((weights.acting || 0) * (scores.acting || 0)) +
      ((weights.direction || 0) * (scores.direction || 0)) +
      ((weights.music || 0) * (scores.music || 0)) 
    ).toFixed(1))
  }
  //  Factory: returns a function (scores) => weighted average
  //  weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
  //  scores: { story: 8, acting: 9, direction: 7, music: 8 }
  //  Weighted avg = sum of (score * weight) for matching keys
  //  Round to 1 decimal place
}
