/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  //1. createElection(candidates)
  //    - CLOSURE: private state (votes object, registered voters set)
  //    - candidates: array of { id, name, party }
  //    - Returns object with methods:
  
  const registeredVoters = [];
  const votes = {}
  
  const registerVoter = (voter) =>{
            if(typeof voter !== "object" || Array.isArray(voter) || !voter || Object.keys(voter).length === 0)
              return false
            
            if(voter?.age === undefined || voter?.id === undefined || voter?.name === undefined ) 
              return false

            if(voter.age < 18) 
              return false

            if(registeredVoters.findIndex(element => element.id === voter.id) >= 0)
              return false

            registeredVoters.push(voter);
            return true
  }

  //    castVote(voterId, candidateId, onSuccess, onError)
  //      - CALLBACKS: call onSuccess or onError based on result
  //      - Validate: voter registered? candidate exists? already voted?
  //      - If valid: record vote, call onSuccess({ voterId, candidateId })
  //      - If invalid: call onError("reason string")
  //      - Return the callback's return value
  const castVote = (voterId, candidateId, onSuccess, onError)=>{
    if(registeredVoters.findIndex(element => element.id === voterId) < 0)
      return onError("voter not registered")

    if(candidates.findIndex(element => element.id === candidateId) < 0)
      return onError("candidate not exist")

    if(votes[voterId])
      return onError("voter already voted")

    votes[voterId] = candidateId
    return onSuccess({voterId, candidateId})


  }

  //    getResults(sortFn)
  //      - HOF: takes optional sort comparator function
  //      - Returns array of { id, name, party, votes: count }
  //      - If sortFn provided, sort results using it
  //      - Default (no sortFn): sort by votes descending
  const getResults = (sortFn) => {
    let arr = []
    candidates.forEach(candidate => {
      
      arr.push({
        ...candidate, 
        votes : Object.entries(votes).filter(element => element[1] === candidate.id).length
      })
    });

    if(!sortFn)
      return arr.sort((a , b) => b.votes-a.votes)
    return arr.sort(sortFn)
  }

  //    getWinner()
  //      - Returns candidate object with most votes
  //      - If tie, return first candidate among tied ones
  //      - If no votes cast, return null
  const getWinner = () => {
    if(Object.keys(votes).length === 0)
      return null;

    
    return candidates[candidates.findIndex(element => element.id === getResults()[0].id)]
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner
  }
}

export function createVoteValidator(rules) {
  //  FACTORY: returns a validation function
  //  rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
  //  Returned function takes a voter object and returns { valid, reason }
  return (voter) => {
    
    for (const field of rules.requiredFields) {
      if(!voter[field])
        return {valid : false, reason : `${field} is required`}
    }

    if (voter.age < rules.minAge)
      return {valid : false, reason : `minimum age should be ${voter.age}`}

    return {valid : true, reason : `validated successfully`}
  }
}

export function countVotesInRegions(regionTree) {
  // RECURSION: count total votes in nested region structure
  // regionTree: { name, votes: number, subRegions: [...] }
  // Sum votes from this region + all subRegions (recursively)
  // Agar regionTree null/invalid, return 0
  if(!regionTree || typeof regionTree !== "object" || Array.isArray(regionTree) || Object.keys(regionTree).length === 0)
    return 0

  let sum = regionTree.votes;

  regionTree.subRegions.forEach(element => {
    sum += countVotesInRegions(element);
  });

  return sum
}

export function tallyPure(currentTally, candidateId) {
  // PURE FUNCTION: returns NEW tally object with incremented count
  // currentTally: { "cand1": 5, "cand2": 3, ... }
  // Return new object where candidateId count is incremented by 1
  // MUST NOT modify currentTally
  // If candidateId not in tally, add it with count 1
  let tally = structuredClone(currentTally)

  if(!tally[candidateId]){
    tally[candidateId] = 1
  }
  else {
    tally[candidateId]++;
  }
  return tally
  

}


