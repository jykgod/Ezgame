var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 统一管理UI的切换时动画
 * 保持游戏UI动画风格的一致性
 */
var UIAnimationUtils = /** @class */ (function () {
    function UIAnimationUtils() {
    }
    /**
     * 缩放进入动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromScale 起始大小
     * @param toScale 目标大小
     */
    UIAnimationUtils.ScaleIn = function (node, callBack, fromScale, toScale) {
        if (fromScale === void 0) { fromScale = 0; }
        if (toScale === void 0) { toScale = 1; }
        node.active = true;
        node.scale = fromScale;
        node.stopAllActions();
        var scalIn = cc.scaleTo(0.5, toScale).easing(cc.easeBackOut());
        if (callBack != undefined && callBack != null) {
            var sequence = cc.sequence(scalIn, cc.callFunc(callBack));
            node.runAction(sequence);
        }
        else {
            node.runAction(scalIn);
        }
    };
    /**
     * 缩放退出动画
     * 注意：动画完成后会隐藏节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromScale 起始大小,默认为1
     * @param toScale 目标大小,默认为0
     */
    UIAnimationUtils.ScaleOut = function (node, callBack, fromScale, toScale) {
        if (fromScale === void 0) { fromScale = 1; }
        if (toScale === void 0) { toScale = 0; }
        node.scale = fromScale;
        node.stopAllActions();
        var scalIn = cc.scaleTo(0.5, toScale).easing(cc.easeBackIn());
        var sequence = cc.sequence(scalIn, cc.callFunc(function () {
            node.active = false;
            (callBack != undefined && callBack != null) && callBack();
        }));
        node.runAction(sequence);
    };
    /**
     * 位移进入动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param toPos 目标位置
     * @param fromPos 起始位置(默认为空，为空时从UI当前位置开始移动)
     */
    UIAnimationUtils.MoveIn = function (node, callBack, toPos, fromPos) {
        if (toPos === void 0) { toPos = cc.Vec2.ZERO; }
        if (fromPos === void 0) { fromPos = null; }
        node.active = true;
        if (fromPos != null)
            node.position = fromPos;
        node.stopAllActions();
        var moveIn = cc.moveTo(1, toPos).easing(cc.easeBackOut());
        if (callBack != undefined && callBack != null) {
            var sequence = cc.sequence(moveIn, cc.callFunc(callBack));
            node.runAction(sequence);
        }
        else {
            node.runAction(moveIn);
        }
    };
    /**
     * 位移退出动画
     * 注意：动画开始前会显示节点
     * @param node UINode
     * @param callBack 回调函数
     * @param fromPos 起始位置
     * @param toPos 目标位置
     */
    UIAnimationUtils.MoveOut = function (node, callBack, toPos, fromPos) {
        if (toPos === void 0) { toPos = cc.Vec2.ZERO; }
        if (fromPos === void 0) { fromPos = null; }
        if (fromPos != null)
            node.position = fromPos;
        node.stopAllActions();
        var scalIn = cc.moveTo(1, toPos).easing(cc.easeBackIn());
        var sequence = cc.sequence(scalIn, cc.callFunc(function () {
            node.active = false;
            (callBack != undefined && callBack != null) && callBack();
        }));
        node.runAction(sequence);
    };
    return UIAnimationUtils;
}());
var ECS;
(function (ECS) {
    var ComponentSystem = /** @class */ (function () {
        function ComponentSystem() {
        }
        return ComponentSystem;
    }());
    ECS.ComponentSystem = ComponentSystem;
})(ECS || (ECS = {}));
var ECS;
(function (ECS) {
    var SystemManager = /** @class */ (function () {
        function SystemManager() {
        }
        return SystemManager;
    }());
    ECS.SystemManager = SystemManager;
})(ECS || (ECS = {}));
var ECS;
(function (ECS) {
    var World = /** @class */ (function () {
        /**
         * 构造函数
         * @param name 命名
         */
        function World(name) {
            this._name = name;
        }
        Object.defineProperty(World, "active", {
            get: function () {
                return this._active;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(World.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return World;
    }());
    ECS.World = World;
})(ECS || (ECS = {}));
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var TimeManager = /** @class */ (function () {
    function TimeManager() {
        /**
         * 游戏第一个场景加载完成时到当前帧经过的帧时间
         */
        this._realTimeSinceStartScene = 0;
    }
    Object.defineProperty(TimeManager.prototype, "realTimeSinceStartScene", {
        /**
         * 游戏第一个场景加载完成时到当前帧经过的帧时间
         */
        get: function () {
            return this._realTimeSinceStartScene;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化函数
     */
    TimeManager.prototype.Init = function () {
        this._realTimeSinceStartScene = 0;
    };
    /**
     * 需要每帧调用的update
     * @param dt 当前帧与上一帧的间隔时间
     */
    TimeManager.prototype.Update = function (dt) {
        this._realTimeSinceStartScene += dt;
    };
    /**
     * 单例模式声明
     */
    TimeManager.Instance = new TimeManager();
    return TimeManager;
}());
/// <reference path="../manager/TimeManager.ts" />
var Tools;
(function (Tools) {
    /**
     * 计时器
     */
    var Timer = /** @class */ (function () {
        function Timer() {
            this.Reset();
        }
        Object.defineProperty(Timer.prototype, "paused", {
            /**
             * 计时器是否处于暂停状态
             */
            get: function () {
                return this._paused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timer.prototype, "time", {
            /**
             * 获取计时器时间
             */
            get: function () {
                a: TimeManager;
                if (this._paused == false) {
                    return TimeManager.Instance.realTimeSinceStartScene - this.startTime;
                }
                else {
                    return TimeManager.Instance.realTimeSinceStartScene - this.lastPauseTime;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 计时器复位
         */
        Timer.prototype.Reset = function () {
            this._paused = false;
            this.startTime = TimeManager.Instance.realTimeSinceStartScene;
        };
        /**
         * 暂停计时器
         */
        Timer.prototype.Pause = function () {
            if (this._paused == true) {
                return;
            }
            this._paused = true;
            this.lastPauseTime = TimeManager.Instance.realTimeSinceStartScene;
        };
        /**
         * 恢复暂停中的计时器
         */
        Timer.prototype.Resume = function () {
            if (this._paused == false) {
                return;
            }
            this._paused = false;
            this.lastPauseTime = 0;
            this.startTime = this.startTime + TimeManager.Instance.realTimeSinceStartScene - this.lastPauseTime;
        };
        return Timer;
    }());
    Tools.Timer = Timer;
})(Tools || (Tools = {}));
var Tools;
(function (Tools) {
    /**
     * 构造器抽象类
     */
    var Builder = /** @class */ (function () {
        /**
         * 构造器构造方法(在需要构造对象的类中调用)
         * @param instance 构造对象实例
         */
        function Builder(instance) {
            this.instance = instance;
        }
        /**
         * 构造完成返回实例
         */
        Builder.prototype.build = function () {
            return this.instance;
        };
        return Builder;
    }());
    Tools.Builder = Builder;
})(Tools || (Tools = {}));
var Tools;
(function (Tools) {
    /**
     * 用于从本地读写数据
     */
    var LocalStorageUtils = /** @class */ (function () {
        function LocalStorageUtils() {
        }
        LocalStorageUtils.setNumber = function (key, value) {
            cc.sys.localStorage.setItem(key, value.toString());
        };
        LocalStorageUtils.setString = function (key, value) {
            cc.sys.localStorage.setItem(key, value);
        };
        LocalStorageUtils.setObject = function (key, value) {
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        };
        LocalStorageUtils.getNumber = function (key, value) {
            if (value === void 0) { value = 0; }
            var ret = cc.sys.localStorage.getItem(key);
            if (ret == null || ret == undefined)
                return value;
            return +ret;
        };
        LocalStorageUtils.getString = function (key, value) {
            if (value === void 0) { value = null; }
            var ret = cc.sys.localStorage.getItem(key);
            if (ret == null || ret == undefined)
                return value;
            return ret;
        };
        LocalStorageUtils.getObject = function (key, value) {
            if (value === void 0) { value = null; }
            var ret = cc.sys.localStorage.getItem(key);
            if (ret == null || ret == undefined)
                return value;
            return JSON.parse(ret);
        };
        LocalStorageUtils.loadStorageObject = function (key) {
            var ret = LocalStorageUtils.getObject(key);
            if (ret == null || ret == undefined)
                return null;
            ret.Key = Tools.LocalStorageBase.prototype.Key;
            ret.Save = Tools.LocalStorageBase.prototype.Save;
            return ret;
        };
        // public static loadStorageObject<T extends LocalStorageBase>(): T{
        //     return <T>LocalStorageUtils.getObject();
        // }
        LocalStorageUtils.saveStorageObject = function (obj) {
            obj.Save();
        };
        return LocalStorageUtils;
    }());
    Tools.LocalStorageUtils = LocalStorageUtils;
})(Tools || (Tools = {}));
window.LocalStorageUtils = Tools.LocalStorageUtils;
///<reference path="./LocalStorageUtils.ts"/>
var Tools;
(function (Tools) {
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Object.defineProperty(Logger, "EnableLog", {
            get: function () {
                return this._enableLog;
            },
            set: function (value) {
                this._enableLog = value;
                Tools.LocalStorageUtils.setNumber("5_", value ? 1 : 0);
            },
            enumerable: true,
            configurable: true
        });
        Logger.log = function (arg, tag) {
            if (this._enableLog == false)
                return;
            if (tag != null && tag != undefined) {
                console.log("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg + " ");
            }
            else {
                console.log("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.warn = function (arg, tag) {
            if (this._enableLog == false)
                return;
            if (tag != null && tag != undefined) {
                console.warn("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
            else {
                console.warn("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.error = function (arg, tag) {
            if (this._enableLog == false)
                return;
            if (tag != null && tag != undefined) {
                console.error("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
            else {
                console.error("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.info = function (arg) {
            if (this._enableLog == false)
                return;
            console.info(arg);
        };
        /**
        * 是否开启log
        */
        Logger._enableLog = Tools.LocalStorageUtils.getNumber("5_", 0) == 1;
        return Logger;
    }());
    Tools.Logger = Logger;
})(Tools || (Tools = {}));
var Logger = Tools.Logger;
/// <reference path="../tools/Timer.ts" />
/// <reference path="../tools/Builder.ts" />
/// <reference path="../tools/Logger.ts" />
var FSM;
(function (FSM) {
    var StateMachine = /** @class */ (function () {
        /**
         * 构造函数
         */
        function StateMachine() {
            /**
             * 状态机索引表
             * key : stateType
             * value : state
             */
            this.statesMap = new Array();
            /**
             * 当前状态
             */
            this.currentState = null;
            /**
             * 状态机是否正在切换状态
             */
            this.asyncChangingState = false;
            this.timer = new Tools.Timer();
        }
        /**
         * 往状态机里面添加状态
         * @param state 状态
         */
        StateMachine.prototype.AddState = function (state) {
            if (this.statesMap[state.stateType] != null && this.statesMap[state.stateType] != undefined) {
                Tools.Logger.error("attemp to add a same State into the StateMachine. StateMatchine:" + name + " State:" + state.stateType);
                return;
            }
            this.statesMap[state.stateType] = state;
        };
        /**
         * 获得构造器
         */
        StateMachine.GetBuilder = function () {
            /**
             * 实例化构造器
             */
            return new StateMachineBuilder(new StateMachine());
        };
        /**
         * 立即切换状态机状态,hint:
         * 1.状态会立即切换
         * 2.处于异步切换状态的状态机是不能执行状态切换的
         * @param nextStateType
         * @param args
         */
        StateMachine.prototype.ChangeState = function (nextStateType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                Tools.Logger.error("attemp to change to the " + nextStateType + " which " + name + " not has!", "FSM");
                return;
            }
            if (this.asyncChangingState) {
                Tools.Logger.error("attemp to change to the " + nextStateType + " when the stateMachine is changing with async method!", "FSM");
                return;
            }
            if (this.currentState != null) {
                this.currentState.StateEnd(this.timer.time);
            }
            this.currentState = this.statesMap[nextStateType];
            this.timer.Reset();
            (_a = this.currentState).StateEnter.apply(_a, args);
        };
        /**
         * 异步切换状态机状态,hint:
         * 1.状态不会立即切换，而是异步执行
         * 2.状态机切换期间是不能再执行状态切换的!
         * @param nextStateType
         * @param callback 成功切换状态机后执行的回调函数
         * @param args
         */
        StateMachine.prototype.ChangeStateAsync = function (nextStateType, callback) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                                Tools.Logger.error("attemp to change to the " + nextStateType + " which " + name + " not has!", "FSM");
                                return [2 /*return*/];
                            }
                            if (this.asyncChangingState) {
                                Tools.Logger.error("attemp to change to the " + nextStateType + " when the stateMachine is changing with async method!", "FSM");
                                return [2 /*return*/];
                            }
                            this.asyncChangingState = true;
                            if (!(this.currentState != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.currentState.StateEnd(this.timer.time)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            this.currentState = this.statesMap[nextStateType];
                            this.timer.Reset();
                            return [4 /*yield*/, this.currentState.StateEnter(args)];
                        case 3:
                            _a.sent();
                            this.asyncChangingState = false;
                            callback != undefined && callback();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 状态机更新
         */
        StateMachine.prototype.Update = function () {
            this.currentState != null && this.currentState.StateUpdate != undefined && !this.timer.paused && !this.asyncChangingState &&
                this.currentState.StateUpdate(this.timer.time);
        };
        /**
         * 状态机暂停
         */
        StateMachine.prototype.Pause = function () {
            this.timer.Pause();
        };
        /**
         * 状态机恢复
         */
        StateMachine.prototype.Resume = function () {
            this.timer.Resume();
        };
        /**
         * 空状态
         * hint:stateType 为 -1,这意味着在加入NONE状态的状态机中状态类型不能为-1
         */
        StateMachine.NONE = {
            stateType: -1,
            StateEnter: function () {
            },
            StateEnd: function (time) {
            }
        };
        return StateMachine;
    }());
    FSM.StateMachine = StateMachine;
    /**
     * 声明状态机构造器
     */
    var StateMachineBuilder = /** @class */ (function (_super) {
        __extends(StateMachineBuilder, _super);
        function StateMachineBuilder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 通过构造器向状态机添加状态
         * @param state 需要添加的状态
         */
        StateMachineBuilder.prototype.AddState = function (state) {
            this.instance.AddState(state);
            return this;
        };
        return StateMachineBuilder;
    }(Tools.Builder));
})(FSM || (FSM = {}));
var NetWork;
(function (NetWork) {
    var SeverSession = /** @class */ (function () {
        /**
         * 构造函数
         * @param name 服务器会话名字
         * @param url 服务器url,需要使用'ws'或者'wss'开头
         */
        function SeverSession(name, url) {
            /**
             * 会话状态
             */
            this.sesionState = SessionState.DISCONNECTED;
            if (name == null || name == undefined) {
                Tools.Logger.error("session name can't be null or undefined");
                return;
            }
            var self = this;
            this.ws = new WebSocket("ws://" + url);
            this.name = name;
            this.sesionState = SessionState.CONNECTING;
            this.ws.onopen = function (event) {
                Tools.Logger.log("connect", self.name);
                self.sesionState = SessionState.CONNECTED;
                if (self.OnConnect != undefined) {
                    self.OnConnect(event);
                }
            };
            this.ws.onclose = function (event) {
                Tools.Logger.log("disconnect", self.name);
                self.sesionState = SessionState.DISCONNECTED;
                if (self.OnDisConnect != undefined) {
                    self.OnDisConnect(event);
                }
            };
            this.ws.onmessage = function (event) {
                // Tools.Logger.log("getmessage:" + event.data, self.name);
                if (self.OnGetMessage != undefined) {
                    self.OnGetMessage(event);
                }
            };
            this.ws.onerror = function (event) {
                Tools.Logger.error("error:" + event.error, self.name);
                if (self.OnError != undefined) {
                    self.OnError(event);
                }
            };
        }
        Object.defineProperty(SeverSession.prototype, "state", {
            /**
             * 获取会话状态
             */
            get: function () {
                return this.sesionState;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SeverSession.prototype, "connected", {
            /**
             * 判断会话是否处于链接状态
             */
            get: function () {
                return this.sesionState == SessionState.CONNECTED;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 主动断开会话
         */
        SeverSession.prototype.Close = function (code, reason) {
            if (this.sesionState == SessionState.DISCONNECTING || this.sesionState == SessionState.DISCONNECTED) {
                return;
            }
            Logger.log("Try close", this.name);
            this.sesionState = SessionState.DISCONNECTING;
            this.ws.close(code, reason);
        };
        /**
         * 向服务器发送消息
         * @param arrayBuffer 字节数组
         */
        SeverSession.prototype.SendMessage = function (arrayBuffer) {
            this.ws.send(arrayBuffer);
        };
        return SeverSession;
    }());
    NetWork.SeverSession = SeverSession;
    var SessionState;
    (function (SessionState) {
        SessionState[SessionState["CONNECTED"] = 0] = "CONNECTED";
        SessionState[SessionState["CONNECTING"] = 1] = "CONNECTING";
        SessionState[SessionState["DISCONNECTED"] = 2] = "DISCONNECTED";
        SessionState[SessionState["DISCONNECTING"] = 3] = "DISCONNECTING";
    })(SessionState = NetWork.SessionState || (NetWork.SessionState = {}));
})(NetWork || (NetWork = {}));
var SimCivil;
(function (SimCivil) {
    var Rpc;
    (function (Rpc) {
        var Callback;
        (function (Callback) {
            var RpcCallback = /** @class */ (function () {
                function RpcCallback() {
                }
                return RpcCallback;
            }());
            Callback.RpcCallback = RpcCallback;
        })(Callback = Rpc.Callback || (Rpc.Callback = {}));
    })(Rpc = SimCivil.Rpc || (SimCivil.Rpc = {}));
})(SimCivil || (SimCivil = {}));
/**
 * RPC修饰器
 * 用来修饰客户端发起的RPC调用函数
 * 整个RPC的包都建立在c#服务器端使用Json.net对数据结构进行序列化的情况下完成的,并不通用！
 */
function RPC(serviceName, noReturn) {
    /**
     * 真正的修饰器函数
     */
    return function (target, methodName, descriptor) {
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var i, _sequence, ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Tools.Logger.log(typeof target);
                            // Tools.Logger.log(serviceName);
                            for (i = 0; i < args.length; i++) {
                                if (typeof (args[i]) == "function") {
                                    args[i] = RpcClient.Instance.AddCallBack(target, args[i]);
                                }
                            }
                            _sequence = RpcClient.Instance.GetSequence();
                            RpcClient.Instance.SendRpc(_sequence, serviceName, methodName, args);
                            if (!(noReturn == false)) return [3 /*break*/, 2];
                            return [4 /*yield*/, RpcClient.Instance.GetResponce(_sequence)];
                        case 1:
                            ret = _a.sent();
                            if (ret == null || ret == undefined)
                                return [2 /*return*/, null];
                            if (ret.ReturnValue["$values"] != null && ret.ReturnValue["$values"] != undefined) {
                                return [2 /*return*/, ret.ReturnValue["$values"]];
                            }
                            if (ret.ReturnValue["$value"] != null && ret.ReturnValue["$value"] != undefined) {
                                return [2 /*return*/, ret.ReturnValue["$value"]];
                            }
                            return [2 /*return*/, ret.ReturnValue];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
    };
}
var RpcClient = /** @class */ (function () {
    /**
     * 构造函数
     */
    function RpcClient() {
        /**
         * 与rpc服务器建立的会话
         */
        this._session = null;
        /**
         * 消息序列号
         */
        this._sequence = 0;
        /**
         * 消息返回值队列
         */
        this.resultQueue = new Array();
        /**
         * 消息promise队列
         */
        this.promiseQueue = new Array();
        /**
         * 消息回调函数队列
         */
        this.callbackQueue = new Array();
        /**
         * 消息回调函数目标对象队列
         */
        this.callbackTargetQueue = new Array();
        /**
         * 超时时间
         */
        this.timeOut = 2;
    }
    Object.defineProperty(RpcClient.prototype, "session", {
        /**
         * 与rpc服务器建立的会话
         */
        get: function () {
            return this._session;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * rpc客户端初始化，用来构造一个与服务器进行RPC同行的类
     * @param url 服务器地址
     */
    RpcClient.prototype.Init = function (url, callBack, errorCallBack) {
        var _this = this;
        this._session = new NetWork.SeverSession("RPC", url);
        this._session.OnGetMessage = function (event) { return _this.GetMessage(event); };
        this._session.OnConnect = function (event) { return callBack(event); };
        this._session.OnError = function (event) { return errorCallBack(event); };
    };
    /**
     * 收取并加工再交给做rpc处理的函数
     * @param event messageEvent
     */
    RpcClient.prototype.GetMessage = function (event) {
        var self = this;
        var reader = new FileReader();
        reader.readAsText(event.data, 'utf-8');
        reader.onload = function (ev) {
            var _a;
            //Logger.info(reader.result);
            var ret = JSON.parse(reader.result);
            if (ret["$type"].indexOf("SimCivil.Rpc.RpcResponse") != -1) {
                var obj = JSON.parse(reader.result);
                self.resultQueue[obj.Sequence] = obj;
                if (self.promiseQueue[obj.Sequence] != undefined && self.promiseQueue[obj.Sequence] != null) {
                    self.promiseQueue[obj.Sequence]();
                }
            }
            if (ret["$type"].indexOf("SimCivil.Rpc.Callback.RpcCallback") != -1) {
                var obj = JSON.parse(reader.result);
                if (self.callbackQueue[obj.CallbackId] != undefined && self.callbackQueue[obj.CallbackId] != null) {
                    if (obj.Parameters != null && obj.Parameters != undefined) {
                        (_a = self.callbackQueue[obj.CallbackId]).call.apply(_a, [self.callbackTargetQueue[obj.CallbackId]].concat(obj.Parameters));
                    }
                    else {
                        self.callbackQueue[obj.CallbackId].call(self.callbackTargetQueue[obj.CallbackId]);
                    }
                }
            }
        };
    };
    /**
     * 获取消息序列号
     */
    RpcClient.prototype.GetSequence = function () {
        return this._sequence++;
    };
    /**
     * 添加回调函数并返回id
     * @param func 回调函数
     */
    RpcClient.prototype.AddCallBack = function (target, func) {
        this.callbackQueue.push(func);
        this.callbackTargetQueue.push(target);
        return this.callbackQueue.length - 1;
    };
    /**
     * 通过序列号获取消息类型
     */
    RpcClient.prototype.GetResponce = function (sequence) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.promiseQueue[sequence] = resolve;
                            setTimeout(function () {
                                reject('timeout in ' + _this.timeOut + ' seconds.');
                            }, _this.timeOut * 1000);
                        }).catch(function () {
                            //TODO:需要更详细的结果（具体是哪个协议超时了）
                            Tools.Logger.log("TimeOut", "RPC");
                        })];
                    case 1:
                        _a.sent();
                        ret = this.resultQueue[sequence];
                        this.resultQueue[sequence] = null;
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    /**
     * 发送rpc消息给服务器
     * @param sequence 序列号
     * @param serviceName 服务名
     * @param methodName 方法名
     * @param args 参数
     */
    RpcClient.prototype.SendRpc = function (sequence, serviceName, methodName, args) {
        var json = {
            "$type": "SimCivil.Rpc.RpcRequest, SimCivil.Rpc",
            "ServiceName": serviceName,
            "MethodName": methodName,
            "Arguments": args,
            "Sequence": sequence,
            "TimeStamp": new Date().toISOString()
        };
        // if (!("TextEncoder" in window)) {
        //     Tools.Logger.error("Sorry, this browser does not support TextEncoder...", "RPC");
        //     return;
        // }
        Tools.Logger.log(JSON.stringify(json), "RPC");
        //Tools.Logger.info(json);
        // let enc = new TextEncoder();
        // let str = JSON.stringify(json);
        // // Logger.log(str, "RPC");
        // // let length = enc.encode(str).length;
        // // str = "  ".concat(str);
        // // let arr = enc.encode(str);
        // // arr.set([length / 256, length % 256], 0);
        // this.session.SendMessage(enc.encode(str).buffer);
        this.session.SendMessage(this.stringToByte(JSON.stringify(json)));
    };
    //字符串转ArrayBuffer
    RpcClient.prototype.stringToByte = function (str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            }
            else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            }
            else {
                bytes.push(c & 0xFF);
            }
        }
        var buf = new ArrayBuffer(bytes.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = bytes[i];
        }
        return buf;
    };
    RpcClient.prototype.Disconnect = function () {
        this._session.Close();
    };
    /**
     * 单例
     */
    RpcClient.Instance = new RpcClient();
    return RpcClient;
}());
var SimCivil;
(function (SimCivil) {
    var Rpc;
    (function (Rpc) {
        var RpcResponse = /** @class */ (function () {
            function RpcResponse() {
            }
            return RpcResponse;
        }());
        Rpc.RpcResponse = RpcResponse;
    })(Rpc = SimCivil.Rpc || (SimCivil.Rpc = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var CreateRoleOption = /** @class */ (function () {
            function CreateRoleOption() {
                this.$type = "SimCivil.Contract.CreateRoleOption, SimCivil.Contract";
                // NAME
                this.Name = null;
                // GENDER
                this.Gender = null;
                // RACE
                this.Race = null;
            }
            return CreateRoleOption;
        }());
        Contract.CreateRoleOption = CreateRoleOption;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var EntityInspection = /** @class */ (function () {
            function EntityInspection() {
                this.$type = "SimCivil.Contract.EntityInspection, SimCivil.Contract";
                // ENTITYID
                this.EntityId = "00000000-0000-0000-0000-000000000000";
                // TIMESTAMP
                this.TimeStamp = new Date(0);
                // OBSERVERID
                this.ObserverId = "00000000-0000-0000-0000-000000000000";
                // VALUES
                this.Values = {};
            }
            return EntityInspection;
        }());
        Contract.EntityInspection = EntityInspection;
        var EntityInspectionValue = /** @class */ (function () {
            function EntityInspectionValue() {
                this.$type = "SimCivil.Contract.EntityInspectionValue, SimCivil.Contract";
            }
            return EntityInspectionValue;
        }());
        Contract.EntityInspectionValue = EntityInspectionValue;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var Gender;
        (function (Gender) {
            Gender[Gender["male"] = 0] = "male";
            Gender[Gender["female"] = 1] = "female";
            Gender[Gender["other"] = 2] = "other";
            Gender[Gender["none"] = 3] = "none";
        })(Gender = Contract.Gender || (Contract.Gender = {}));
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var IAuth = /** @class */ (function () {
            function IAuth() {
            }
            IAuth.LogIn = function (username, password) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            IAuth.LogInAsync = function (username, password) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            IAuth.LogOut = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IAuth.LogOutAsync = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IAuth.GetToken = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, null];
                    });
                });
            };
            IAuth.Register = function (username, password) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "LogIn", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "LogInAsync", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", true)
            ], IAuth, "LogOut", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", true)
            ], IAuth, "LogOutAsync", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "GetToken", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "Register", null);
            return IAuth;
        }());
        Contract.IAuth = IAuth;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var IPlayerController = /** @class */ (function () {
            function IPlayerController() {
            }
            IPlayerController.Move = function (direction, speed) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IPlayerController.Stop = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IPlayerController.MoveTo = function (value, timestamp) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "Move", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "Stop", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "MoveTo", null);
            return IPlayerController;
        }());
        Contract.IPlayerController = IPlayerController;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var IRoleManager = /** @class */ (function () {
            function IRoleManager() {
            }
            IRoleManager.CreateRole = function (option) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            IRoleManager.GetRoleList = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, []];
                    });
                });
            };
            IRoleManager.UseRole = function (eid) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            IRoleManager.ReleaseRole = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, false];
                    });
                });
            };
            __decorate([
                RPC("SimCivil.Contract.IRoleManager", false)
            ], IRoleManager, "CreateRole", null);
            __decorate([
                RPC("SimCivil.Contract.IRoleManager", false)
            ], IRoleManager, "GetRoleList", null);
            __decorate([
                RPC("SimCivil.Contract.IRoleManager", false)
            ], IRoleManager, "UseRole", null);
            __decorate([
                RPC("SimCivil.Contract.IRoleManager", false)
            ], IRoleManager, "ReleaseRole", null);
            return IRoleManager;
        }());
        Contract.IRoleManager = IRoleManager;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var ViewChange = /** @class */ (function () {
            function ViewChange() {
                this.$type = "SimCivil.Contract.ViewChange, SimCivil.Contract";
                // TICKCOUNT
                this.TickCount = 0;
                // TILECHANGE
                this.TileChange = [];
                // ENTITYCHANGE
                this.EntityChange = [];
                // EVENTS
                this.Events = [];
                // POSITION
                this.Position = null;
                // SPEED
                this.Speed = 0;
            }
            ViewChange.prototype.ToString = function () {
                return null;
            };
            return ViewChange;
        }());
        Contract.ViewChange = ViewChange;
        var ViewEvent = /** @class */ (function () {
            function ViewEvent() {
                this.$type = "SimCivil.Contract.ViewEvent, SimCivil.Contract";
                // EVENTTYPE
                this.EventType = null;
                // TARGETENTITYID
                this.TargetEntityId = "00000000-0000-0000-0000-000000000000";
            }
            ViewEvent.prototype.ToString = function () {
                return null;
            };
            return ViewEvent;
        }());
        Contract.ViewEvent = ViewEvent;
        var EntityDto = /** @class */ (function () {
            function EntityDto() {
                this.$type = "SimCivil.Contract.EntityDto, SimCivil.Contract";
                // ID
                this.Id = "00000000-0000-0000-0000-000000000000";
                // NAME
                this.Name = null;
                // POS
                this.Pos = null;
            }
            EntityDto.prototype.ToString = function () {
                return null;
            };
            return EntityDto;
        }());
        Contract.EntityDto = EntityDto;
        var TileDto = /** @class */ (function () {
            function TileDto() {
                this.$type = "SimCivil.Contract.TileDto, SimCivil.Contract";
                // POSITION
                this.Position = null;
                // SURFACE
                this.Surface = null;
            }
            return TileDto;
        }());
        Contract.TileDto = TileDto;
        var ViewEventType;
        (function (ViewEventType) {
            ViewEventType[ViewEventType["entityLeave"] = 0] = "entityLeave";
        })(ViewEventType = Contract.ViewEventType || (Contract.ViewEventType = {}));
        var IViewSynchronizer = /** @class */ (function () {
            function IViewSynchronizer() {
            }
            IViewSynchronizer.RegisterViewSync = function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IViewSynchronizer.DeregisterViewSync = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            __decorate([
                RPC("SimCivil.Contract.IViewSynchronizer", true)
            ], IViewSynchronizer, "RegisterViewSync", null);
            __decorate([
                RPC("SimCivil.Contract.IViewSynchronizer", true)
            ], IViewSynchronizer, "DeregisterViewSync", null);
            return IViewSynchronizer;
        }());
        Contract.IViewSynchronizer = IViewSynchronizer;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var Race;
        (function (Race) {
            Race[Race["human"] = 0] = "human";
        })(Race = Contract.Race || (Contract.Race = {}));
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        // $Classes/Enums/Interfaces(filter)[template][separator]
        // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
        // template: The template to repeat for each matched item
        // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]
        // More info: http://frhagn.github.io/Typewriter/
        var RoleSummary = /** @class */ (function () {
            function RoleSummary() {
                this.$type = "SimCivil.Contract.RoleSummary, SimCivil.Contract";
                // ID
                this.Id = "00000000-0000-0000-0000-000000000000";
                // NAME
                this.Name = null;
                // GENDER
                this.Gender = null;
                // RACE
                this.Race = null;
            }
            RoleSummary.prototype.ToString = function () {
                return null;
            };
            return RoleSummary;
        }());
        Contract.RoleSummary = RoleSummary;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var SimCivil;
(function (SimCivil) {
    var Contract;
    (function (Contract) {
        var ValueTuple = /** @class */ (function () {
            function ValueTuple(value) {
                this.$type = "System.ValueTuple`2[[System.Single, mscorlib],[System.Single, mscorlib]], System.ValueTuple";
                this.Item1 = +value.Item1.toPrecision(6);
                this.Item2 = +value.Item2.toPrecision(6);
            }
            return ValueTuple;
        }());
        Contract.ValueTuple = ValueTuple;
    })(Contract = SimCivil.Contract || (SimCivil.Contract = {}));
})(SimCivil || (SimCivil = {}));
var Tools;
(function (Tools) {
    var LocalStorageBase = /** @class */ (function () {
        function LocalStorageBase(key) {
            this.key = key;
        }
        LocalStorageBase.prototype.Key = function () {
            return this.key;
        };
        LocalStorageBase.prototype.Save = function () {
            Tools.LocalStorageUtils.setObject(this.key, this);
        };
        return LocalStorageBase;
    }());
    Tools.LocalStorageBase = LocalStorageBase;
})(Tools || (Tools = {}));
window.LocalStorageBase = Tools.LocalStorageBase;
var Tools;
(function (Tools) {
    var QueueNode = /** @class */ (function () {
        function QueueNode(data) {
            this.next = null;
            this.data = data;
        }
        return QueueNode;
    }());
    /**
     * 队列
     * 只提供基本功能，进队、出队、查询大小、查询队头
     */
    var Queue = /** @class */ (function () {
        /**
         * 构造函数
         */
        function Queue() {
            this._count = 0;
            this._count = 0;
            this._first = this.trail = null;
        }
        Object.defineProperty(Queue.prototype, "first", {
            /**
             * 获取队列里元素个数
             */
            get: function () {
                return this._first.data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queue.prototype, "count", {
            /**
             * 获取队列里元素个数
             */
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 向队尾添加元素
         * @param obj 添加的类容
         */
        Queue.prototype.Enqueue = function (obj) {
            if (this._count == 0) {
                this._first = this.trail = new QueueNode(obj);
            }
            else {
                this.trail.next = new QueueNode(obj);
                this.trail = this.trail.next;
            }
            this._count++;
        };
        /**
         * 获取队头的元素
         * 并从队列中移除该元素
         */
        Queue.prototype.Dequeue = function () {
            if (this._count == 0) {
                return null;
            }
            this._count--;
            var ret = this._first.data;
            this._first = this._first.next;
            return ret;
        };
        return Queue;
    }());
    Tools.Queue = Queue;
})(Tools || (Tools = {}));
