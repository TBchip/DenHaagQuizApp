const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const screen = electron.screen;
const path = require('path');

global.questionStats = {
	correctAnswers: 0,
	wrongAnswers: 0,
	totalQuestions: 0
}

if (require('electron-squirrel-startup')) {
	app.quit();
}

const startApp = () => {
	const mainWindow = new BrowserWindow({
		width: screen.getPrimaryDisplay().workAreaSize.width,
		height: screen.getPrimaryDisplay().workAreaSize.height,
		minWidth: 600,
		minHeight: 700,
		icon: path.join(__dirname, "imgs/denhaagvlag.jpg"),
		webPreferences: {
			nodeIntegration: true,
		},
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