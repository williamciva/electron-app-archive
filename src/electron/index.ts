import path from "path";
import { app, BrowserWindow } from "electron";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL(
    process.env.ELECTRON_IS_DEV
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../build/react/index.html")}`
  );

  // Open the DevTools.
  if (process.env.ELECTRON_IS_DEV) {
    win.webContents.openDevTools({ mode: 'detach' });
  }

};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
