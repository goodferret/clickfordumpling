//=============================================================================
// EventReSpawn.js
// ----------------------------------------------------------------------------
// (C) 2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.11.3 2020/03/01 MOG_EventText.jsと併用したとき、動的生成イベントにイベントテキストが表示されるよう修正
// 1.11.2 2019/12/14 KMS_Minimap.jsと併用したとき、動的生成イベントがミニマップに表示されるよう修正（KMS_Minimap.js側も専用のコードを適用する必要あり）
// 1.11.1 2019/12/10 「確定出力方式」の条件式を修正
// 1.11.0 2019/12/07 ランダム生成で条件を満たす場所に確実に出力する「確定出力方式」で出力できる機能を追加しました。（by 澱粉（仮）さま）
//                   特定条件でテンプレートイベント生成するとエラーになる場合がある問題を修正
//                   ランダム生成する際の個数を指定できる機能を追加
// 1.10.3 2019/11/24 動的生成イベントを生成元として生成する場合、実際の生成元を、元々の生成元の動的イベントではなく、さらにその生成元である静的イベントになるよう仕様変更
// 1.10.2 2019/11/04 1.10.1の修正で「現在のマップに存在しないID」を指定して「ERS_テンプレート生成」を実行するとエラーになる問題を修正
// 1.10.1 2019/11/04 TemplateEvent.jsと併用した際、ERS_MAKEによる生成対象のイベントがテンプレートイベントの場合はテンプレートイベントを生成するよう仕様変更
// 1.9.4 2019/09/27 1.9.0以降、TemplateEvent.jsと併用した際「ERS_MAKE」を実行した場合でもテンプレートイベントが生成される問題を修正
// 1.9.3 2019/07/07 1.9.0以降、ランダム生成で地形とリージョンを指定せず実行するとエラーになっていた問題を修正
// 1.9.2 2019/06/30 イベントが存在しないマップに動的イベントを生成したとき、最初のイベントの一部の動作がおかしくなる問題を修正
// 1.9.1 2019/06/09 テンプレートイベントを生成したとき、getTemplateIdを取得できない問題を修正
// 1.9.0 2019/01/14 地形タグとリージョンを複数指定できる機能を追加
// 1.8.3 2018/10/25 YEP_EventMiniLabel.jsと併用した際、動的生成イベントを「イベント消去」するとエラーになる競合を修正
// 1.8.2 2018/05/17 ランダム生成の試行回数をパラメータから設定できるように仕様変更
// 1.8.1 2018/03/12 ランダム生成で対象座標が見付からず失敗した場合、エラーではなく警告になるよう仕様変更
// 1.8.0 2018/02/07 場所移動時にセルフスイッチがクリアされなくなる機能を追加
// 1.7.0 2017/09/17 プラグインコマンドにテンプレートイベントのセルフ変数「\sv[n]」が利用できる機能を追加
// 1.6.0 2017/09/15 座標を指定する際、小数を指定できるよう修正（半歩移動プラグイン等との組み合わせを想定）
// 1.5.3 2017/06/18 コピー対象のイベントを変数から指定する際、変数に文字列が入っていると正しく取得できない問題を修正（by 奏ねこまさま）
// 1.5.2 2017/05/28 イベントを配置したときアニメパターンが一瞬だけ初期化されてしまう問題を修正
// 1.5.1 2017/04/23 イベントを生成するプラグインコマンドで制御文字が無効になっていた問題を修正
// 1.5.0 2017/01/19 イベント生成の際にIDだけでなくイベント名の一致するイベントを動的生成できる機能を追加
// 1.4.4 2017/01/13 動的イベントの一時消去時にバルーンやアニメーションを表示中だった場合に表示が残ってしまう問題を修正
// 1.4.3 2017/01/12 1.4.2の対策に漏れがあったため再修正
// 1.4.2 2017/01/12 プロジェクトを再保存してバージョンIDが変化した場合は動的生成イベントを復元しないよう修正
// 1.4.1 2016/12/28 YEP_SaveEventLocations.jsとの競合を解消
// 1.4.0 2016/12/25 最後に動的生成したイベントのイベントIDを取得できるコマンドを追加
// 1.3.1 2016/11/08 動的イベント生成中に同一マップに場所移動するとエラーが発生する現象を修正
// 1.3.0 2016/11/03 ランダム生成機能で各種引数で文字で設定できる機能を追加＋境界値まわりのバグ修正（by くらむぼんさま）
// 1.2.0 2016/09/06 場所移動時、生成イベントを引き継いでしまう不具合を修正
//                  プラグインコマンド実行時にイベントIDを0にすることで「このイベント」を複製できる機能を追加
// 1.1.1 2016/08/11 動的イベント生成中にセーブした場合にロードできなくなる不具合を修正
// 1.1.0 2016/08/10 テンプレートイベントプラグインとの連携で、テンプレートマップからイベントを生成する機能を追加
//                  生成場所を条件付きランダムで設定できる機能を追加
// 1.0.1 2016/08/09 イベント生成後にメニューを開いて戻ってくるとエラーが発生する現象の修正
// 1.0.0 2016/08/08 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 事件動態生成插件
 * @author トリアコンタン
 *
 * @param keepSelfSwitch
 * @text セルフスイッチ維持
 * @desc 啟用後，移動到另一個位置時，自開關不會被清除。 執行清除事件時清除。
 * @default false
 * @type boolean
 *
 * @param tryRandomCount
 * @text 試行回数
 * @desc 隨機生成的試驗次數。 如果事件生成失敗，請增加數量。
 * @default 1000
 * @type number
 *
 * @param CertainSpawnSwitch
 * @text 確定出力方式スイッチ
 * @desc 當指定開關為ON時，生成時採用“固定輸出方式”。 查看幫助了解詳細信息。
 * @default 0
 * @type switch
 *
 * @help 複製事件並動態生成。
 * 已復制的臨時事件可以
 * 永久刪除以釋放對象和精靈的已用空間。
 * 自開關單獨管理並在每次創建時初始化。
 *
 * 插件命令詳細信息
 * 從事件命令“插件命令”執行。
 *（參數之間用空格分隔）
 *
 * ERS_生成 1 5 10 # 複製事件 ID[1] 的事件並將其放置在 X[5] Y[10] 中
 * ERS_MAKE 1 5 10 # 同上
 *
 * 將事件 ID 設置為“0”會復制正在執行的事件（此事件）。
 *
 * ●追加機能●
 * 如果為事件 ID 指定“字符串”，則將顯示具有匹配事件名稱的事件。
 * 使其成為複制目標。 （如果有多個目標，將使用最小的ID）
 *
 * ERS_生成 aaa 5 10 # 複製事件名稱為 [aaa] 的事件並將其放置在 X[5] Y[10] 中
 * ERS_MAKE aaa 5 10 # 同上
 *
 * 其他插件命令類似。
 *
 * 您還可以隨機化生成位置。 不只是隨機的
 *隨機指定以下輔助條件。
 * a. 是否通過（0：不判斷 1：僅通過瓷磚）
 * b. 屏內還是屏外（0：不判斷 1：屏內 2：屏外）
 * c.與其他角色重疊（0：不判斷1：玩家2：事件3：兩者）
 * d.地形標籤（0：不判斷 1..：指定地形標籤）
 * e.區域（0：不判斷 1..：指定區域）
 *
 * ERS_ランダム生成 1 1 2 3 5 4 # 在以下條件下放置事件 ID 為 [1] 的事件 (*)
 * ERS_MAKE_RANDOM 1 1 2 3 5 4  # 同上
 * ※ 從可通行、屏幕外、沒有玩家或事件、地形標籤為“5”、區域為“4”的位置中隨機選擇
 * 
 * 可以指定多個地形標籤和區域。
 * 請用逗號指定數字。
 * ERS_MAKE_RANDOM 59 0 0 0 3,4 0 # 放置在地形標籤上 [3][4]
 *
 * 特別是，由於很難指定 a.b.c. 的條件，因此我們可以在句子中指定它們。
 * 上述條件可以改寫為： （順序不能更改。）
 *
   ERS_隨機生成     1 僅可通過的瓷磚     画面外 両方 5 4
 * ERS_ランダム生成 1 通行可能タイルのみ 画面外 両方 5 4
 * ERS_MAKE_RANDOM 1 passonly offscreen both 5 4
 *
 * 以下是可以互換使用的同義詞列表。
 * 判定なし 条件なし none
 * 通行可能タイルのみ 通行のみ passonly
 * 画面内 onscreen screen
 * 画面外 offscreen
 * プレイヤー player
 * イベント event
 * 両方 both
 *
 * 您可以設置隨機生成的數量。 從第7個參數開始指定。
 * ERS_MAKE_RANDOM 1 1 1 1 1 1 2 # [2]個のイベントをランダム生成します。
 *
 * 您可以獲得最後動態生成的事件的事件 ID。
 * 它存儲在具有指定編號的變量中。
 *
 * ERS_最終生成イベントID取得 10  # 將最後生成的事件 ID 設置為變量 [10]
 * ERS_GET_LAST_SPAWN_EVENT_ID 10 # 同上
 *
 * 將事件 ID 設置為“0”會復制正在執行的事件（此事件）。
 *
 * ・與其他插件的合作
 * 與模板事件插件“TemplateEvent.js”結合使用時
 * 模板地圖中定義的事件可以直接在地圖中生成。
 * 不應用“TemplateEvent.js”執行命令將導致錯誤。
 *
 * ERS_テンプレート生成 1 5 10 # 為模板地圖生成事件 ID[1]。
 * ERS_MAKE_TEMPLATE 1 5 10    # 同上
 *
 * ERS_テンプレートランダム生成 1 1 2 3 5 4 # 隨機生成模板[1]
 * ERS_MAKE_TEMPLATE_RANDOM 1 1 2 3 5 4     # 同上
 * ※ 關於輔助條件，與“ERS_random Generation”相同。
 *
 * 「TemplateEvent.js」取得元
 * https://github.com/triacontane/RPGMakerMV
 *
 * 與 YEP_EventMiniLabel.js 一起使用時，將此插件放在下面。
 *
 *・關於固定輸出方式
 * 確定事件生成位置時，在滿足條件的位置可靠生成，而不是隨機嘗試。
 * 在生成時遍歷整個地圖尋找滿足條件的位置。
 * 當生成位置候選很少時有效，例如僅指定區域。
 * 當參數“固定輸出方式開關”的開關為 ON 時，以該模式輸出。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

