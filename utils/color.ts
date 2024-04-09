import chroma from "chroma-js";

export const shade = (
  color: string | number | chroma.Color,
  darkenValue = 0,
  opacity = 1
) => {
  // darkenValue should be -4.5 to 4.5 log scale

  // Note that for hue-less colors (black, white, and grays), the hue component will be NaN
  const hslFormat = chroma(color).hsl(); //  [166.12,0.58,0.59,1]
  const baseColor = chroma.hsl(hslFormat[0], 0.94, 0.5);

  return chroma(baseColor).darken(darkenValue).alpha(opacity);
};

export function adjustTextColor(textColor: string, bgColor: string) {
  const textLuminance = chroma(textColor).luminance();
  const bgLuminance = chroma(bgColor).luminance();
  const contrastRatio =
    (Math.max(textLuminance, bgLuminance) + 0.05) /
    (Math.min(textLuminance, bgLuminance) + 0.05);

  if (contrastRatio < 2) {
    const labColor = chroma(textColor).lab();

    labColor[0] = bgLuminance + 0.05;
    const adjustedColor = chroma.lab(labColor[0], labColor[1], labColor[2]);
    return adjustedColor.hex();
  }
  return textColor;
}
