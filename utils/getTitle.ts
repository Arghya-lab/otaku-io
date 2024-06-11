export default function getTitle(
  animeTitle:
    | string
    | {
        romaji?: string;
        english?: string;
        native?: string;
        userPreferred?: string;
      }
) {
  return typeof animeTitle === "string"
    ? animeTitle
    : animeTitle?.english ||
        animeTitle?.romaji ||
        animeTitle?.userPreferred ||
        animeTitle?.native ||
        "";
}
