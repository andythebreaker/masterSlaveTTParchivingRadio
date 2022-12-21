```js=
#!/usr/bin/env node

"use strict";
var cmd = require('node-cmd');
var commandExists = require('command-exists');
var commandExists2 = require('command-exists');
var shell = require('shelljs');
const termkit = require('terminal-kit');
const term = termkit.terminal;
const path = require('path');
var fs = require('fs');
const chromafi = require('chromafi');
var currentDir = require('current-dir');
/*
if ( process.argv.length <= 2 ) {
	term.magenta( "Usage is: ./%s <file-path> [-m] [<max-scale>]\n" , path.basename( process.argv[ 1 ] ) ) ;
	term.gray( "-m: load inside a ScreenBuffer and interactively move the image\n" ) ;
	process.exit( 1 ) ;
}
*/


var screen, image, filler, move, maxScale, SB;//,
//	url = process.argv[ 2 ] ;

if (term.support['24bitsColors']) {
	SB = termkit.ScreenBufferHD;
	filler = {
		attr: {
			color: { r: 0, g: 0, b: 0 },
			bgColor: { r: 0, g: 0, b: 0 }
		}
	};
}
else {
	SB = termkit.ScreenBuffer;
	filler = {
		attr: {
			color: 'black',
			bgColor: 'black',
		}
	};
}


// Can't depend on minimist just for a sample code, so we had to parse the command line by ourself
if (process.argv[3] === '-m') {
	move = true;
	maxScale = process.argv[4] || 2;
}
else {
	if (process.argv[4] === '-m') {
		move = true;
		maxScale = process.argv[3] || 2;
	}
	else {
		move = false;
		maxScale = process.argv[3] || 1;
	}
}



if (!move) {
	term.drawImage( /*url*/"./icon.jpg", {
		shrink: {
			width: term.width * maxScale,
			height: (term.height - 1) * 2 * maxScale
		}
	});
	term.slowTyping(
		'\n',	//'masterSlaveTTParchivingRadio\n',
		{ flashStyle: term.brightWhite },
		function () {
			term.table([
				['主從式', 'TTParchiving', 'Radio'],
				['ttp/akb 相關影片備份頻道', '之影片', '轉為純音檔'],
				['並自動化佈署為', '電台/podcast rss', '供智慧型手機撥放'],
				['本服務運行於區域網路', '並暫只支援linux os', '運作在port...'],
			], {
				hasBorder: true,
				contentHasMarkup: true,
				borderChars: 'lightRounded',
				borderAttr: { color: 'orange' },
				textAttr: { bgColor: 'default' },
				//firstCellTextAttr: { bgColor: 'orange' },
				//firstRowTextAttr: { bgColor: 'orange' },
				//firstColumnTextAttr: { bgColor: 'orange' },
				width: 60,
				fit: true   // Activate all expand/shrink + wordWrap
			}
			);
			commandExists('python', function (err, commandExists) {
				if (commandExists) {
					// proceed confidently knowing this command is available
					term.table([
						['您的系統可以使用', 'python', '指令']
					], {
						hasBorder: false,
						contentHasMarkup: true,
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'blue' },
						firstRowTextAttr: { bgColor: 'yellow' },
						firstColumnTextAttr: { bgColor: 'red' },
						checkerEvenCellTextAttr: { bgColor: 'gray' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
				} else {
					commandExists2('python3', function (err, commandExists) {
						if (commandExists) {
							// proceed confidently knowing this command is available
							term.table([
								['您的系統可以使用', 'python3', '指令']
							], {
								hasBorder: false,
								contentHasMarkup: true,
								textAttr: { bgColor: 'default' },
								firstCellTextAttr: { bgColor: 'blue' },
								firstRowTextAttr: { bgColor: 'yellow' },
								firstColumnTextAttr: { bgColor: 'red' },
								checkerEvenCellTextAttr: { bgColor: 'gray' },
								width: 60,
								fit: true   // Activate all expand/shrink + wordWrap
							}
							);
						} else {

							//--
							term.table([
								['您的系統不可以使用', 'python', '指令'],
								['您的系統不可以使用', 'python3', '指令']
							], {
								hasBorder: true,
								contentHasMarkup: true,
								borderChars: 'lightRounded',
								borderAttr: { color: 'blue' },
								textAttr: { bgColor: 'default' },
								firstCellTextAttr: { bgColor: 'blue' },
								firstRowTextAttr: { bgColor: 'yellow' },
								firstColumnTextAttr: { bgColor: 'red' },
								width: 60,
								fit: true   // Activate all expand/shrink + wordWrap
							}
							);
						}
						question();
						//question();
					});
					//--
					/*term.table([
						['您的系統不可以使用', 'python', '指令']
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'blue' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'blue' },
						firstRowTextAttr: { bgColor: 'yellow' },
						firstColumnTextAttr: { bgColor: 'red' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);*/
				}
			});
			//	process.exit() ; 
		}
	);


	return;
}

function question() {
	/*term('Do you like javascript? [Y|n]\n');

	// Exit on y and ENTER key
	// Ask again on n
	term.yesOrNo({ yes: ['y', 'ENTER'], no: ['n'] }, function (error, result) {

		if (result) {
			term.green("'Yes' detected! Good bye!\n");
			process.exit();
		}
		else {
			term.red("'No' detected, are you sure?\n");
			question();
		}
	});*/
	term.cyan('這是主目錄:(請選擇功能並按下enter進入；使用方向鍵)\n');

	//var items = fs.readdirSync( process.cwd() ) ;
	term.gridMenu(//singleColumnMenu(
		[
			'更新rss檔案',
			'檢視排程',
			'使用說明',
			'設定排程',
			'首次使用',
			'啟動伺服器',
			'檢視來源頻道',
			'檢視rss檔案',
			'檢視本機虛擬電台的音訊列表',
			'檢視待下載影片',
			'檢視待轉音檔之影片',
			'檢視已完成影片',
			'檢視目前(工作)路徑',
			'離開',
		]
		/*items*/, function (error, response) {

			term('\n').eraseLineAfter.green(
				"#%s selected: %s (%s,%s)\n",
				response.selectedIndex,
				response.selectedText,
				response.x,
				response.y
			);
			switch (response.selectedText) {
				case '檢視目前(工作)路徑':
					term.table([
						['目前(工作)路徑', ':', currentDir()]
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					question();
			break;
				case '檢視排程':
					cmd.run(
						`crontab -l`,
						function (err, data, stderr) {
							console.log('data : ', data);
							console.log('err : ', err);
							console.log('stderr : ', stderr);
							question();
						}
					);
					break;
				case '檢視rss檔案':
					cmd.run(
						`./genRSS/genRSS.py -d ./aud/ -H 192.168.0.101:48548`,
						function (err, data, stderr) {
							console.log(chromafi(String(data), {
								lang: 'xml',
								lineNumberPad: 0,
								codePad: 0,
								indent: 2,
								lineNumbers: true,
							}));
							console.log('err : ', err);
							console.log('stderr : ', stderr);
							question();
						}
					);
					break;
					case '更新rss檔案':
					cmd.run(
						`./genRSS/genRSS.py -d ./aud/ -H 192.168.0.101:48548 > feed.rss`,
						function (err, data, stderr) {
							console.log('data : ',data);
							console.log('err : ', err);
							console.log('stderr : ', stderr);
							question();
						}
					);
					break;
				case '檢視待下載影片':
					//console.log(shell.ls('todo'));
					shell.ls('todo').forEach(function (filetodo) {
						term.brightMagenta(filetodo + '\n');
					});
					//process.exit();
					question();
					break;
				case '檢視待轉音檔之影片':
					shell.ls('vid').forEach(function (filetodo) {
						term.brightMagenta(filetodo + '\n');
					});
					question();
					break;
				case '檢視已完成影片':
					shell.ls('fin').forEach(function (filetodo) {
						term.brightMagenta(filetodo + '\n');
					});
					question();
					break;
				case '檢視本機虛擬電台的音訊列表':
					shell.ls('aud').forEach(function (filetodo) {
						term.brightMagenta(filetodo + '\n');
					});
					question();
					break;
				case '離開':
					term.table([
						['離開', '將關閉', '...']
					], {
						hasBorder: true,
						contentHasMarkup: true,
						borderChars: 'lightRounded',
						borderAttr: { color: 'Magenta' },
						textAttr: { bgColor: 'default' },
						firstCellTextAttr: { bgColor: 'Magenta' },
						firstRowTextAttr: { bgColor: 'Magenta' },
						firstColumnTextAttr: { bgColor: 'Magenta' },
						width: 60,
						fit: true   // Activate all expand/shrink + wordWrap
					}
					);
					process.exit();
					break;

				default:
					break;
			}
			//process.exit();
		});
}

//question() ;

async function loadImage() {
	image = await SB.loadImage(
		url,
		{
			terminal: term,
			shrink: { width: term.width * maxScale, height: (term.height - 1) * 2 * maxScale }
		}
	);

	screen = SB.create({ dst: term, height: term.height - 1, noFill: true });
	screen.y = 2;

	image.dst = screen;

	term.clear();
	term.grabInput();
	term.hideCursor();

	term.on('key', (key, matches, data) => {

		var offset, stats;

		switch (key) {
			case 'UP':
				offset = Math.round(term.height / 20);
				screen.vScroll(offset, true);	// Perform term.scrollDown()
				image.y += offset;
				image.draw();
				stats = screen.draw({ delta: true });	// This only redraws new lines on the top
				//console.error( stats ) ;
				break;
			case 'DOWN':
				offset = Math.round(term.height / 20);
				screen.vScroll(- offset, true);	// Perform term.scrollUp()
				image.y += - offset;
				image.draw();
				stats = screen.draw({ delta: true });	// This only redraws new lines on the bottom
				//console.error( stats ) ;
				break;
			case 'LEFT':
				offset = Math.round(term.width / 20);
				image.x += offset;
				redraw();
				break;
			case 'RIGHT':
				offset = Math.round(term.width / 20);
				image.x -= offset;
				redraw();
				break;
			case 'q':
			case 'CTRL_C':
				terminate();
				break;
		}
	});

	redraw();
	term.moveTo(1, 1).bgWhite.blue.eraseLineAfter("Arrows keys: move   Q/CTRL-C: quit");
}


function redraw() {
	var stats;

	screen.fill(filler);
	image.draw();
	stats = screen.draw({ delta: true });
	//console.error( stats ) ;
}



function terminate() {
	term.hideCursor(false);
	//term.applicationKeypad( false ) ;
	term.styleReset();
	term.resetScrollingRegion();
	term.moveTo(term.width, term.height);
	term('\n');
	term.processExit();
}



loadImage();
