/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
*/
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  //  Destructured parameter with defaults!
  //  Agar name missing/empty, return null
  if(typeof name !== "string" || !name)
    return null
  //  Meal prices per day: veg=80, nonveg=120, jain=90
  //  Agar mealType unknown hai, return null
  let mealPrice
  switch (mealType) {
    case "veg":
      mealPrice = 80;
      break;
  
    case "nonveg":
      mealPrice = 120
      break;
  
    case "jain":
      mealPrice = 90;
      break;
  
    default:
      return null
  }
  //  Return: { name, mealType, days, dailyRate, totalCost }
  return {
    name,
    mealType,
    days,
    dailyRate : mealPrice,
    totalCost : mealPrice*days
  }
}

export function combinePlans(...plans) {
  //  Rest parameter! Takes any number of plan objects
  //  Agar koi plans nahi diye, return null
  if(!Array.isArray(plans) || plans.length === 0) 
    return null;
  //  Each plan: { name, mealType, days, dailyRate, totalCost }
  //  Return: { totalCustomers, totalRevenue, mealBreakdown }
  //  mealBreakdown: { veg: count, nonveg: count, ... }

  return plans.reduce((details, plan)=> {
    const { name, mealType, days, dailyRate, totalCost } = plan

    details.totalCustomers++;
    details.totalRevenue += totalCost;
    details.mealBreakdown[mealType]++;

    return details;
    
  }, { totalCustomers : 0, totalRevenue : 0, mealBreakdown : { veg: 0, nonveg: 0,jain : 0 } })

}

export function applyAddons(plan, ...addons) {
  //  Agar plan null hai, return null
  if(typeof plan !== "object" || Array.isArray(plan) || !plan) return null
  //  Agar plan null hai, return null
  if(!Array.isArray(addons) || !addons) return null
  //  plan: { name, mealType, days, dailyRate, totalCost }
  //  Each addon: { name: "raita", price: 15 }
  //  Add each addon price to dailyRate
  //  Recalculate totalCost = new dailyRate * days
  //  Return NEW plan object (don't modify original)
    const copiedPlan = {...plan}

    const {basePrice, addonNames} = addons.reduce((details,addon)=>{
      details.addonNames.push(addon.name);
      return {basePrice : (details.basePrice + addon.price), addonNames : details.addonNames}
    }, {basePrice : plan.dailyRate, addonNames : []})

    return {
      ...copiedPlan,
      dailyRate : basePrice,
      totalCost : basePrice*plan.days,
      addonNames
    }
  //  addonNames: array of addon names added
}
