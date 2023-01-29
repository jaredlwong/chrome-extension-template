console.log("🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃");
console.log("extension background script loaded");
console.log("🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃🎃");

chrome.action.onClicked.addListener(async (tab) => {
  console.log("👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹");
  console.log("extension clicked");
  console.log("👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹👹");
  const tabId = tab.id;
  if (!tabId) {
    return;
  }
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["js/content_script.js"],
  });
});
