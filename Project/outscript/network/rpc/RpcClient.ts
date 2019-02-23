/**
 * RPC修饰器
 * 用来修饰客户端发起的RPC调用函数
 * 整个RPC的包都建立在c#服务器端使用Json.net对数据结构进行序列化的情况下完成的,并不通用！
 */
function RPC(serviceName: string, noReturn: boolean) {
    /**
     * 真正的修饰器函数
     */
    return function (target: object, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            // Tools.Logger.log(typeof target);
            // Tools.Logger.log(serviceName);
            for (let i = 0; i < args.length; i++) {
                if (typeof (args[i]) == "function") {
                    args[i] = RpcClient.Instance.AddCallBack(target, args[i]);
                }
            }
            let _sequence = RpcClient.Instance.GetSequence();
            RpcClient.Instance.SendRpc(_sequence, serviceName, methodName, args);
            if (noReturn == false) {
                let ret = await RpcClient.Instance.GetResponce(_sequence);
                if (ret == null || ret == undefined) return null;
                // Logger.info(ret);
                TimeManager.Instance.SaveServerTime(ret.TimeStamp);
                if (ret.ReturnValue["$values"] != null && ret.ReturnValue["$values"] != undefined) {
                    return ret.ReturnValue["$values"];
                }
                if (ret.ReturnValue["$value"] != null && ret.ReturnValue["$value"] != undefined) {
                    return ret.ReturnValue["$value"];
                }
                return ret.ReturnValue;
            } else {
                return;
            }
        }
    }
}

class RpcClient {
    /**
     * 单例
     */
    public static readonly Instance = new RpcClient();
    /**
     * 构造函数
     */
    private constructor() { }
    /**
     * 与rpc服务器建立的会话
     */
    private _session: NetWork.SeverSession = null;
    /**
     * 消息序列号
     */
    private _sequence = 0;
    /**
     * 消息返回值队列
     */
    public resultQueue: Array<SimCivil.Rpc.RpcResponse> = new Array<SimCivil.Rpc.RpcResponse>();
    /**
     * 消息promise队列
     */
    public promiseQueue: Array<any> = new Array<any>();
    /**
     * 消息回调函数队列
     */
    public callbackQueue: Array<Function> = new Array<Function>();
    /**
     * 消息回调函数目标对象队列
     */
    public callbackTargetQueue: Array<object> = new Array<object>();
    /**
     * 超时时间
     */
    private timeOut = 5;
    /**
     * 与rpc服务器建立的会话
     */
    public get session(): NetWork.SeverSession {
        return this._session;
    }
    /**
     * rpc客户端初始化，用来构造一个与服务器进行RPC同行的类
     * @param url 服务器地址
     */
    public Init(url: string, callBack?: (event: Event) => void, errorCallBack?: (event: ErrorEvent) => void) {
        this._session = new NetWork.SeverSession("RPC", url);
        this._session.OnGetMessage = (event) => this.GetMessage(event);
        this._session.OnConnect = (event) => callBack(event);
        this._session.OnError = (event) => errorCallBack(event);
    }
    /**
     * 收取并加工再交给做rpc处理的函数
     * @param event messageEvent
     */
    private GetMessage(event: MessageEvent) {
        let self = this;
        let reader = new FileReader();
        reader.readAsText(event.data, 'utf-8');
        reader.onload = function (ev: ProgressEvent) {
            Logger.info(reader.result);
            let ret = JSON.parse(reader.result);
            if ((<string>ret["$type"]).indexOf("SimCivil.Rpc.RpcResponse") != -1) {
                let obj: SimCivil.Rpc.RpcResponse = JSON.parse(reader.result);
                self.resultQueue[obj.Sequence] = obj;
                if (self.promiseQueue[obj.Sequence] != undefined && self.promiseQueue[obj.Sequence] != null) {
                    self.promiseQueue[obj.Sequence]();
                }
            }
            if ((<string>ret["$type"]).indexOf("SimCivil.Rpc.Callback.RpcCallback") != -1){
                let obj: SimCivil.Rpc.Callback.RpcCallback = JSON.parse(reader.result);
                if (self.callbackQueue[obj.CallbackId] != undefined && self.callbackQueue[obj.CallbackId] != null) {
                    if(obj.Parameters != null && obj.Parameters != undefined){
                        self.callbackQueue[obj.CallbackId].call(self.callbackTargetQueue[obj.CallbackId], ...obj.Parameters);
                    }else{
                        self.callbackQueue[obj.CallbackId].call(self.callbackTargetQueue[obj.CallbackId]);
                    }
                }
            }
        }
    }
    /**
     * 获取消息序列号
     */
    public GetSequence(): number {
        return this._sequence++;
    }

    /**
     * 添加回调函数并返回id
     * @param func 回调函数
     */
    public AddCallBack(target: object, func: Function): number {
        this.callbackQueue.push(func);
        this.callbackTargetQueue.push(target);
        return this.callbackQueue.length - 1;
    }
    /**
     * 通过序列号获取消息类型
     */
    public async GetResponce(sequence: number): Promise<SimCivil.Rpc.RpcResponse> {
        await new Promise<void>((resolve, reject) => {
            this.promiseQueue[sequence] = resolve;
            setTimeout(() => {
                reject('timeout in ' + this.timeOut + ' seconds.');
            }, this.timeOut * 1000);
        }).catch(() => {
            //TODO:需要更详细的结果（具体是哪个协议超时了）
            Tools.Logger.log("TimeOut", "RPC");
        });
        let ret = this.resultQueue[sequence];
        this.resultQueue[sequence] = null;
        return ret;
    }
    /**
     * 发送rpc消息给服务器
     * @param sequence 序列号
     * @param serviceName 服务名
     * @param methodName 方法名
     * @param args 参数
     */
    public SendRpc(sequence: number, serviceName: string, methodName: string, args: any[]): any {
        let json = {
            "$type": "SimCivil.Rpc.RpcRequest, SimCivil.Rpc",
            "ServiceName": serviceName,
            "MethodName": methodName,
            "Arguments": args,
            "Sequence": sequence,
            "TimeStamp": TimeManager.Instance.GetCurrentServerTIme()
        }
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
    }
    //字符串转ArrayBuffer
    private stringToByte(str) {
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
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        var buf = new ArrayBuffer(bytes.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = bytes[i];
        }
        return buf;
    }

    public Disconnect() {
        this._session.Close();
    }
}