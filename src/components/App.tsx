import React from "react";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = require("./App.module.css");

async function executeScript() {
  const [tab] = await chrome.tabs.query({ active: true });
  const tabId = tab.id;
  if (!tabId) return;
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["js/content_script.js"],
  });
}

export const App: React.FC<{ title: string }> = ({ title }) => {
  executeScript();

  return <h1 className={style.h1}>{title}</h1>;
};