/**
 * 動的生成イベントを扱うクラスです。
 * @constructor
 */
function Game_PrefabEvent() {
    this.initialize.apply(this, arguments);
}

(function() {
    'use strict';
    var metaTagPrefix = 'ERS_';

    /**
     * Create plugin parameter. param[paramName] ex. param.commandPrefix
     * @param pluginName plugin name(AltGlossary)
     * @returns {Object} Created parameter
     */
    var createPluginParameter = function(pluginName) {
        var paramReplacer = function(key, value) {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        };
        var parameter     = JSON.parse(JSON.stringify(PluginManager.parameters(pluginName), paramReplacer));
        PluginManager.setParameters(pluginName, parameter);
        return parameter;
    };

    var param = createPluginParameter('EventReSpawn');

    var getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(arg) || makeRandomCompatible[arg] || 0).clamp(min, max);
    };

    var getArgFloat = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseFloat(arg) || 0).clamp(min, max);
    };

    var makeRandomCompatible = {
        none     : 0,
        判定なし     : 0,
        条件なし     : 0,
        passonly : 1,
        通行可能タイルのみ: 1,
        通行のみ     : 1,
        screen   : 1,
        onscreen : 1,
        画面内      : 1,
        offscreen: 2,
        画面外      : 2,
        player   : 1,
        プレイヤー    : 1,
        event    : 2,
        イベント     : 2,
        both     : 3,
        両方       : 3,
    };

    var convertEscapeCharacters = function(text) {
        if (isNotAString(text)) text = '';
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
            return $gameVariables.value(parseInt(arguments[1]));
        }.bind(this));
        text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1]) >= 1 ? $gameActors.actor(parseInt(arguments[1])) : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
            var actor = parseInt(arguments[1]) >= 1 ? $gameParty.members()[parseInt(arguments[1]) - 1] : null;
            return actor ? actor.name() : '';
        }.bind(this));
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    var isNotAString = function(args) {
        return String(args) !== args;
    };

    var convertAllArguments = function(args) {
        return args.map(function(arg) {
            return convertEscapeCharacters(arg);
        });
    };

    var setPluginCommand = function(commandName, methodName) {
        pluginCommandMap.set(metaTagPrefix + commandName, methodName);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var pluginCommandMap = new Map();
    setPluginCommand('MAKE', 'execMakeEvent');
    setPluginCommand('生成', 'execMakeEvent');
    setPluginCommand('MAKE_RANDOM', 'execMakeEventRandom');
    setPluginCommand('ランダム生成', 'execMakeEventRandom');
    setPluginCommand('テンプレート生成', 'execMakeTemplateEvent');
    setPluginCommand('MAKE_TEMPLATE', 'execMakeTemplateEvent');
    setPluginCommand('テンプレートランダム生成', 'execMakeTemplateEventRandom');
    setPluginCommand('MAKE_TEMPLATE_RANDOM', 'execMakeTemplateEventRandom');
    setPluginCommand('最終生成イベントID取得', 'execGetLastSpawnEventId');
    setPluginCommand('GET_LAST_SPAWN_EVENT_ID', 'execGetLastSpawnEventId');
    setPluginCommand('TRY_COUNT', 'changeTryCount');//追加

    //=============================================================================
    // DataManager
    //  データ検索用の共通処理です。
    //=============================================================================
    if (!DataManager.searchDataItem) {
        DataManager.searchDataItem = function(dataArray, columnName, columnValue) {
            var result = 0;
            dataArray.some(function(dataItem) {
                if (dataItem && dataItem[columnName] === columnValue) {
                    result = dataItem;
                    return true;
                }
                return false;
            });
            return result;
        };
    }

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンドを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var pluginCommandMethod = pluginCommandMap.get(command.toUpperCase());
        if (pluginCommandMethod) {
            args = convertAllArguments(args);
            if (this.convertAllSelfVariables) {
                args = this.convertAllSelfVariables(args);
            }
            this[pluginCommandMethod](args);
        }
    };

    Game_Interpreter.prototype.execMakeEvent = function(args, extend) {
        var x = getArgFloat(args[1]);
        var y = getArgFloat(args[2]);
        $gameMap.spawnEvent(this.getEventIdForEventReSpawn(args[0], extend), x, y, extend);
    };

    Game_Interpreter.prototype.execMakeEventRandom = function(args, extend) {
        var conditionMap         = {};
        conditionMap.passable    = getArgNumber(args[1], 0);
        conditionMap.screen      = getArgNumber(args[2], 0);
        conditionMap.collided    = getArgNumber(args[3], 0);
        conditionMap.terrainTags = (args[4] || '').split(',').map(function(value) {
            return getArgNumber(value, 0);
        });
        conditionMap.regionIds   = (args[5] || '').split(',').map(function(value) {
            return getArgNumber(value, 0);
        });

        var makeCount = parseInt(args[6]) || 1;
        for (var i = 0; i < makeCount; ++i) {
            $gameMap.spawnEventRandom(this.getEventIdForEventReSpawn(args[0], extend), conditionMap, extend);
        }
    };

    Game_Interpreter.prototype.execMakeTemplateEvent = function(args) {
        this.execMakeEvent(args, true);
    };

    Game_Interpreter.prototype.execMakeTemplateEventRandom = function(args) {
        this.execMakeEventRandom(args, true);
    };

    Game_Interpreter.prototype.execGetLastSpawnEventId = function(args) {
        var eventId = $gameMap.getLastSpawnEventId();
        $gameVariables.setValue(getArgNumber(args[0], 0), eventId);
    };

    Game_Interpreter.prototype.getEventIdForEventReSpawn = function(arg, isTemplate) {
        var id = 0;
        if (!isNaN(convertEscapeCharacters(arg))) {
            id = getArgNumber(arg, 0);
        } else {
            var event = DataManager.searchDataItem(isTemplate ? $dataTemplateEvents : $dataMap.events, 'name', convertEscapeCharacters(arg));    // modified by nekoma.
            id        = event ? event.id : 0;
        }
        return id > 0 ? id : this._eventId;
    };

    Game_Interpreter.prototype.changeTryCount = function(args) {
        if (args[0]) param.tryRandomCount = Number(args[0]);
    };

    //=============================================================================
    // Game_Map
    //  イベントのスポーン処理を追加定義します。
    //=============================================================================
    var _Game_Map_setupEvents      = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        if ($gamePlayer.isNeedMapReload()) {
            this.unlinkPrefabEvents();
        }
        _Game_Map_setupEvents.apply(this, arguments);
        this._eventIdSequence = this._events.length || 1;
    };

    Game_Map.prototype.spawnEvent = function(originalEventId, x, y, isTemplate) {
        if (this.isExistEventData(originalEventId, isTemplate) && $gameMap.isValid(x, y)) {
            var eventId = this.getEventIdSequence();
            if (!isTemplate) {
                var originalEvent = this.event(originalEventId);
                if (this.isTemplateSpawn(originalEventId)) {
                    isTemplate      = true;
                    originalEventId = originalEvent.getTemplateId();
                }
                if (originalEvent.isPrefab()) {
                    originalEventId = originalEvent.getOriginalEventId();
                }
            }
            var event = new Game_PrefabEvent(this._mapId, eventId, originalEventId, x, y, isTemplate);

            this._lastSpawnEventId = eventId;
            this._events[eventId]  = event;
        } else {
            throw new Error('無効なイベントIDもしくは座標のためイベントを作成できませんでした。');
        }
    };

    Game_Map.prototype.isTemplateSpawn = function(originalEventId) {
        var event = this.event(originalEventId);
        return event.hasTemplate && event.hasTemplate();
    };

    Game_Map.prototype.getLastSpawnEventId = function() {
        return this._lastSpawnEventId;
    };

    Game_Map.prototype.isExistEventData = function(eventId, isTemplate) {
        return isTemplate ? !!$dataTemplateEvents[eventId] : !!this.event(eventId);
    };

    Game_Map.prototype.spawnEventRandom = function(originalEventId, conditionMap, isTemplate) {
        var conditions = [];
        conditions.push(this.isValid.bind(this));
        if (conditionMap.passable) {
            conditions.push(this.isErsCheckAnyDirectionPassable.bind(this));
        }
        if (conditionMap.screen) {
            conditions.push(this.isErsCheckScreenInOut.bind(this, conditionMap.screen));
        }
        if (conditionMap.collided) {
            conditions.push(this.isErsCheckCollidedSomeone.bind(this, conditionMap.collided));
        }
        if (conditionMap.terrainTags) {
            conditions.push(this.isErsCheckTerrainTag.bind(this, conditionMap.terrainTags));
        }
        if (conditionMap.regionIds) {
            conditions.push(this.isErsCheckRegionId.bind(this, conditionMap.regionIds));
        }
        var position = this.getConditionalValidPosition(conditions);
        if (position) {
            this.spawnEvent(originalEventId, position.x, position.y, isTemplate);
        } else {
            console.log(conditionMap);
            console.warn('座標の取得に失敗しました。');
        }
    };

    var _Game_Map_eraseEvent      = Game_Map.prototype.eraseEvent;
    Game_Map.prototype.eraseEvent = function(eventId) {
        _Game_Map_eraseEvent.apply(this, arguments);
        if (this._events[eventId].isExtinct()) {
            delete this._events[eventId];
        }
    };

    Game_Map.prototype.getEventIdSequence = function() {
        return this._eventIdSequence++;
    };

    Game_Map.prototype.getPrefabEvents = function() {
        return this.events().filter(function(event) {
            return event.isPrefab();
        });
    };

    Game_Map.prototype.resetSelfSwitchForPrefabEvent = function() {
        this.getPrefabEvents().forEach(function(prefabEvent) {
            prefabEvent.eraseSelfSwitch();
        });
    };

    Game_Map.prototype.restoreLinkPrefabEvents = function() {
        if (!this.isSameMapReload()) return;
        this.getPrefabEvents().forEach(function(prefabEvent) {
            prefabEvent.linkEventData();
        });
    };

    Game_Map.prototype.unlinkPrefabEvents = function() {
        this.getPrefabEvents().forEach(function(prefabEvent) {
            prefabEvent.unlinkEventData();
        });
    };

    Game_Map.prototype.isSameMapReload = function() {
        return !$gamePlayer.isTransferring() || this.mapId() === $gamePlayer.newMapId();
    };

    Game_Map.prototype.getConditionalValidPosition = function(conditions) {
        var tryCount = param.tryRandomCount || 1000;
        if (!$gameSwitches.value(param.CertainSpawnSwitch) && tryCount > 0) {
            var x, y, count = 0;
            do {
                x = Math.randomInt($dataMap.width);
                y = Math.randomInt($dataMap.height);
            } while (!conditions.every(this.checkValidPosition.bind(this, x, y)) && ++count < tryCount);
            return count < tryCount ? {x: x, y: y} : null;
        } else {
            var positions = [];
            for (var ix = 0; ix < $dataMap.width; ++ix) for (var iy = 0; iy < $dataMap.height; ++iy) {
                if (conditions.every(this.checkValidPosition.bind(this, ix, iy))) {
                    positions.push({x: ix, y: iy});
                }
            }
            return positions.length ? positions[Math.randomInt(positions.length)] : null;
        }
    };

    Game_Map.prototype.checkValidPosition = function(x, y, condition) {
        return condition(x, y);
    };

    Game_Map.prototype.isErsCheckAnyDirectionPassable = function(x, y) {
        return [2, 4, 6, 8].some(function(direction) {
            return $gamePlayer.isMapPassable(x, y, direction);
        });
    };

    Game_Map.prototype.isErsCheckScreenInOut = function(type, x, y) {
        return type === 1 ? this.isErsCheckInnerScreen(x, y) : this.isErsCheckOuterScreen(x, y);
    };

    Game_Map.prototype.isErsCheckInnerScreen = function(x, y) {
        var ax = this.adjustX(x);
        var ay = this.adjustY(y);
        return ax >= 0 && ay >= 0 && ax <= this.screenTileX() - 1 && ay <= this.screenTileY() - 1;
    };

    Game_Map.prototype.isErsCheckOuterScreen = function(x, y) {
        var ax = this.adjustX(x);
        var ay = this.adjustY(y);
        return ax < -1 || ay < -1 || ax > this.screenTileX() || ay > this.screenTileY();
    };

    Game_Map.prototype.isErsCheckCollidedSomeone = function(type, x, y) {
        if ((type === 1 || type === 3) && $gamePlayer.isCollided(x, y)) {
            return false;
        }
        if ((type === 2 || type === 3) && $gameMap.eventIdXy(x, y) > 0) {
            return false;
        }
        return true;
    };

    Game_Map.prototype.isErsCheckTerrainTag = function(type, x, y) {
        return type.some(function(id) {
            return !id || id === this.terrainTag(x, y);
        }, this);
    };

    Game_Map.prototype.isErsCheckRegionId = function(type, x, y) {
        return type.some(function(id) {
            return !id || id === this.regionId(x, y);
        }, this);
    };

    //=============================================================================
    // Game_CharacterBase
    //   プレハブイベントとそうでないキャラクターを区別します。
    //=============================================================================
    Game_CharacterBase.prototype.isPrefab = function() {
        return false;
    };

    Game_CharacterBase.prototype.isExtinct = function() {
        return this.isPrefab() && this._erased;
    };

    //=============================================================================
    // Game_PrefabEvent
    //  動的に生成されるイベントオブジェクトです。
    //=============================================================================
    Game_PrefabEvent.prototype             = Object.create(Game_Event.prototype);
    Game_PrefabEvent.prototype.constructor = Game_PrefabEvent;

    Game_PrefabEvent.prototype.initialize = function(mapId, eventId, originalEventId, x, y, isTemplate) {
        this._originalEventId = originalEventId;
        this._eventId         = eventId;
        this._isTemplate      = isTemplate;
        this.linkEventData();
        Game_Event.prototype.initialize.call(this, mapId, eventId);
        if (typeof Yanfly !== 'undefined' && Yanfly.SEL) {
            $gameTemp._bypassLoadLocation = true;
            this.locateWithoutStraighten(x, y);
            $gameTemp._bypassLoadLocation = undefined;
        } else {
            this.locateWithoutStraighten(x, y);
        }
        this._spritePrepared = false;
    };

    Game_PrefabEvent.prototype.locateWithoutStraighten = function(x, y) {
        this.setPosition(x, y);
        this.refreshBushDepth();
    };

    // for TemplateEvent.js
    Game_PrefabEvent.prototype.generateTemplateId = function(event) {
        return this._isTemplate ? this._originalEventId : null;
    };

    Game_PrefabEvent.prototype.linkEventData = function() {
        $dataMap.events[this._eventId] = (this._isTemplate ?
            $dataTemplateEvents[this._originalEventId] : $dataMap.events[this._originalEventId]);
    };

    Game_PrefabEvent.prototype.unlinkEventData = function() {
        $dataMap.events[this._eventId] = null;
    };

    Game_PrefabEvent.prototype.isPrefab = function() {
        return true;
    };

    Game_PrefabEvent.prototype.erase = function() {
        Game_Event.prototype.erase.call(this);
        this.eraseSelfSwitch();
        delete $dataMap.events[this._eventId];
    };

    Game_PrefabEvent.prototype.isSpritePrepared = function() {
        return this._spritePrepared;
    };

    Game_PrefabEvent.prototype.setSpritePrepared = function() {
        this._spritePrepared = true;
    };

    Game_PrefabEvent.prototype.eraseSelfSwitch = function() {
        ['A', 'B', 'C', 'D'].forEach(function(swCode) {
            var key = [this._mapId, this._eventId, swCode];
            $gameSelfSwitches.setValue(key, undefined);
        }.bind(this));
    };

    Game_PrefabEvent.prototype.getOriginalEventId = function() {
        return this._originalEventId;
    };

    Game_Event.prototype.getOriginalEventId = function() {
        return 0;
    };

    //=============================================================================
    // Game_Player
    //  プロジェクト再保存によるマップリロードかどうかの判定を取得します。
    //=============================================================================
    Game_Player.prototype.isNeedMapReload = function() {
        return this._needsMapReload;
    };

    //=============================================================================
    // Sprite
    //  SpriteIDの付与に使用するカウンターを取得します。
    //=============================================================================
    Sprite.getCounter = function() {
        return this._counter;
    };

    //=============================================================================
    // Sprite_Character
    //  対象キャラクターの消去判定を追加定義します。
    //=============================================================================
    Sprite_Character.prototype.isCharacterExtinct = function() {
        return this._character.isExtinct();
    };

    Sprite_Character.prototype.endAllEffect = function() {
        this.endBalloon();
        this.endAnimation();
    };

    Sprite_Character.prototype.endAnimation = function() {
        if (this._animationSprites.length > 0) {
            var sprites            = this._animationSprites.clone();
            this._animationSprites = [];
            sprites.forEach(function(sprite) {
                sprite.remove();
            });
        }
    };

    //=============================================================================
    // Spriteset_Map
    //  プレハブイベントのスプライトを管理します。
    //=============================================================================
    var _Spriteset_Map_createCharacters      = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        this._prefabSpriteId = Sprite.getCounter() + 1;
        _Spriteset_Map_createCharacters.apply(this, arguments);
    };

    var _Spriteset_Map_update      = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.apply(this, arguments);
        this.updatePrefabEvent();
    };

    Spriteset_Map.prototype.updatePrefabEvent = function() {
        $gameMap.getPrefabEvents().forEach(function(event) {
            if (!event.isSpritePrepared()) {
                this.makePrefabEventSprite(event);
            }
        }.bind(this));
        for (var i = 0, n = this._characterSprites.length; i < n; i++) {
            if (this._characterSprites[i].isCharacterExtinct()) {
                this.removePrefabEventSprite(i--);
                n--;
            }
        }
    };

    Spriteset_Map.prototype.makePrefabEventSprite = function(event) {
        event.setSpritePrepared();
        var sprite      = new Sprite_Character(event);
        sprite.spriteId = this._prefabSpriteId;
        this._characterSprites.push(sprite);
        this._tilemap.addChild(sprite);
        if (this._minimap && this._minimap.addObjectSprites) {
            this._minimap.addObjectSprites(event);
        }
        // Resolve conflict by MOG_EventText.js
        if (this._etextField) {
            this.refresh_event_text_field();
        }
    };

    // Resolve conflict by MOG_EventText.js
    Spriteset_Map.prototype.refresh_event_text_field = function() {
        for (var i = 0; i < this._characterSprites.length; i++) {
            if (!this._sprite_char_text[i]) {
                this._sprite_char_text[i] = new Sprite_CharText(this._characterSprites[i]);
                this._etextField.addChild(this._sprite_char_text[i]);
            }
        }
    };

    Spriteset_Map.prototype.removePrefabEventSprite = function(index) {
        var sprite = this._characterSprites[index];
        this._characterSprites.splice(index, 1);
        sprite.endAllEffect();
        this._tilemap.removeChild(sprite);
        // Resolve conflict by MOG_EventText.js
        if (this._sprite_char_text && this._sprite_char_text[index]) {
            this._etextField.removeChild(this._sprite_char_text[index]);
            this._sprite_char_text.splice(index, 1);
        }
    };

    //=============================================================================
    // Scene_Map
    //  場所移動時にセルフスイッチの情報を初期化します。
    //=============================================================================
    var _Scene_Map_create      = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        _Scene_Map_create.apply(this, arguments);
        if (this._transfer && !param.keepSelfSwitch) {
            $gameMap.resetSelfSwitchForPrefabEvent();
        }
    };

    //=============================================================================
    // DataManager
    //  マップデータのロード完了時にプレハブイベントのリンク先を復元します。
    //=============================================================================
    var _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad      = function(object) {
        _DataManager_onLoad.apply(this, arguments);
        if (object === $dataMap && $gameMap) $gameMap.restoreLinkPrefabEvents();
    };

    if (typeof Window_EventMiniLabel !== 'undefined') {
        var _Window_EventMiniLabel_gatherDisplayData      = Window_EventMiniLabel.prototype.gatherDisplayData
        Window_EventMiniLabel.prototype.gatherDisplayData = function() {
            if (!this._character.event()) {
                return;
            }
            _Window_EventMiniLabel_gatherDisplayData.apply(this, arguments);
        };
    }
})();

