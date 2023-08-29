//=============================================================================
// Yanfly Engine Plugins - Message Core
// YEP_MessageCore.js
//=============================================================================
// The Chinese translation of this plug-in is only for the convenience of the 
// producer to watch during the game production process, not for others. 
// All copyrights are owned by the original author YEP.
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MessageCore = true;

var Yanfly = Yanfly || {};
Yanfly.Message = Yanfly.Message || {};

//=============================================================================
 /*:
 * @plugindesc v1.12 向消息窗口添加更多功能，以自定義消息的顯示方式和功能。
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Default Rows
 * @text 默認行數
 * @desc 這是消息框將具有的默認行數。
 * Default: 4
 * @default 4
 *
 * @param Default Width
 * @text 默認寬度
 * @desc 這是消息框的默認寬度（以像素為單位）。
 * 默認: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Face Indent
 * @text 面圖縮進
 * @desc 如果使用面部圖形，則這是文本縮進的量。 Default: Window_Base._faceWidth + 24
 * If using a face graphic, this is how much text indents by.
 * @default Window_Base._faceWidth + 24
 *
 * @param Fast Forward Key
 * @text 快進鍵
 * @desc This is the key used for fast forwarding.
 * @default pagedown
 *
 * @param Enable Fast Forward
 * @text 啟用快進
 * @desc 默認情況下為您的消息啟用快進按鈕嗎？
 * NO - false     YES - true
 * Enable fast forward button for your messages by default?
 * @default true
 *
 * @param Word Wrapping
 * @text 自動換行
 * @desc 使用此選項默認啟用或禁用自動換行。
 * OFF - false     ON - true
 * Use this to enable or disable word wrapping by default.
 * @default false
 *
 * @param Description Wrap
 * @text 描述換行
 * @desc 啟用或禁用描述的自動換行。Enable or disable word wrapping for descriptions.
 * OFF - false     ON - true
 * @default false
 *
 * @param Word Wrap Space
 * @text 自動換行空間
 * @desc Insert a space with manual line breaks?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Font---
 * @default
 *
 * @param Font Name
 * @text 字型名稱
 * @desc This is the default font used for the Message Window.
 * Default: GameFont
 * @default GameFont
 *
 * @param Font Size
 * @text 字的大小
 * @desc This is the default font size used for the Message Window.
 * Default: 28
 * @default 28
 *
 * @param Font Size Change
 * @text 改變文字大小的值
 * @desc Whenever \{ and \} are used, they adjust by this value.
 * Default: 12
 * @default 12
 *
 * @param Font Changed Max
 * @text 最大文字大小
 * @desc This is the maximum size achieved by \{.
 * Default: 96
 * @default 96
 *
 * @param Font Changed Min
 * @text 最小文字大小
 * @desc This is the minimum size achieved by \{.
 * Default: 12
 * @default 12
 *
 * @param Font Outline
 * @text 文字外框
 * @desc This is the default font outline width for messages.
 * Default: 4
 * @default 4
 *
 * @param ---Name Box---
 * @default
 *
 * @param Name Box Buffer X
 * @text 名稱框緩衝區 X
 * @desc This is the buffer for the x location of the Name Box.
 * @default -28
 *
 * @param Name Box Buffer Y
 * @text 名稱框緩衝區 Y
 * @desc This is the buffer for the y location of the Name Box.
 * @default 0
 *
 * @param Name Box Padding
 * @text 名稱框留白
 * @desc This is the value for the padding of the Name Box.
 * @default this.standardPadding() * 4
 *
 * @param Name Box Color
 * @text 名稱框顏色
 * @desc This is the text color used for the Name Box.
 * @default 0
 *
 * @param Name Box Clear
 * @text 名稱框要清除嗎
 * @desc Do you wish for the Name Box window to be clear?
 * NO - false     YES - true
 * @default false
 *
 * @param Name Box Added Text
 * @text 名稱框添加文本
 * @desc 每當使用名稱框時，總會添加此文本。
 * 這可用於自動設置顏色。
 * @default \c[6]
 *
 * @help
 * ============================================================================
 * 介紹
 * ============================================================================
 * 雖然 RPG Maker MV Ace 確實大大改進了消息系統，但添加更多功能也沒什麼壞處，
 * 例如名稱窗口、轉換文本代碼以寫出物品、武器、盔甲的圖標和/或名稱，以及更多更快
 * 的方式。 該腳本還使開發人員能夠在遊戲過程中調整消息窗口的大小，為其提供單獨
 * 的字體，並為玩家提供文本快進功能。
 *
 * ============================================================================
 * 自動換行
 * ============================================================================
 * 現在可以通過消息系統進行自動換行。 您可以使用插件命令啟用和禁用自動換行。 
 * 使用自動換行時，如果單詞超出消息窗口區域，它將自動轉到下一行。 也就是說，
 * 自動換行將禁用編輯器的換行符，並要求您使用插件提供的換行符：
 * 
 * <br> 或 <line break> 是應用換行符的文本代碼。
 * 在您希望開始新行的部分之前或之後使用此選項。
 * 請記住，自動換行主要用於消息窗口。 但是，在您希望看到自動換行的其他位置
 * （例如項目描述），請在文本開頭插入 <WordWrap> 以啟用它。
 *
 * ============================================================================
 * 文本代碼
 * ============================================================================
 *
 * 通過在消息中使用某些文本代碼，您可以讓遊戲將其替換為以下內容：
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * Text Code   Function
 *   \V[n]       替換為第 n 個變量的值。
 *   \N[n]       替換為第 n 個演員的名字。
 *   \P[n]       替換為第n名隊員姓名。
 *   \G          替換為貨幣單位。
 *   \C[n]       用第 n 種顏色繪製後續文本。
 *   \I[n]       繪製第 n 個圖標。
 *   \{          將文本大小增加一級。
 *   \}          將文本大小減小一級。
 *   \\          替換為反斜杠字符。
 *   \$          打開金窗。
 *   \.          等待 1/4 秒。
 *   \|          等待 1 秒。
 *   \!          等待按鈕輸入。
 *   \>          一次在同一行上顯示剩餘文本。
 *   \<          取消一次顯示全部文本的效果。
 *   \^          顯示文本後不要等待輸入。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Wait:       Effect:
 *    \w[x]     - 等待 x 幀（60 幀 = 1 秒）。 僅消息窗口。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  NameWindow: Effect:
 *    \n<x>     - 創建一個帶有 x 字符串的名稱框。 左邊。 *
 *    \nc<x>    - 創建一個帶有 x 字符串的名稱框。 居中。 *
 *    \nr<x>    - 創建一個帶有 x 字符串的名稱框。 右邊。 *
 *
 *              *注意：僅適用於消息窗口。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Line Break  Effect:
 *    <br>      - 如果使用自動換行模式，這將導致換行。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Position:   Effect:
 *    \px[x]    - 將文本的 x 位置設置為 x。
 *    \py[x]    - 將文本的 y 位置設置為 y。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Outline:    Effect:
 *   \oc[x]    - 將輪廓顏色設置為 x。
 *   \ow[x]    - 將輪廓寬度設置為 x。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Font:       Effect:
 *    \fr       - 重置所有字體更改。
 *    \fs[x]    - 將字體大小更改為 x。
 *    \fn<x>    - 將字體名稱更改為 x。
 *    \fb       - 切換字體粗細。
 *    \fi       - 切換字體斜體。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Actor:      Effect:
 *    \af[x]    - 顯示演員 x 的臉。 *
 *    \ac[x]    - 寫出演員的CLASS名稱。
 *    \an[x]    - 寫出演員的暱稱。
 *
 *              *注意：僅適用於消息窗口。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Party:      Effect:
 *    \pf[x]    - 顯示隊員x的面。 *
 *    \pc[x]    - 寫出隊員x的班級名稱。
 *    \pn[x]    - 寫出隊員x的暱稱。
 *
 *              *注意：僅適用於消息窗口。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Names:      Effect:
 *    \nc[x]    - 寫出班級 x 的名字。
 *    \ni[x]    - 寫出項目 x 的名稱。
 *    \nw[x]    - 寫出武器 x 的名稱。
 *    \na[x]    - 寫出盔甲x的名字。
 *    \ns[x]    - 寫出技能 x 的名稱。
 *    \nt[x]    - 寫出狀態 x 的名稱。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Icon Names: Effect:
 *    \ii[x]    - 寫出項目 x 的名稱，包括圖標。
 *    \iw[x]    - 寫出武器 x 的名稱，包括圖標。
 *    \ia[x]    - 寫出盔甲 x 的名稱，包括圖標。
 *    \is[x]    - 寫出技能 x 的名稱，包括圖標。
 *    \it[x]    - 寫出狀態 x 的名稱，包括圖標。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * 這些是隨該腳本添加的文本代碼。 請記住，其中一些文本代碼僅適用於消息窗口。
 * 否則，他們將尋求幫助描述、演員傳記等。
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 以下是一些插件命令，您可以通過事件編輯器使用它們來更改消息系統的各個方面。
 *
 * 插件命令
 *   MessageRows 6
 *   - 將顯示的消息行更改為 6。如果您使用連續顯示文本事件，
 *   這將繼續顯示以下行的文本，直到達到行限制。 此後的任何內容都會被切斷，
 *   直到下一條消息開始為止，以避免意外重疊。
 *
 *   MessageWidth 400
 *   - 將消息窗口寬度更改為 400 像素。 這將切斷所有顯示在右側太遠的單詞，因此請進行相應調整！
 *
 *   EnableWordWrap
 *   - 啟用自動換行。 如果一個單詞超出了窗口大小，它將自動移動到下一行。 請記住，您將需要使用 \br 來執行換行。
 *
 *   DisableWordWrap
 *   - 這會禁用自動換行。 在編輯器中開始新行的地方將自動換行。
 *
 *   EnableFastForward
 *   - 啟用快進鍵以處理消息。
 *
 *   DisableFastForward
 *   - 禁用快進鍵處理消息。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12:
 * - 'Word Wrap Space' parameter no longer leaves a space at the beginning of
 * each message.
 *
 * Version 1.11:
 * - Added 'Font Outline' parameter for the plugin parameters. This adjusts the
 * font outline width used by default for only message fonts.
 *
 * Version 1.10:
 * - Updated the Message Row system for Extended Message Pack 1's Autosizing
 * feature to work with extended heights.
 *
 * Version 1.09:
 * - Replaced 'Fast Forward' parameter with the 'Fast Forward Key' parameter
 * and 'Enable Fast Forward' parameter. Two new Plugin Commands are added. They
 * are 'EnableFastForward' and 'DisableFastForward' for control over when fast
 * forwarding is allowed as to not cause timed cutscenes to desynch.
 *
 * Version 1.08:
 * - Fixed a bug regarding Input Number positioning when the Message Window's
 * position was middle.
 *
 * Version 1.07:
 * - Added 'Word Wrap Space' for word wrap users. This parameter will leave a
 * space behind for those who want a space left behind.
 *
 * Version 1.06:
 * - Fixed a bug that would cause masking problems with mobile devices.
 *
 * Version 1.05:
 * - Fixed a bug that would cause the namebox window to appear distorted.
 *
 * Version 1.04:
 * - Fixed a bug that captured too many text codes with the namebox window.
 * - Timed Name Window's closing speed with main window's closing speed.
 *
 * Verison 1.03:
 * - Fixed a bug with textcodes that messed up wordwrapping.
 * - Fixed a bug with font reset, italic, and bold textcodes.
 *
 * Version 1.02:
 * - Namebox Window's overlap feature that's in every MV window is now disabled
 * to allow for overlapping with main message window.
 * - Updated window positioning for Branch Choices, Number Input, and Item
 * Selection windows.
 *
 * Version 1.01:
 * - Added 'Description Wrap' into the parameters to allow for all item
 * descriptions to be automatically processed with word wrapping.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_MessageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MSGDefaultRows = String(Yanfly.Parameters['Default Rows']);
Yanfly.Param.MSGDefaultWidth = String(Yanfly.Parameters['Default Width']);
Yanfly.Param.MSGFaceIndent = String(Yanfly.Parameters['Face Indent']);
Yanfly.Param.MSGFastForwardKey = String(Yanfly.Parameters['Fast Forward Key']);
Yanfly.Param.MSGFFOn = eval(String(Yanfly.Parameters['Enable Fast Forward']));
Yanfly.Param.MSGWordWrap = String(Yanfly.Parameters['Word Wrapping']);
Yanfly.Param.MSGDescWrap = String(Yanfly.Parameters['Description Wrap']);
Yanfly.Param.MSGWrapSpace = eval(String(Yanfly.Parameters['Word Wrap Space']));

Yanfly.Param.MSGFontName = String(Yanfly.Parameters['Font Name']);
Yanfly.Param.MSGFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.MSGFontSizeChange = String(Yanfly.Parameters['Font Size Change']);
Yanfly.Param.MSGFontChangeMax = String(Yanfly.Parameters['Font Changed Max']);
Yanfly.Param.MSGFontChangeMin = String(Yanfly.Parameters['Font Changed Min']);
Yanfly.Param.MSGFontOutline = Number(Yanfly.Parameters['Font Outline']) || 4;

Yanfly.Param.MSGNameBoxBufferX = String(Yanfly.Parameters['Name Box Buffer X']);
Yanfly.Param.MSGNameBoxBufferY = String(Yanfly.Parameters['Name Box Buffer Y']);
Yanfly.Param.MSGNameBoxPadding = String(Yanfly.Parameters['Name Box Padding']);
Yanfly.Param.MSGNameBoxColor = Number(Yanfly.Parameters['Name Box Color']);
Yanfly.Param.MSGNameBoxClear = String(Yanfly.Parameters['Name Box Clear']);
Yanfly.Param.MSGNameBoxText = String(Yanfly.Parameters['Name Box Added Text']);

//=============================================================================
// Bitmap
//=============================================================================

Yanfly.Message.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
		Yanfly.Message.Bitmap_initialize.call(this, width, height);
		this.fontBold = false;
};

Yanfly.Message.Bitmap_makeFontNameText = Bitmap.prototype._makeFontNameText;
Bitmap.prototype._makeFontNameText = function() {
    if (this.fontBold) return 'Bold ' + this.fontSize + 'px ' + this.fontFace;
		return Yanfly.Message.Bitmap_makeFontNameText.call(this);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Message.Game_System_initialize =	Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
		Yanfly.Message.Game_System_initialize.call(this);
		this.initMessageSystem();
};

Game_System.prototype.initMessageSystem = function() {
		this._wordWrap = eval(Yanfly.Param.MSGWordWrap);
    this._fastForward = Yanfly.Param.MSGFFOn;
};

Game_System.prototype.messageRows = function() {
		var rows = eval(this._messageRows) || eval(Yanfly.Param.MSGDefaultRows);
		return Math.max(1, Number(rows));
};

Game_System.prototype.messageWidth = function() {
		return eval(this._messageWidth) || eval(Yanfly.Param.MSGDefaultWidth);
};

Game_System.prototype.wordWrap = function() {
		if (this._wordWrap === undefined) this.initMessageSystem();
		return this._wordWrap;
};

Game_System.prototype.setWordWrap = function(state) {
		if (this._wordWrap === undefined) this.initMessageSystem();
		this._wordWrap = state;
};

Game_System.prototype.isFastFowardEnabled = function() {
    if (this._fastForward === undefined) this.initMessageSystem();
    return this._fastForward;
};

Game_System.prototype.setFastFoward = function(state) {
    if (this._fastForward === undefined) this.initMessageSystem();
    this._fastForward = state;
};

//=============================================================================
// Game_Message
//=============================================================================

Game_Message.prototype.addText = function(text) {
		if ($gameSystem.wordWrap()) text = '<WordWrap>' + text;
		this.add(text);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Message.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Message.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MessageRows') $gameSystem._messageRows = args[0];
		if (command === 'MessageWidth') $gameSystem._messageWidth = args[0];
		if (command === 'EnableWordWrap') $gameSystem.setWordWrap(true);
		if (command === 'DisableWordWrap') $gameSystem.setWordWrap(false);
    if (command === 'EnableFastForward') $gameSystem.setFastFoward(true);
    if (command === 'DisableFastForward') $gameSystem.setFastFoward(false);
};

Game_Interpreter.prototype.command101 = function() {
    if (!$gameMessage.isBusy()) {
      $gameMessage.setFaceImage(this._params[0], this._params[1]);
      $gameMessage.setBackground(this._params[2]);
      $gameMessage.setPositionType(this._params[3]);
			while (this.isContinueMessageString()) {
        this._index++;
				if (this._list[this._index].code === 401) {
					$gameMessage.addText(this.currentCommand().parameters[0]);
				}
				if ($gameMessage._texts.length >= $gameSystem.messageRows()) break;
      }
      switch (this.nextEventCode()) {
      case 102:
        this._index++;
        this.setupChoices(this.currentCommand().parameters);
        break;
      case 103:
        this._index++;
        this.setupNumInput(this.currentCommand().parameters);
        break;
      case 104:
        this._index++;
        this.setupItemChoice(this.currentCommand().parameters);
        break;
      }
      this._index++;
      this.setWaitMode('message');
    }
    return false;
};

Game_Interpreter.prototype.isContinueMessageString = function() {
		if (this.nextEventCode() === 101 && $gameSystem.messageRows() > 4) {
			return true;
		} else {
			return this.nextEventCode() === 401;
		}
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Message.Window_Base_resetFontSettings =
		Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    Yanfly.Message.Window_Base_resetFontSettings.call(this);
		this.contents.fontBold = false;
		this.contents.fontItalic = false;
		this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
		this.contents.outlineWidth = Yanfly.Param.MSGFontOutline;
};

Window_Base.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Yanfly.Message.Window_Base_convertEscapeCharacters =
		Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
		text = this.setWordWrap(text);
		text = Yanfly.Message.Window_Base_convertEscapeCharacters.call(this, text);
		text = this.convertExtraEscapeCharacters(text);
		return text;
};

Window_Base.prototype.setWordWrap = function(text) {
		this._wordWrap = false;
		if (text.match(/<(?:WordWrap)>/i)) {
			this._wordWrap = true;
			text = text.replace(/<(?:WordWrap)>/gi, '');
		}
		if (this._wordWrap) {
      var replace = Yanfly.Param.MSGWrapSpace ? ' ' : '';
			text = text.replace(/[\n\r]+/g, replace);
		}
    text = text.replace(/<(?:BR|line break)>/gi, '\n');
		return text;
};

Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
		// Font Codes
		text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
		text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
		text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
		// \AC[n]
		text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
				return this.actorClassName(parseInt(arguments[1]));
		}.bind(this));
		// \AN[n]
		text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
				return this.actorNickname(parseInt(arguments[1]));
		}.bind(this));
		// \PC[n]
		text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
				return this.partyClassName(parseInt(arguments[1]));
		}.bind(this));
		// \PN[n]
		text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
				return this.partyNickname(parseInt(arguments[1]));
		}.bind(this));
		// \NC[n]
		text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
				return $dataClasses[parseInt(arguments[1])].name;
		}.bind(this));
		// \NI[n]
		text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
				return $dataItems[parseInt(arguments[1])].name;
		}.bind(this));
		// \NW[n]
		text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
				return $dataWeapons[parseInt(arguments[1])].name;
		}.bind(this));
		// \NA[n]
		text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
				return $dataArmors[parseInt(arguments[1])].name;
		}.bind(this));
		// \NE[n]
		text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
				return $dataEnemies[parseInt(arguments[1])].name;
		}.bind(this));
		// \NS[n]
		text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
				return $dataSkills[parseInt(arguments[1])].name;
		}.bind(this));
		// \NT[n]
		text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
				return $dataStates[parseInt(arguments[1])].name;
		}.bind(this));
		// \II[n]
		text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataItems);
		}.bind(this));
		// \IW[n]
		text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataWeapons);
		}.bind(this));
		// \IA[n]
		text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataArmors);
		}.bind(this));
		// \IS[n]
		text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataSkills);
		}.bind(this));
		// \IT[n]
		text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
				return this.escapeIconItem(arguments[1], $dataStates);
		}.bind(this));
		// Finish
    return text;
};

Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
};

Window_Base.prototype.partyNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.escapeIconItem = function(n, database) {
		return '\x1bI[' + database[n].iconIndex + ']' + database[n].name;
};

Window_Base.prototype.obtainEscapeString = function(textState) {
    var arr = /^\<(.*?)\>/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '';
    }
};

Yanfly.Message.Window_Base_processEscapeCharacter =
		Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		switch (code) {
		case 'MSGCORE':
				var id = this.obtainEscapeParam(textState);
				if (id === 0) this.resetFontSettings();
				if (id === 1) this.contents.fontBold = !this.contents.fontBold;
				if (id === 2) this.contents.fontItalic = !this.contents.fontItalic;
				break;
		case 'FS':
        this.contents.fontSize = this.obtainEscapeParam(textState);
        break;
    case 'FN':
				var name = this.obtainEscapeString(textState);
				this.contents.fontFace = name;
        break;
		case 'OC':
				var id = this.obtainEscapeParam(textState);
        this.contents.outlineColor = this.textColor(id);
        break;
		case 'OW':
				this.contents.outlineWidth = this.obtainEscapeParam(textState);
        break;
    case 'PX':
        textState.x = this.obtainEscapeParam(textState);
        break;
    case 'PY':
        textState.y = this.obtainEscapeParam(textState);
        break;
		default:
      Yanfly.Message.Window_Base_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

Window_Base.prototype.makeFontBigger = function() {
		var size = this.contents.fontSize + eval(Yanfly.Param.MSGFontSizeChange);
		this.contents.fontSize = Math.min(size, Yanfly.Param.MSGFontChangeMax);
};

Window_Base.prototype.makeFontSmaller = function() {
	var size = this.contents.fontSize - eval(Yanfly.Param.MSGFontSizeChange);
	this.contents.fontSize = Math.max(size, Yanfly.Param.MSGFontChangeMin);
};

Yanfly.Message.Window_Base_processNormalCharacter =
		Window_Base.prototype.processNormalCharacter;
Window_Base.prototype.processNormalCharacter = function(textState) {
		if (this.checkWordWrap(textState)) return this.processNewLine(textState);
		Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState);
};

Window_Base.prototype.checkWordWrap = function(textState) {
		if (!textState) return false;
		if (!this._wordWrap) return false;
		if (textState.text[textState.index] === ' ') {
			var nextSpace = textState.text.indexOf(' ', textState.index + 1);
			var nextBreak = textState.text.indexOf('\n', textState.index + 1);
			if (nextSpace < 0) nextSpace = textState.text.length + 1;
			if (nextBreak > 0) nextSpace = Math.min(nextSpace, nextBreak);
			var word = textState.text.substring(textState.index, nextSpace);
			var size = this.textWidthExCheck(word);
		}
		return (size + textState.x > this.contents.width);
};

Window_Base.prototype.saveCurrentWindowSettings = function(){
		this._saveFontFace = this.contents.fontFace;
		this._saveFontSize = this.contents.fontSize;
		this._savetextColor = this.contents.textColor;
		this._saveFontBold = this.contents.fontBold;
		this._saveFontItalic = this.contents.fontItalic;
		this._saveOutlineColor = this.contents.outlineColor;
		this._saveOutlineWidth = this.contents.outlineWidth;
};

Window_Base.prototype.restoreCurrentWindowSettings = function(){
		this.contents.fontFace = this._saveFontFace;
		this.contents.fontSize = this._saveFontSize;
		this.contents.textColor = this._savetextColor;
		this.contents.fontBold = this._saveFontBold;
		this.contents.fontItalic = this._saveFontItalic;
		this.contents.outlineColor = this._saveOutlineColor;
		this.contents.outlineWidth = this._saveOutlineWidth;
};

Window_Base.prototype.clearCurrentWindowSettings = function(){
		this._saveFontFace = undefined;
		this._saveFontSize = undefined;
		this._savetextColor = undefined;
		this._saveFontBold = undefined;
		this._saveFontItalic = undefined;
		this._saveOutlineColor = undefined;
		this._saveOutlineWidth = undefined;
};

Window_Base.prototype.textWidthExCheck = function(text) {
		var setting = this._wordWrap;
		this._wordWrap = false;
		this.saveCurrentWindowSettings();
		this._checkWordWrapMode = true;
		var value = this.drawTextEx(text, 0, this.contents.height);
		this._checkWordWrapMode = false;
		this.restoreCurrentWindowSettings();
		this.clearCurrentWindowSettings();
		this._wordWrap = setting;
		return value;
};

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.Message.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
		if (eval(Yanfly.Param.MSGDescWrap)) {
			this.setText(item ? '<WordWrap>' + item.description : '');
		} else {
			Yanfly.Message.Window_Help_setItem.call(this, item);
		}
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Window_ChoiceList.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ChoiceList.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Yanfly.Message.Window_ChoiceList_updatePlacement =
		Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
		Yanfly.Message.Window_ChoiceList_updatePlacement.call(this);
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = this._messageWindow.height;
		} else if (messagePosType === 2) {
			this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
		}
};

//=============================================================================
// Window_NumberInput
//=============================================================================

Yanfly.Message.Window_NumberInput_updatePlacement =
		Window_NumberInput.prototype.updatePlacement;
Window_NumberInput.prototype.updatePlacement = function() {
    Yanfly.Message.Window_NumberInput_updatePlacement.call(this);
    var messageY = this._messageWindow.y;
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = this._messageWindow.height;
		} else if (messagePosType === 1) {
			if (messageY >= Graphics.boxHeight / 2) {
					this.y = messageY - this.height;
			} else {
					this.y = messageY + this._messageWindow.height;
			}
		} else if (messagePosType === 2) {
			this.y = Graphics.boxHeight - this._messageWindow.height - this.height;
		}
};

//=============================================================================
// Window_EventItem
//=============================================================================

Yanfly.Message.Window_EventItem_updatePlacement =
		Window_EventItem.prototype.updatePlacement;
Window_EventItem.prototype.updatePlacement = function() {
    Yanfly.Message.Window_EventItem_updatePlacement.call(this);
		var messagePosType = $gameMessage.positionType();
		if (messagePosType === 0) {
			this.y = Graphics.boxHeight - this.height;
		} else if (messagePosType === 2) {
			this.y = 0;
		}
};

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_ScrollText.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.DisableWebGLMask = false;

function Window_NameBox() {
    this.initialize.apply(this, arguments);
}

Window_NameBox.prototype = Object.create(Window_Base.prototype);
Window_NameBox.prototype.constructor = Window_NameBox;

Window_NameBox.prototype.initialize = function(parentWindow) {
    this._parentWindow = parentWindow;
    Window_Base.prototype.initialize.call(this, 0, 0, 240, this.windowHeight());
		this._text = '';
		this._openness = 0;
		this._closeCounter = 0;
		this.deactivate();
		if (eval(Yanfly.Param.MSGNameBoxClear)) {
			this.backOpacity = 0;
			this.opacity = 0;
		}
		this.hide();
};

Window_NameBox.prototype.windowWidth = function() {
		this.resetFontSettings();
    var dw = this.textWidthEx(this._text);
		dw += this.padding * 2;
		var width = dw + eval(Yanfly.Param.MSGNameBoxPadding)
		return Math.ceil(width);
};

Window_NameBox.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_NameBox.prototype.calcNormalCharacter = function(textState) {
    return this.textWidth(textState.text[textState.index++]);
};

Window_NameBox.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameBox.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_NameBox.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_NameBox.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.active) return;
		if (this.isClosed()) return;
		if (this.isClosing()) return;
		if (this._closeCounter-- > 0) return;
		if (this._parentWindow.isClosing()) {
			this._openness = this._parentWindow.openness;
		}
		this.close();
};

Window_NameBox.prototype.refresh = function(text, position) {
		this.show();
		this._text = Yanfly.Param.MSGNameBoxText + text;
		this._position = position;
		this.width = this.windowWidth();
		this.createContents();
		this.contents.clear();
		this.resetFontSettings();
		this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
		var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
		this.drawTextEx(this._text, padding, 0, this.contents.width);
		this._parentWindow.adjustWindowSettings();
		this._parentWindow.updatePlacement();
		this.adjustPositionX();
		this.adjustPositionY();
		this.open();
		this.activate();
		this._closeCounter = 4;
		return '';
};

Window_NameBox.prototype.adjustPositionX = function() {
    if (this._position === 1) {
			this.x = this._parentWindow.x;
			this.x += eval(Yanfly.Param.MSGNameBoxBufferX);
		} else if (this._position === 2) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 3 / 10;
			this.x -= this.width / 2;
		} else if (this._position === 3) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width / 2;
			this.x -= this.width / 2;
		} else if (this._position === 4) {
			this.x = this._parentWindow.x;
			this.x += this._parentWindow.width * 7 / 10;
			this.x -= this.width / 2;
		} else {
			this.x = this._parentWindow.x + this._parentWindow.width;
			this.x -= this.width;
			this.x -= eval(Yanfly.Param.MSGNameBoxBufferX);
		}
		this.x = this.x.clamp(0, Graphics.boxWidth - this.width);
};

Window_NameBox.prototype.adjustPositionY = function() {
		if ($gameMessage.positionType() === 0) {
			this.y = this._parentWindow.y + this._parentWindow.height;
			this.y -= eval(Yanfly.Param.MSGNameBoxBufferY);
		} else {
			this.y = this._parentWindow.y;
			this.y -= this.height;
			this.y += eval(Yanfly.Param.MSGNameBoxBufferY);
		}
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.Message.Window_Message_createSubWindows =
		Window_Message.prototype.createSubWindows;
Window_Message.prototype.createSubWindows = function() {
    Yanfly.Message.Window_Message_createSubWindows.call(this);
		this._nameWindow = new Window_NameBox(this);
		Yanfly.nameWindow = this._nameWindow;
		var scene = SceneManager._scene;
		scene.addChild(this._nameWindow);
};

Window_Message.prototype.numVisibleRows = function() {
		return $gameSystem.messageRows();
};

Window_Message.prototype.windowWidth = function() {
    return $gameSystem.messageWidth();
};

Window_Message.prototype.adjustWindowSettings = function() {
		this.width = this.windowWidth();
		this.height = Math.min(this.windowHeight(), Graphics.boxHeight);
		if (Math.abs(Graphics.boxHeight - this.height) < this.lineHeight()) {
			this.height = Graphics.boxHeight;
		}
		this.createContents();
		this.x = (Graphics.boxWidth - this.width) / 2;
};

Yanfly.Message.Window_Message_startMessage =
		Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_startMessage.call(this);
};

Yanfly.Message.Window_Message_terminateMessage =
		Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    this._nameWindow.deactivate();
		Yanfly.Message.Window_Message_terminateMessage.call(this);
};

Yanfly.Message.Window_Message_newPage =
		Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this.adjustWindowSettings();
		Yanfly.Message.Window_Message_newPage.call(this, textState);
};

Window_Message.prototype.standardFontFace = function() {
    return Yanfly.Param.MSGFontName;
};

Window_Message.prototype.standardFontSize = function() {
    return Yanfly.Param.MSGFontSize;
};

Window_Message.prototype.newLineX = function() {
    if ($gameMessage.faceName() === '') {
			return 0;
		} else {
			return eval(Yanfly.Param.MSGFaceIndent);
		}
};

Window_Message.prototype.isFastForward = function() {
    if (!$gameSystem.isFastFowardEnabled()) return false;
		return Input.isPressed(Yanfly.Param.MSGFastForwardKey);
};

Yanfly.Message.Window_Message_updateInput =
		Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
    if (this.pause && this.isFastForward()) {
			if (!this._textState) {
				this.pause = false;
				this.terminateMessage();
			}
		}
		return Yanfly.Message.Window_Message_updateInput.call(this);
};

Yanfly.Message.Window_Message_updateShowFast =
		Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (this.isFastForward()) this._showFast = true;
		Yanfly.Message.Window_Message_updateShowFast.call(this);
};

Yanfly.Message.Window_Message_updateWait =
		Window_Message.prototype.updateWait;
Window_Message.prototype.updateWait = function() {
    if (this.isFastForward()) return false;
		return Yanfly.Message.Window_Message_updateWait.call(this);
};

Yanfly.Message.Window_Message_startWait =
		Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startWait.call(this, count);
		if (this.isFastForward()) this._waitCount = 0;
};

Yanfly.Message.Window_Message_startPause =
		Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
		if (this._checkWordWrapMode) return;
		Yanfly.Message.Window_Message_startPause.call(this);
};

Window_Message.prototype.convertEscapeCharacters = function(text) {
    text = Window_Base.prototype.convertEscapeCharacters.call(this, text);
		text = this.convertNameBox(text);
		text = this.convertMessageCharacters(text);
    return text;
};

Window_Message.prototype.convertNameBox = function(text) {
		text = text.replace(/\x1bN\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN1\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 1);
		}, this);
		text = text.replace(/\x1bN2\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 2);
		}, this);
		text = text.replace(/\x1bN3\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bNC\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 3);
		}, this);
		text = text.replace(/\x1bN4\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 4);
		}, this);
		text = text.replace(/\x1bN5\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
		text = text.replace(/\x1bNR\<(.*?)\>/gi, function() {
				return Yanfly.nameWindow.refresh(arguments[1], 5);
		}, this);
    return text;
};

Window_Message.prototype.convertMessageCharacters = function(text) {
		text = text.replace(/\x1bAF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1]);
				return this.convertActorFace($gameActors.actor(i));
		}.bind(this));
		text = text.replace(/\x1bPF\[(\d+)\]/gi, function() {
				var i = parseInt(arguments[1]);
				return this.convertActorFace($gameParty.members()[i - 1]);
		}.bind(this));
    return text;
};

Window_Message.prototype.convertActorFace = function(actor) {
		$gameMessage.setFaceImage(actor.faceName(), actor.faceIndex());
    return '';
};

Yanfly.Message.Window_Message_processEscapeCharacter =
		Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '!':
			if (!this.isFastForward()) this.startPause();
      break;
		case 'W':
			this.startWait(this.obtainEscapeParam(textState));
    default:
      Yanfly.Message.Window_Message_processEscapeCharacter.call(this,
				code, textState);
      break;
    }
};

//=============================================================================
// End of File
//=============================================================================
