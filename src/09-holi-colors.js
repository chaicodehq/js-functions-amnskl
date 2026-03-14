/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Agar either color null/invalid, return null
  if(typeof color1 !== "object" || Array.isArray(color1) || !color1 || typeof color2 !== "object" || Array.isArray(color2) || !color2)
    return null;

  // Mix two colors by averaging their RGB values
  // New name: `${color1.name}-${color2.name}`
  const name = `${color1.name}-${color2.name}`
  const r = Math.round((color1.r + color2.r)/2)
  const g = Math.round((color1.g + color2.g)/2)
  const b = Math.round((color1.b + color2.b)/2)
  // Round RGB values to integers
  // MUST NOT modify color1 or color2

  //    mixColors(red, blue)
  //    // => { name: "red-blue", r: 128, g: 0, b: 128 }
  //    // red and blue objects are UNCHANGED

  return {
    name, 
    r, 
    g,
    b
  }
}

export function adjustBrightness(color, factor) {
  //  Agar color null or factor not number, return null
  if(typeof color !== "object" || Array.isArray(color) || !color || typeof factor !== "number" || (!factor && factor !== 0))
    return null
  //  Multiply each RGB by factor, clamp to 0-255 range
  const {r, g, b} = color;
  //  Round to integers using Math.round
  return {
    name : color.name,
    r : Math.min(Math.round(r*factor), 255),
    g : Math.min(Math.round(g*factor), 255),
    b : Math.min(Math.round(b*factor), 255),
  }
  //  Name stays same
  //  MUST NOT modify original color



}

export function addToPalette(palette, color) {
  //  Agar color null/invalid, return copy of palette
  if(!color || typeof color !== "object" || Array.isArray(color))
    return [...palette];
  //  Return NEW array with color added at end
  //  MUST NOT modify original palette array
  //  Agar palette not array, return [color]
  if(!Array.isArray(palette))
    return [color];

  return [...palette, color]


}

export function removeFromPalette(palette, colorName) {
  // Agar palette not array, return []
  if(!Array.isArray(palette))
    return []

  const index = palette.findIndex(element => element.name === colorName) 
  // Return NEW array without the color with that name

  if(index < 0)
    return [...palette]
  return [...palette.slice(0,index), ...palette.slice(index + 1, palette.length)]
  // MUST NOT modify original palette
}


  export function mergePalettes(palette1, palette2) {

    let pal1 = []
    let pal2 = []

    //  Agar either not array, treat as empty array
    if(!Array.isArray(palette1))
      pal1 = []
    else
      for(let i = 0; i<palette1.length; i++)
        pal1[i] = palette1[i];


    if(!Array.isArray(palette2))
      pal2 = []
    else
      for(let i = 0; i<palette2.length; i++)
        pal2[i] = palette2[i];
    //  Merge two palettes into NEW array
    //  No duplicate names (keep first occurrence)
    //  MUST NOT modify either original palette


    if(pal1.length === 0)
      return pal2
    if(pal2.length === 0)
      return pal1

    let arr = []

    pal1.forEach(element => {
      //if found in second array
      let index = pal2.findIndex(e => e.name === element.name)
      if(index >= 0){
        //remove that element from second array
        pal2 = [...pal2.slice(0, index), ...pal2.slice(index + 1, pal2.length)]

      }
      //add this element into main arr
      arr.push(element)
    });

    //add remaining elements of pal2 into main arr
    return [...arr, ...pal2]

  }
