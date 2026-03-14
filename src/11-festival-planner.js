/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {

  // addFestival(name, date, type)
  // date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
  // Returns new total count of festivals
  // Agar name empty or date not string or invalid type, return -1
  // No duplicate names allowed (return -1 if exists)
  const festival = [];

  const addFestival = (name, date, type)=> {
      if(typeof name !== "string" || name.trim() === "" || typeof date !== "string" || typeof type !== "string" 
          || (type !== "religious" && type !== "national" && type !== "cultural")
        )
        return -1

      if(festival.findIndex(element => element.name === name) >= 0)
        return -1

        return festival.push({
          name,
          date,
          type
        })
  }

  // removeFestival(name)
  // Returns true if removed, false if not found
  const removeFestival = (name) => {
    const index = festival.findIndex(element => element.name = name)
    if(index <0)
      return false
      
    festival.splice(index, 1)
    return true
  }

  const getAll = ()=> {
    return [...festival]
  }

  //  getByType(type)
  //  Returns filtered array of festivals matching type
  const getByType = (type) => {
    return festival.filter(fest => fest.type === type)
  }

  //- getUpcoming(currentDate, n = 3)
  //currentDate is "YYYY-MM-DD" string
  //Returns next n festivals that have date >= currentDate
  //Sorted by date ascending
  const getUpcoming = (currentDate, n=3)=> {
    return festival.filter(fest => fest.date >= currentDate).sort((a,b)=> a.date.localeCompare(b.date)).slice(0,n)
  }

  // - getCount()
  // Returns total number of festivals
  const getCount = () => festival.length;

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount,
  }
}
