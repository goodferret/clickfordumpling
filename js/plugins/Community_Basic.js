/* 本插件為NAL翻譯版本。
* @plugindesc 用於設置基本參數的插件。
  * @author RM CoreScript 團隊
  * @help 該插件不提供插件命令。
  *
* @參數緩存限制
  * @desc 用於設置圖像內存緩存的上限。 (MPix)
  * @默認10
  *
  * @參數屏幕寬度
* @desc 用於設置屏幕寬度。
  * @默認816
  *
  * @參數屏幕高度
  * @desc 用於設置屏幕高度。
  * @默認624
  *
  * @param changeWindowWidthTo改變窗口寬度
  * @desc 如果設置，將窗口寬度更改為此值
  *
  * @param 改變窗口高度
  * @desc 如果設置，將窗口高度更改為此值
  *
  * @參數渲染模式
  * @desc 渲染模式 (canvas/webgl/auto)
  * @默認自動
  *
  * @參數alwaysDash
  * @desc 設置玩家是否總是衝刺的初始值。 （開關）
  * @默認關閉
  * @plugindesc Plugin used to set basic parameters.
 * @author RM CoreScript team
 *
 * @help This plugin does not provide plugin commands.
 *
* @param cacheLimit
 * @desc For setting the upper limit of image memory cache. (MPix)
 * @default 10
 *
 * @param screenWidth
* @desc For setting the screen width.
 * @default 816
 *
 * @param screenHeight
 * @desc For setting the screen height.
 * @default 624
 *
 * @param changeWindowWidthTo
 * @desc If set, change window width to this value
 *
 * @param changeWindowHeightTo
 * @desc If set, change window height to this value
 *
 * @param renderingMode
 * @desc Rendering mode (canvas/webgl/auto)
 * @default auto
 *
 * @param alwaysDash
 * @desc To set initial value as to whether the player always dashes. (on/off)
 * @default off
 */

/*:ja
 * @plugindesc 用於設置基本參數的插件。
 * 基本的なパラメーターを設定するプラグインです。
 * @author RM CoreScript team
 *
 * @help 該插件不提供插件命令。
 * このプラグインにはプラグインコマンドはありません。
 *
 * @param cacheLimit
 * @desc  用於設置圖像內存緩存的上限。画像のメモリへのキャッシュの上限値 (MPix)
 * @default 10
 *
 * @param screenWidth
 * @desc 屏幕寬度 画面サイズの幅
 * @default 816
 *
 * @param screenHeight
 * @desc 屏幕高度 画面サイズの高さ
 * @default 624
 *
 * @param changeWindowWidthTo
 * @desc 如果設置，將窗口寬度更改為此值 値が設定された場合、ウインドウの幅を指定した値に変更
 *
 * @param changeWindowHeightTo
 * @desc 如果設置，將窗口高度更改為此值 値が設定された場合、ウインドウの高さを指定した値に変更
 *
 * @param renderingMode
 * @desc 渲染模式 レンダリングモード (canvas/webgl/auto)
 * @default auto
 *
 * @param alwaysDash
 * @desc 設置玩家是否總是衝刺的初始值。(on/off) プレイヤーが常時ダッシュするかどうかの初期値 (on/off)
 * @default off
 */

(function() {
    function toNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }

    var parameters = PluginManager.parameters('Community_Basic');
    var cacheLimit = toNumber(parameters['cacheLimit'], 10);
    var screenWidth = toNumber(parameters['screenWidth'], 816);
    var screenHeight = toNumber(parameters['screenHeight'], 624);
    var renderingMode = parameters['renderingMode'].toLowerCase();
    var alwaysDash = parameters['alwaysDash'].toLowerCase() === 'on';
    var windowWidthTo = toNumber(parameters['changeWindowWidthTo'], 0);
    var windowHeightTo = toNumber(parameters['changeWindowHeightTo'], 0);

    var windowWidth;
    var windowHeight;

    if(windowWidthTo){
        windowWidth = windowWidthTo;
    }else if(screenWidth !== SceneManager._screenWidth){
        windowWidth = screenWidth;
    }

    if(windowHeightTo){
        windowHeight = windowHeightTo;
    }else if(screenHeight !== SceneManager._screenHeight){
        windowHeight = screenHeight;
    }


    ImageCache.limit = cacheLimit * 1000 * 1000;
    SceneManager._screenWidth = screenWidth;
    SceneManager._screenHeight = screenHeight;
    SceneManager._boxWidth = screenWidth;
    SceneManager._boxHeight = screenHeight;

    SceneManager.preferableRendererType = function() {
        if (Utils.isOptionValid('canvas')) {
            return 'canvas';
        } else if (Utils.isOptionValid('webgl')) {
            return 'webgl';
        } else if (renderingMode === 'canvas') {
            return 'canvas';
        } else if (renderingMode === 'webgl') {
            return 'webgl';
        } else {
            return 'auto';
        }
    };

    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (config['alwaysDash'] === undefined) {
            this.alwaysDash = alwaysDash;
        }
    };


    var _SceneManager_initNwjs = SceneManager.initNwjs;
    SceneManager.initNwjs = function() {
        _SceneManager_initNwjs.apply(this, arguments);

        if (Utils.isNwjs() && windowWidth && windowHeight) {
            var dw = windowWidth - window.innerWidth;
            var dh = windowHeight - window.innerHeight;
            window.moveBy(-dw / 2, -dh / 2);
            window.resizeBy(dw, dh);
        }
    };
})();