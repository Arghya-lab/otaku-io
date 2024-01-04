import chroma from "chroma-js";

export const shade = (color, value, opacity=1 ) => {
  // value should be -4.5 to 4.5 log scale

  // Note that for hue-less colors (black, white, and grays), the hue component will be NaN
  const hslFormat = chroma(color).hsl(); //  [166.12,0.58,0.59,1]
  const baseColor = chroma.hsl(hslFormat[0], 0.94, 0.50);

  return chroma(baseColor).darken(value).alpha(opacity);
};
