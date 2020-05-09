const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
	app.quit();
}

const startApp = () => {
	const mainWindow = new BrowserWindow({
		width: screen.getPrimaryDisplay().workAreaSize.width,
		height: screen.getPrimaryDisplay().workAreaSize.height,
		minWidth: 600,
		minHeight: 700,
	});

	mainWindow.setBounds({ x: 0, y: 0 })
	mainWindow.maximize();
	mainWindow.setMenu(null);
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	mainWindow.webContents.openDevTools();
};

app.on('ready', startApp);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});