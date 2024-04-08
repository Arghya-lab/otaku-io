function isAutoplayWithSoundAllowed() {
  // Create a dummy video element
  const video = document.createElement("video");

  // Check if autoplay with sound is supported
  const isSupported = "autoplay" in video && "muted" in video;

  // Check if autoplay is allowed by the browser
  const isAllowed = !!(document.documentElement as any)?.autoplayAllowed;

  return isSupported && isAllowed ;
}
