//=============================================================================
// CharacterGraphicExtend.js
// ----------------------------------------------------------------------------
// (C) 2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.10.4 2020/03/22 MOG_ChronoEngine.jsとの間で発生するエラーを解消(全面的な競合対策ではありません)
//                   MOG_CharPoses.jsとの競合を解消
// 1.10.3 2020/01/25 フレーム更新時に無駄な処理が実行されることでパフォーマンスが低下していた問題を修正
// 1.10.2 2018/11/19 UltraMode7との競合を解消(by けんせい様)
//                   TMNamePop.jsとの併用時、ネームポップがイベント画像の傾き、反転に影響されないよう修正
// 1.10.1 2018/10/05 敵キャラやピクチャを表示する際、エディタで元画像にインデックス1以外を指定していると画像が表示されない問題を修正
// 1.10.0 2018/09/25 イベント画像をトリミングして表示できる機能を追加
// 1.9.2 2018/07/11 EventEffects.jsとの競合を解消
// 1.9.1 2018/06/05 メモ欄タグで変数指定＋並列処理で変数操作にて発生するいくつかの問題を修正（by 奏ねこま様）
// 1.9.0 2018/02/20 不透明度をメモ欄で設定できる機能を追加
// 1.8.0 2017/08/27 マップで使用しているタイルセット以外のタイルセットを使ったイベントを作成できる機能を追加
// 1.7.0 2017/08/24 画像を別のものに変更するスクリプトを追加
// 1.6.1 2017/08/06 ヘルプを修正
// 1.6.0 2017/08/05 アクターのバトラー画像をマップ上に表示する機能を追加
// 1.5.3 2017/06/22 プラグインを適用していないデータをロードしたときにプレイヤーが表示されない問題を修正
// 1.5.2 2017/06/11 プライオリティの設定を0にすると設定が有効にならない問題を修正
// 1.5.1 2017/06/11 GALV_CamControl.jsとの競合を解消
// 1.5.0 2017/03/28 色調変更機能を追加
// 1.4.2 2017/02/03 メモ欄に制御文字\v[n]を使った場合に、一度マップ移動しないと反映されない問題を修正しました。
// 1.4.1 2016/11/27 T_dashMotion.jsとの競合を解決
// 1.4.0 2016/11/21 複数のページに対して別々の画像を割り当てる機能を追加しました。
// 1.3.0 2016/07/16 以下の機能を追加しました。
//                  遠景をイベントグラフィックとして利用可能
//                  イベント画像の原点を変更する機能、イベント画像の画面表示位置を絶対値指定する機能
// 1.2.1 2016/05/08 HalfMove.jsとの競合を解消
// 1.2.0 2016/03/19 戦闘発生時にイベントを消去しない設定を追加しました。
// 1.1.2 2016/03/04 本体バージョン1.1.0に合わせてキャラクターの乗算とスクリーンに対応しました。
// 1.1.1 2016/01/21 競合対策（YEP_MessageCore.js）
// 1.1.0 2016/01/11 キャラクターに回転角を設定する機能を追加
//                  移動ルートの指定のスクリプトから、回転角、拡大率、位置調整ができる機能を追加
// 1.0.0 2016/01/08 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 字符圖形顯示擴展插件 1.10
 * @author トリアコンタン
 *
 * @param イベント消去無効
 * @desc 禁用在遭遇發生時暫時清除事件的效果。
 * @default false
 * @type boolean
 *
 * @help 擴展事件的圖形顯示方式，實現多種表達方式。
 * 請按規定格式填寫事件的備註欄(左上那一小行)。
 * 用逗號分隔項目。 參數可以使用與文本顯示相同的控製字符。
 * 此外，如果您輸入“A”作為頁數，則所有頁面都將成為目標。
 *
 * <CGピクチャ:（事件頁數）,（ファイル名）>
 * 從Picture文件夾中獲取圖像。
 * 不需要寫入如.PNG/.JPG等擴張子。步行動畫等待動畫會被禁用。
 *
 * 例：<CGピクチャ:1,Test> or <CGPicture:1,Test>
 *
 * 〇附加功能
 * 如果您想將不同的圖像分配給多個頁面
 * 為每個頁面創建一個標籤。
 * 在下面的示例中，第一頁使用 aaa.png，第二頁使用 bbb.png。
 * 其他標籤類似。
 * 例：<CGピクチャ:1,aaa><CGピクチャ:2,bbb>
 *
 * 以下是從不同FILE指定圖像的指令。
 * <CG敵キャラ:1,Bat> or <CGEnemy:1,Bat>
 * <CGアイコン:1,128> or <CGIcon:1,128>
 * <CGフェイス:1,Actor1,4> or <CGFace:1,Actor1,4>
 * <CGアクター:1, Actor1_1, 0> or <CGActor:1, Actor1_1, 0>
 * <CG遠景:1,Test> or <CGParallaxes:1,Test>
 *
 * 當心！ ​如果在這些備註字段中指定了文件，則在部署時
 * 可能會作為未使用的文件被排除。
 * 在這種情況下，需要採取重新插入刪除的文件等措施。
 *
 * <CGタイル:（事件頁數）,（横幅）,（高さ）>
 * 從TILE圖塊中獲取圖形。通過指定寬度和高度，
 * 可以在一個事件中表達書架和床。從事件圖像選擇中選擇左上角的圖塊。
 *
 * 例：<CGタイル:1,2,2> or <CGTile:1,2,2>
 *
 * <CGタイルセット:（事件頁數）,（タイルセットID）>
 * 指定TILE的SET
 * 例：<CGタイルセット:1,2> or <CGTileset:1,2>
 *
 * <CGシフト:（事件頁數）,（X座標）,（Y座標）>
 * 按指定移動像素顯示。
 *
 * 例：<CGシフト:1,16,-16> or <CGShift:1,16,-16>
 *
 * <CGプライオリティ:（事件頁數）,（プライオリティ）>
 * 指定頁面啟用時的顯示優先級。
 * 可以設置1到9的值。
 *
 * 例：<CGプライオリティ:1,6> or <CGPriority:1,6>
 *
 * 每個優先級值
 * 0 : 下層瓦片
 * 1 : 低於正常字符
 * 3 : 與普通字符相同
 * 4 : 上層瓷磚
 * 5 : 高於正常字符
 * 6 : 飛艇影子
 * 7 : 氣球
 * 8：動畫
 * 9 : 地圖觸摸目的地（發白光的那個）
 *
 * <CG合成方法:（事件頁數）,（合成方法）>
 * 0:通常 1:加算 2:乗算 3:スクリーン
 *
 * 例：<CG合成方法:1,2> or <CGBlendType:1,2>
 *
 * <CG拡大率:（事件頁數）,（X拡大率）（Y拡大率）>
 * 設置指定頁面啟用時圖形的放大倍數。
 * 負值會使圖像反轉。
 *
 * 例：<CG拡大率:1,100,-100> or <CGScale:1,100,-100>
 *
 * <CG回転角:（事件頁數）,（回転角）>
 * 設置指定頁面啟用時圖形的旋轉角度。
 * 旋轉中心將位於角色的腳下。 設置範圍為 0 至 360。
 *
 * 例：<CG回転角:1,180> or <CGAngle:1,180>
 *
 * <CG原点:（事件頁數）,（X原点）,（Y原点）>
 * 啟用指定頁面時設置圖形原點 (0...100)。
 * 默認情況下，X原點為50，Y原點為100（圖像底部為原點）。
 *
 * 例：<CG原点:1,0,0> or <CGOrigin:1,100,100>
 *
 * <CG絶対座標:（事件頁數）,（X座標）,（Y座標）>
 * 指定指定頁面啟用時的圖形顯示位置。
 * 絕對坐標（與像圖片一樣滾動地圖無關地顯示）。
 * 但是，事件本身的位置不會改變。
 *
 * 例：<CG絶対座標:1,16,-16> or <CGAbsolute:1,16,-16>
 *
 * <CG色調:（事件頁數）,（R値）,（G値）（B値）>
 * 設置指定頁面啟用時的色調（-255 至 255）。
 *
 * 例：<CG色調:1,-255,0,255> or <CGTone:1,-255,0,255>
 *
 * <CG不透明度:（事件頁數）,（合成方法）>
 * 設置指定頁面啟用時圖形的不透明度。
 * 0:透明 - 255:不透明
 *
 * 例：<CG不透明度:1,64> or <CGOpacity:1,64>
 *
 * <CGトリミング:（事件頁數）,（X座標）,（Y座標）,（横幅）,（縦幅）>
 * 將圖像裁剪為指定的矩形並顯示。
 *
 * 例：<CGトリミング:1,0,0,24,24> or <CGトリミング:1,0,0,24,24>
 *
 * 〇スクリプト（高度な設定。移動ルートの指定からスクリプトで実行）
 *
 * ・拡大率の設定
 * this.setScale(（X座標）,（Y座標）);
 * 例：this.setScale(100, 100);
 *
 * ・回転角の設定
 * this.setAngle(（回転角）);
 * 例：this.setAngle(180);
 *
 * ・ピクセル単位位置の設定
 * this.shiftPosition(（X座標）,（Y座標）);
 * 例：this.shiftPosition(24, 24);
 *
 * ・色調の設定
 * this.setTone(（R値）,（G値）（B値）);
 * 例：this.setTone(255, -255, -255);
 *
 * ・画像の変更
 * this.changeImage(（新しいファイル名）, （インデックス）);
 * 例：this.changeImage('Package1', 3);
 *
 * ※1 您無法更改圖像類型（圖片 -> 風景等）。
 * 2 如果省略索引指定，則保持更改前的值。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * EventEffects.jsと併用する場合は、本プラグインを下に配置してください。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function() {
    'use strict';
    var pluginName = 'CharacterGraphicExtend';

    var getParamBoolean = function(paramNames) {
        var value = getParamOther(paramNames);
        return (value || '').toUpperCase() === 'ON' || (value || '').toUpperCase() === 'TRUE';
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };

    var getArgArrayString = function(args, upperFlg) {
        var values = getArgString(args, upperFlg).split(',');
        for (var i = 0; i < values.length; i++) values[i] = values[i].trim();
        return values;
    };

    var getArgString = function(args, upperFlg) {
        args = convertEscapeCharacters(args);
        return upperFlg ? args.toUpperCase() : args;
    };

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    var convertEscapeCharacters = function(text) {
        if (text == null) text = '';
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1], 10));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1], 10));
        }.bind(this));
        text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1], 10) >= 1 ? $gameActors.actor(parseInt(arguments[1], 10)) : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1], 10) >= 1 ? $gameParty.members()[parseInt(arguments[1], 10) - 1] : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    //=============================================================================
    // パラメータの取得とバリデーション
    //=============================================================================
    var paramEventHideInvalid = getParamBoolean(['EventHideInvalid', 'イベント消去無効']);

    //=============================================================================
    // Game_CharacterBase
    //  拡張するプロパティを定義します。
    //=============================================================================
    var _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata      = function(data) {
        _DataManager_extractMetadata.apply(this, arguments);
        this.extractMetadataArray(data);
    };

    DataManager.extractMetadataArray = function(data) {
        var re         = /<([^<>:]+)(:?)([^>]*)>/g;
        data.metaArray = {};
        var match      = true;
        while (match) {
            match = re.exec(data.note);
            if (match) {
                var metaName             = match[1];
                data.metaArray[metaName] = data.metaArray[metaName] || [];
                data.metaArray[metaName].push(match[2] === ':' ? match[3] : true);
            }
        }
    };

    //=============================================================================
    // Game_System
    //  ロード時にプレイヤーの初期化が必要な場合は初期化します。
    //=============================================================================
    var _Game_System_onAfterLoad      = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        _Game_System_onAfterLoad.apply(this, arguments);
        if (!$gamePlayer.hasOwnProperty('_customResource')) {
            $gamePlayer.clearCgInfo();
        }
    };

    //=============================================================================
    // Game_CharacterBase
    //  拡張するプロパティを定義します。
    //=============================================================================
    var _Game_CharacterBase_initMembers      = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.apply(this, arguments);
        this.clearCgInfo();
    };

    Game_CharacterBase.prototype.clearCgInfo = function() {
        this._customResource  = null;
        this._graphicColumns  = 1;
        this._graphicRows     = 1;
        this._additionalX     = 0;
        this._additionalY     = 0;
        this._customPriority  = -1;
        this._scaleX          = 100;
        this._scaleY          = 100;
        this._tileBlockWidth  = 1;
        this._tileBlockHeight = 1;
        this._angle           = 0;
        this._originX         = null;
        this._originY         = null;
        this._absoluteX       = null;
        this._absoluteY       = null;
        this._customTilesetId = 0;
        this.setBlendMode(0);
    };

    Game_CharacterBase.prototype.customResource = function() {
        return this._customResource;
    };

    Game_CharacterBase.prototype.customTilesetId = function() {
        return this._customTilesetId;
    };

    Game_CharacterBase.prototype.graphicColumns = function() {
        return this._graphicColumns;
    };

    Game_CharacterBase.prototype.graphicRows = function() {
        return this._graphicRows;
    };

    Game_CharacterBase.prototype.scaleX = function() {
        return this._scaleX;
    };

    Game_CharacterBase.prototype.scaleY = function() {
        return this._scaleY;
    };

    Game_CharacterBase.prototype.setScale = function(x, y) {
        this._scaleX = x;
        this._scaleY = y;
    };

    Game_CharacterBase.prototype.originX = function() {
        return this._originX;
    };

    Game_CharacterBase.prototype.originY = function() {
        return this._originY;
    };

    Game_CharacterBase.prototype.setOrigin = function(x, y) {
        this._originX = x / 100;
        this._originY = y / 100;
    };

    Game_CharacterBase.prototype.absoluteX = function() {
        return this._absoluteX;
    };

    Game_CharacterBase.prototype.absoluteY = function() {
        return this._absoluteY;
    };

    Game_CharacterBase.prototype.setAbsolute = function(x, y) {
        this._absoluteX = x;
        this._absoluteY = y;
    };

    Game_CharacterBase.prototype.tone = function() {
        return this._tone;
    };

    Game_CharacterBase.prototype.setTone = function(r, g, b) {
        this._tone = [r, g, b];
    };

    Game_CharacterBase.prototype.angle = function() {
        return this._angle;
    };

    Game_CharacterBase.prototype.setAngle = function(angle) {
        this._angle = angle;
    };

    Game_CharacterBase.prototype.shiftPosition = function(x, y) {
        this._additionalX = x;
        this._additionalY = y;
    };

    Game_CharacterBase.prototype.tileBlockWidth = function() {
        return this._tileBlockWidth;
    };

    Game_CharacterBase.prototype.tileBlockHeight = function() {
        return this._tileBlockHeight;
    };

    Game_CharacterBase.prototype.getTrimRect = function() {
        return this._trimRect || null;
    };

    var _Game_CharacterBase_pos      = Game_CharacterBase.prototype.pos;
    Game_CharacterBase.prototype.pos = function(x, y) {
        if (this.tileBlockWidth() >= 2) {
            return (this._x - this.tileBlockWidth() / 2 <= x && this._x + this.tileBlockWidth() / 2 >= x) && this._y === y;
        } else {
            return _Game_CharacterBase_pos.apply(this, arguments);
        }
    };

    var _Game_CharacterBase_screenX      = Game_CharacterBase.prototype.screenX;
    Game_CharacterBase.prototype.screenX = function() {
        return this._absoluteX > 0 ? this.absoluteX() : _Game_CharacterBase_screenX.apply(this, arguments) + this._additionalX;
    };

    var _Game_CharacterBase_screenY      = Game_CharacterBase.prototype.screenY;
    Game_CharacterBase.prototype.screenY = function() {
        return this._absoluteY > 0 ? this.absoluteY() : _Game_CharacterBase_screenY.apply(this, arguments) + this._additionalY;
    };

    var _Game_CharacterBase_screenZ      = Game_CharacterBase.prototype.screenZ;
    Game_CharacterBase.prototype.screenZ = function() {
        return this._customPriority >= 0 ? this._customPriority : _Game_CharacterBase_screenZ.apply(this, arguments);
    };

    Game_CharacterBase.prototype.changeImage = function(fileName, fileIndex) {
        if (arguments.length < 2) {
            fileIndex = this._characterIndex;
        }
        Game_CharacterBase.prototype.setImage.call(this, fileName, fileIndex);
    };

    //=============================================================================
    // Game_Event
    //  拡張するプロパティを定義します。
    //=============================================================================
    Game_Event.blendModeParams = {
        '1': 1, '加算': 1,
        '2': 2, '乗算': 2,
        '3': 3, 'スクリーン': 3
    };

    Game_Event.prototype.getMetaCg = function(names) {
        if (!this.event().metaArray) {
            return null;
        }
        if (!Array.isArray(names)) names = [names];
        var metaParams = this.getMetaParameter(names);
        if (!metaParams) return null;
        var result = null;
        metaParams.some(function(metaParam) {
            var params = getArgArrayString(metaParam);
            if (this.isValidCgeParam(params)) {
                result = params;
                if (metaParam.match(/\\v/gi)) {
                    this._graphicDynamic = true;
                }
            }
            return result;
        }.bind(this));
        return result;
    };

    Game_Event.prototype.getMetaParameter = function(names) {
        var metaParams = null;
        names.some(function(name) {
            if (!metaParams || metaParams[0] === '') {
                metaParams = this.event().metaArray['CG' + name];
            }
            return metaParams;
        }.bind(this));
        return metaParams;
    };

    Game_Event.prototype.isValidCgeParam = function(params) {
        var pageIndex = getArgNumber(params[0]);
        return params.length > 1 && (pageIndex === this._pageIndex + 1 || params[0].toUpperCase() === 'A');
    };

    var _Game_Event_refresh      = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        // added by nekoma start
        var moveRoute        = this._moveRoute;
        var moveRouteIndex   = this._moveRouteIndex;
        var moveRouteForcing = this._moveRouteForcing;
        var starting         = this._starting;
        // added by nekoma end
        if (this._graphicDynamic) {
            this._pageIndex = -1;
        }
        _Game_Event_refresh.apply(this, arguments);
        // added by nekoma start
        if (this._graphicDynamic) {
            this._moveRoute        = moveRoute;
            this._moveRouteIndex   = moveRouteIndex;
            this._moveRouteForcing = moveRouteForcing;
            this._starting         = starting;
        }
        // added by nekoma end
    };

    var _Game_Event_setupPageSettings      = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        this.clearCgInfo();
        _Game_Event_setupPageSettings.apply(this, arguments);
        var cgParams = this.getMetaCg(['シフト', 'Shift']);
        if (cgParams) {
            this.shiftPosition(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['プライオリティ', 'Priority']);
        if (cgParams) {
            this._customPriority = getArgNumber(cgParams[1], 0, 10);
        }
        cgParams = this.getMetaCg(['合成方法', 'BlendType']);
        if (cgParams) {
            var blendMode = Game_Event.blendModeParams[cgParams[1]] || 0;
            this.setBlendMode(blendMode);
        }
        cgParams = this.getMetaCg(['拡大率', 'Scale']);
        if (cgParams) {
            this._scaleX = getArgNumber(cgParams[1]);
            this._scaleY = getArgNumber(cgParams[2]);
        }
        cgParams = this.getMetaCg(['回転角', 'Angle']);
        if (cgParams) {
            this.setAngle(getArgNumber(cgParams[1], 0, 360));
        }
        cgParams = this.getMetaCg(['原点', 'Origin']);
        if (cgParams) {
            this.setOrigin(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['絶対座標', 'Absolute']);
        if (cgParams) {
            this.setAbsolute(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['色調', 'Tone']);
        if (cgParams) {
            this.setTone(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]), getArgNumber(cgParams[3]));
        }
        cgParams = this.getMetaCg(['不透明度', 'Opacity']);
        if (cgParams) {
            this.setOpacity(getArgNumber(cgParams[1]));
        }
        cgParams = this.getMetaCg(['トリミング', 'Trimming']);
        if (cgParams) {
            this._trimRect = new Rectangle(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]), getArgNumber(cgParams[3]), getArgNumber(cgParams[4]));
        }
    };

    var _Game_Event_setTileImage      = Game_Event.prototype.setTileImage;
    Game_Event.prototype.setTileImage = function(tileId) {
        _Game_Event_setTileImage.apply(this, arguments);
        var cgParams = this.getMetaCg(['タイル', 'Tile']);
        if (cgParams) {
            this._tileBlockWidth  = getArgNumber(cgParams[1]);
            this._tileBlockHeight = getArgNumber(cgParams[2]);
        }
        cgParams = this.getMetaCg(['タイルセット', 'Tileset']);
        if (cgParams) {
            this._customTilesetId = getArgNumber(cgParams[1]);
        }
    };

    var _Game_Event_setImage      = Game_Event.prototype.setImage;
    Game_Event.prototype.setImage = function(characterName, characterIndex) {
        var cgParams = this.getMetaCg(['ピクチャ', 'Picture']);
        if (cgParams) {
            this._customResource = 'Picture';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['敵キャラ', 'Enemy']);
        if (cgParams) {
            this._customResource = $gameSystem.isSideView() ? 'SvEnemy' : 'Enemy';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['アイコン', 'Icon']);
        if (cgParams) {
            this._customResource = 'System';
            this._graphicColumns = 16;
            this._graphicRows    = 20;
            arguments[0]         = 'IconSet';
            arguments[1]         = getArgNumber(cgParams[1], 0, this._graphicColumns * this._graphicRows - 1);
        }
        cgParams = this.getMetaCg(['フェイス', 'Face']);
        if (cgParams) {
            this._customResource = 'Face';
            this._graphicColumns = 4;
            this._graphicRows    = 2;
            arguments[0]         = cgParams[1];
            arguments[1]         = getArgNumber(cgParams[2], 0, this._graphicColumns * this._graphicRows - 1);
        }
        cgParams = this.getMetaCg(['遠景', 'Parallax']);
        if (cgParams) {
            this._customResource = 'Parallax';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['アクター', 'Actor']);
        if (cgParams) {
            this._customResource = 'SvActor';
            this._graphicColumns = 9;
            this._graphicRows    = 6;
            arguments[0]         = cgParams[1];
            arguments[1]         = getArgNumber(cgParams[2], 0, this._graphicColumns * this._graphicRows - 1);
        }
        _Game_Event_setImage.apply(this, arguments);
    };

    //=============================================================================
    // Spriteset_Map
    //  イベントを消去するエフェクトを無効にします。
    //=============================================================================
    var _Spriteset_Map_hideCharacters      = Spriteset_Map.prototype.hideCharacters;
    Spriteset_Map.prototype.hideCharacters = function() {
        if (!paramEventHideInvalid) _Spriteset_Map_hideCharacters.apply(this, arguments);
    };

    //=============================================================================
    // Sprite_Character
    //  拡張したプロパティに基づいてエフェクトを反映させます。
    //=============================================================================
    var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character.prototype.initMembers = function() {
        _Sprite_Character_initMembers.apply(this, arguments);
        this._customTilesetId = 0;
    };

    var _Sprite_Character_tilesetBitmap      = Sprite_Character.prototype.tilesetBitmap;
    Sprite_Character.prototype.tilesetBitmap = function(tileId) {
        var customTilesetId   = this._character.customTilesetId();
        this._customTilesetId = customTilesetId;
        if (customTilesetId) {
            var tileset   = $dataTilesets[customTilesetId];
            var setNumber = 5 + Math.floor(tileId / 256);
            return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
        } else {
            return _Sprite_Character_tilesetBitmap.apply(this, arguments);
        }
    };

    var _Sprite_Character_updateBitmap      = Sprite_Character.prototype.updateBitmap;
    Sprite_Character.prototype.updateBitmap = function() {
        if (this.isImageChanged()) this._customResource = this._character.customResource();
        _Sprite_Character_updateBitmap.apply(this, arguments);
        this.updateExtend();
    };

    // Resolve conflict for MOG_CharPoses.js
    var _Sprite_Character_setBitmapCache = Sprite_Character.prototype.setBitmapCache;
    Sprite_Character.prototype.setBitmapCache = function() {
        if (this._customResource) {
            return;
        }
        _Sprite_Character_setBitmapCache.apply(this, arguments);
    };

    var _Sprite_Character_update      = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.apply(this, arguments);
        // for T_dashMotion.js
        if (this.updateDashMotion) {
            this.resolveConflictForDashMotion();
        }

        // for UltraMode7.jp PRTN added ----
        if ($gameMap.useUltraMode7) {
            this.resolveConflictForUltraMode7();
        }
    };

    // PRTN added ---------
    Sprite_Character.prototype.resolveConflictForUltraMode7 = function() {
        if (this._character.scaleY() !== 100) {
            this.scale.x = this._character.scaleX() / 100 * this.scale.x;
            this.scale.y = this._character.scaleY() / 100 * this.scale.y;
        }
        if (this._character.angle() !== 0) {
            var angle = this._character.angle() * Math.PI / 180;
            if (this.rotation !== angle) this.rotation = angle;
        }
    };
    // --------------------

    Sprite_Character.prototype.resolveConflictForDashMotion = function() {
        if (this._character.scaleY() !== 100) {
            this.scale.y = this._character.scaleY() / 100 * this.scale.y;
        }
        if (this._character.angle() !== 0) {
            var angle = this._character.angle() * Math.PI / 180;
            if (this.rotation !== angle) this.rotation = angle;
        }
    };

    Sprite_Character.prototype.updateExtend = function() {
        var scaleX = this._character.scaleX() / 100;
        var scaleY = this._character.scaleY() / 100;
        this.scale.x = scaleX;
        this.scale.y = scaleY;
        // for TMNamePop.js
        if (this._namePop && this._namePopSprite) {
            this._namePopSprite.scale.x = scaleX;
            this._namePopSprite.scale.y = scaleY;
        }
        var originX  = this._character.originX();
        if (originX != null) this.anchor.x = originX;
        var originY = this._character.originY();
        if (originY != null) this.anchor.y = originY;
        var angle = this._character.angle() * Math.PI / 180;
        if (this.rotation !== angle) this.rotation = angle;
        var tone = this._character.tone();
        if (tone) this.setColorTone(tone);
    };

    // Resolve conflict by EventEffects.js
    var _Sprite_Character_updateAngle      = Sprite_Character.prototype.updateAngle;
    Sprite_Character.prototype.updateAngle = function() {
        if (this._character.originY() != null) {
            return;
        }
        _Sprite_Character_updateAngle.apply(this, arguments);
    };

    var _Sprite_Character_setFrame      = Sprite_Character.prototype.setFrame;
    Sprite_Character.prototype.setFrame = function(sx, sy, pw, ph) {
        var rect = this._character.getTrimRect();
        if (rect) {
            _Sprite_Character_setFrame.call(this, sx + rect.x, sy + rect.y, rect.width, rect.height);
        } else {
            _Sprite_Character_setFrame.call(this, sx, sy,
                pw * this._character.tileBlockWidth(), ph * this._character.tileBlockHeight());
        }
    };

    var _Sprite_Character_isImageChanged      = Sprite_Character.prototype.isImageChanged;
    Sprite_Character.prototype.isImageChanged = function() {
        return _Sprite_Character_isImageChanged.apply(this, arguments) || this.isCustomImageChanged();
    };

    Sprite_Character.prototype.isCustomImageChanged = function() {
        return this._customResource !== this._character.customResource() ||
            this._customTilesetId !== this._character.customTilesetId();
    };

    var _Sprite_Character_setCharacterBitmap      = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
        if (this._customResource) {
            this.bitmap = ImageManager['load' + this._customResource](this._characterName);
        } else {
            _Sprite_Character_setCharacterBitmap.apply(this, arguments);
        }
    };

    var _Sprite_Character_characterBlockX      = Sprite_Character.prototype.characterBlockX;
    Sprite_Character.prototype.characterBlockX = function() {
        if (this._customResource) {
            return this._characterIndex % this._character.graphicColumns();
        } else {
            return _Sprite_Character_characterBlockX.apply(this, arguments);
        }
    };

    var _Sprite_Character_characterBlockY      = Sprite_Character.prototype.characterBlockY;
    Sprite_Character.prototype.characterBlockY = function() {
        if (this._customResource) {
            return Math.floor(this._characterIndex / this._character.graphicColumns());
        } else {
            return _Sprite_Character_characterBlockY.apply(this, arguments);
        }
    };

    var _Sprite_Character_patternWidth      = Sprite_Character.prototype.patternWidth;
    Sprite_Character.prototype.patternWidth = function() {
        if (this._customResource) {
            return this.bitmap.width / this._character.graphicColumns();
        } else {
            return _Sprite_Character_patternWidth.apply(this, arguments);
        }
    };

    var _Sprite_Character_patternHeight      = Sprite_Character.prototype.patternHeight;
    Sprite_Character.prototype.patternHeight = function() {
        if (this._customResource) {
            return this.bitmap.height / this._character.graphicRows();
        } else {
            return _Sprite_Character_patternHeight.apply(this, arguments);
        }
    };

    var _Sprite_Character_characterPatternX      = Sprite_Character.prototype.characterPatternX;
    Sprite_Character.prototype.characterPatternX = function() {
        if (this._customResource) {
            return 0;
        } else {
            return _Sprite_Character_characterPatternX.apply(this, arguments);
        }
    };

    var _Sprite_Character_characterPatternY      = Sprite_Character.prototype.characterPatternY;
    Sprite_Character.prototype.characterPatternY = function() {
        if (this._customResource) {
            return 0;
        } else {
            return _Sprite_Character_characterPatternY.apply(this, arguments);
        }
    };
})();