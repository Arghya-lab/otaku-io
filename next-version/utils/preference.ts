// import axios from "axios";

// export const setPreference = async () => {
//   try {
//     const res = await axios.get("/api/preference");
//     const data = res.data;
//     localStorage.setItem("autoNext", JSON.stringify(data.autoNext));
//     localStorage.setItem("autoPlay", JSON.stringify(data.autoPlay));
//     localStorage.setItem("autoSkip", JSON.stringify(data.autoSkip));
//     localStorage.setItem("isDub", JSON.stringify(data.isDub));
//     localStorage.setItem(
//       "playbackQuality",
//       JSON.stringify(data.playbackQuality)
//     );
//     localStorage.setItem("seekSeconds", JSON.stringify(data.seekSeconds));
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// export const getPreferenceFromLocalStorage = () => {
//   const autoNext = JSON.parse(localStorage.getItem("autoNext") || "");
//   const autoPlay = JSON.parse(localStorage.getItem("autoPlay") || "");
//   const autoSkip = JSON.parse(localStorage.getItem("autoSkip") || "");
//   const isDub = JSON.parse(localStorage.getItem("isDub") || "");
//   const playbackQuality = JSON.parse(
//     localStorage.getItem("playbackQuality") || ""
//   );
//   const seekSeconds = JSON.parse(localStorage.getItem("seekSeconds") || "");

//   return
// };
