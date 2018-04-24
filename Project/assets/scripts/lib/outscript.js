var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
    Object.defineProperty(TimeManager, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new TimeManager();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "realTimeSinceStartScene", {
        get: function () {
            return this._realTimeSinceStartScene;
        },
        enumerable: true,
        configurable: true
    });
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
    TimeManager.instance = null;
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
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        Logger.log = function (arg, tag) {
            if (tag != null && tag != undefined) {
                console.log("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg + " ");
            }
            else {
                console.log("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.warn = function (arg, tag) {
            if (tag != null && tag != undefined) {
                console.warn("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
            else {
                console.warn("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.error = function (arg, tag) {
            if (tag != null && tag != undefined) {
                console.error("[" + tag + "] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
            else {
                console.error("[notag] [" + TimeManager.Instance.realTimeSinceStartScene.toFixed(3) + "] " + arg);
            }
        };
        Logger.info = function (arg) {
            console.info(arg);
        };
        return Logger;
    }());
    Tools.Logger = Logger;
})(Tools || (Tools = {}));
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
         * 状态机切换状态
         * 状态会立即被切换，所以尽量不要在状态机的update里切换状态，即使切换了也尽量不要再处理别的逻辑了(容易出现错误)
         * 关于是否立即切换这一点有点想要改动orz，目前还是就这么先用着吧
         * @param nextStateType
         * @param args
         */
        StateMachine.prototype.ChangeState = function (nextStateType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this.statesMap[nextStateType] == null || this.statesMap[nextStateType] == undefined) {
                Tools.Logger.error("attemp to change to the " + nextStateType + " which " + name + " not has!");
                return;
            }
            if (this.currentState != null) {
                this.currentState.StateEnd(this.timer.time);
            }
            this.timer.Reset();
            this.currentState = this.statesMap[nextStateType];
            this.currentState.StateEnter(args);
        };
        /**
         * 状态机更新
         */
        StateMachine.prototype.Update = function () {
            if (this.currentState != null && this.currentState.StateUpdate != undefined) {
                this.currentState.StateUpdate(this.timer.time);
            }
        };
        /**
         * 空状态
         * stateType 为 "0",这意味着自定义的状态的状态类型不能为"0"
         */
        StateMachine.NONE = {
            stateType: 0,
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
                Tools.Logger.log("getmessage:" + event.data, self.name);
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
            Tools.Logger.log("Try close", this.name);
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
/**
 * RPC修饰器
 * 用来修饰客户端发起的RPC调用函数
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
                var _sequence;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Tools.Logger.log(typeof target);
                            Tools.Logger.log(serviceName);
                            _sequence = RpcClient.Instance.GetSequence();
                            RpcClient.Instance.SendRpc(_sequence, serviceName, methodName, args);
                            if (!(noReturn == false)) return [3 /*break*/, 2];
                            return [4 /*yield*/, RpcClient.Instance.GetResponce(_sequence)];
                        case 1: return [2 /*return*/, _a.sent()];
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
         * 超时时间
         */
        this.timeOut = 2;
    }
    Object.defineProperty(RpcClient, "Instance", {
        get: function () {
            if (this.instance == null) {
                this.instance = new RpcClient();
            }
            return this.instance;
        },
        enumerable: true,
        configurable: true
    });
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
            var obj = JSON.parse(reader.result);
            self.resultQueue[obj.Sequence] = obj;
            if (self.promiseQueue[obj.Sequence] != undefined && self.promiseQueue[obj.Sequence] != null) {
                self.promiseQueue[obj.Sequence]();
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
     * 通过序列号获取消息类型
     */
    RpcClient.prototype.GetResponce = function (sequence) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            _this.promiseQueue[sequence] = resolve;
                            setTimeout(function () {
                                reject('timeout in ' + _this.timeOut + ' seconds.');
                            }, _this.timeOut * 1000);
                        }).catch(function () {
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
            "Sequnce": sequence,
            "TimeStamp": new Date().toISOString()
        };
        if (!("TextEncoder" in window)) {
            Tools.Logger.error("Sorry, this browser does not support TextEncoder...", "RPC");
            return;
        }
        Tools.Logger.info(json);
        var enc = new TextEncoder();
        var str = JSON.stringify(json);
        // let length = enc.encode(str).length;
        // str = "  ".concat(str);
        // let arr = enc.encode(str);
        // arr.set([length / 256, length % 256], 0);
        this.session.SendMessage(enc.encode(str).buffer);
    };
    /**
     * 单例
     */
    RpcClient.instance = null;
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
            IAuth.LogOut = function () {
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
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "LogIn", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", true)
            ], IAuth, "LogOut", null);
            __decorate([
                RPC("SimCivil.Contract.IAuth", false)
            ], IAuth, "GetToken", null);
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
        var InteractionType;
        (function (InteractionType) {
        })(InteractionType = Contract.InteractionType || (Contract.InteractionType = {}));
        var IPlayerController = /** @class */ (function () {
            function IPlayerController() {
            }
            IPlayerController.GetMoveState = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, null];
                    });
                });
            };
            IPlayerController.Move = function (direction, speed) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, null];
                    });
                });
            };
            IPlayerController.MovePercentage = function (direction, relativeSpeed) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, null];
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
            IPlayerController.Interaction = function (target, interactionType) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            IPlayerController.Build = function (tileElement, position) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, void (0)];
                    });
                });
            };
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", false)
            ], IPlayerController, "GetMoveState", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", false)
            ], IPlayerController, "Move", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", false)
            ], IPlayerController, "MovePercentage", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "Stop", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "Interaction", null);
            __decorate([
                RPC("SimCivil.Contract.IPlayerController", true)
            ], IPlayerController, "Build", null);
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
                // TICKCOUNT
                this.TickCount = 0;
                // TILECHANGE
                this.TileChange = [];
                // ENTITYCHANGE
                this.EntityChange = [];
                // EVENTS
                this.Events = [];
            }
            ViewChange.prototype.ToString = function () {
                return null;
            };
            return ViewChange;
        }());
        Contract.ViewChange = ViewChange;
        var ViewEvent = /** @class */ (function () {
            function ViewEvent() {
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
            __decorate([
                RPC("SimCivil.Contract.IViewSynchronizer", true)
            ], IViewSynchronizer, "RegisterViewSync", null);
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
