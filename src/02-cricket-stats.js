/**
 * 🏏 Cricket Player Stats Dashboard
 *
 * IPL ka stats dashboard bana raha hai tu! Har function ARROW FUNCTION
 * hona chahiye (const fn = () => ...). Regular function declarations
 * mat use karna — arrow functions ki practice karna hai!
 *
 * Functions (sab arrow functions honge):
 *
 *   1. calcStrikeRate(runs, balls)
 *      - Strike rate = (runs / balls) * 100, rounded to 2 decimal places
 *      - Agar balls <= 0 ya runs < 0, return 0
 *
 *   2. calcEconomy(runsConceded, overs)
 *      - Economy = runsConceded / overs, rounded to 2 decimal places
 *      - Agar overs <= 0 ya runsConceded < 0, return 0
 *
 *   3. calcBattingAvg(totalRuns, innings, notOuts = 0)
 *      - Batting avg = totalRuns / (innings - notOuts), rounded to 2 decimal places
 *      - Default notOuts = 0
 *      - Agar innings - notOuts <= 0, return 0
 *
 *   4. isAllRounder(battingAvg, economy)
 *      - Return true agar battingAvg > 30 AND economy < 8
 *
 *   5. getPlayerCard(player)
 *      - player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
 *      - Return: { name, strikeRate, economy, battingAvg, isAllRounder }
 *      - Use the above functions internally
 *      - Agar player null/undefined hai ya name missing, return null
 *
 * Hint: Use const fn = (params) => expression or const fn = (params) => { ... }
 *
 * @example
 *   calcStrikeRate(45, 30)  // => 150
 *   calcEconomy(24, 4)      // => 6
 *   getPlayerCard({ name: "Jadeja", runs: 35, balls: 20, totalRuns: 2000, innings: 80, notOuts: 10, runsConceded: 1500, overs: 200 })
 *   // => { name: "Jadeja", strikeRate: 175, economy: 7.5, battingAvg: 28.57, isAllRounder: false }
 */
export const calcStrikeRate = (runs, balls) => {
  // Agar balls <= 0 ya runs < 0, return 0
  if(typeof balls !== "number" || !balls || balls < 0 || typeof runs !== "number" || !runs || runs < 0) return 0
  
  // Strike rate = (runs / balls) * 100, rounded to 2 decimal places
  return parseFloat((runs*100/balls).toFixed(2))
};

export const calcEconomy = (runsConceded, overs) => {
  //  Agar overs <= 0 ya runsConceded < 0, return 0
  if(typeof overs !== "number" || !overs || overs < 0 || typeof runsConceded !== "number" || !runsConceded || runsConceded < 0 ) return 0
  
  //  Economy = runsConceded / overs, rounded to 2 decimal places
  return parseFloat((runsConceded/overs).toFixed(2))
};

export const calcBattingAvg = (totalRuns, innings, notOuts = 0) => {
  //  Default notOuts = 0
  //  Agar innings - notOuts <= 0, return 0
  if(typeof totalRuns !== "number" || !totalRuns || totalRuns < 0 || typeof innings !== "number" || !innings || innings < 0 || typeof notOuts !== "number" || notOuts < 0) return 0

  if(innings-notOuts <= 0) return 0
  
  //  Batting avg = totalRuns / (innings - notOuts), rounded to 2 decimal places
  return parseFloat((totalRuns / (innings - notOuts)).toFixed(2))
};

export const isAllRounder = (battingAvg, economy) => {
  if(typeof battingAvg !== "number" || battingAvg < 0 || typeof economy !== "number" || economy < 0  ) return false
  
  // Return true agar battingAvg > 30 AND economy < 8
  if(battingAvg > 30 && economy < 8) return true

  return false
};

export const getPlayerCard = (player) => {
  // player object: { name, runs, balls, totalRuns, innings, notOuts, runsConceded, overs }
  // Return: { name, strikeRate, economy, battingAvg, isAllRounder }
  // Use the above functions internally
  // Agar player null/undefined hai ya name missing, return null
  if(typeof player !== "object" || Array.isArray(player) || !player || !player.name || typeof player.name !== "string") return null

  return {
    name : player.name,
    strikeRate:calcStrikeRate(player.runs, player.balls),
    economy:calcEconomy(player.runsConceded, player.overs),
    battingAvg: calcBattingAvg(player.totalRuns, player.innings, player.notOuts),
    isAllRounder: isAllRounder(calcBattingAvg(player.totalRuns, player.innings, player.notOuts), calcEconomy(player.runsConceded, player.overs))
  }
};
