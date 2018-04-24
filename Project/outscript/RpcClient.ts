/**
 * RPC修饰器
 * 用来修饰客户端发起的RPC调用函数
 */
function RPC(serviceName: string) {
    /**
     * 真正的修饰器函数
     */
    return function (target: object, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            Tools.Logger.log(typeof target);
            Tools.Logger.log(serviceName);
            let _sequence = RpcClient.Instance.GetSequence();
            let result = await RpcClient.Instance.SendRpc(_sequence, serviceName, methodName, args);
            return RpcClient.Instance.GetResponce(_sequence);
        }
    }
}

class RpcClient {
    /**
     * 单例
     */
    private static instance: RpcClient = null;
    public static get Instance(): RpcClient {
        if (this.instance == null) {
            this.instance = new RpcClient();
        }
        return this.instance;
    }
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
        this._session.OnGetMessage = this.GetMessage;
        this._session.OnConnect = callBack;
        this._session.OnError = errorCallBack;
    }
    /**
     * 收取并加工再交给做rpc处理的函数
     * @param event messageEvent
     */
    private GetMessage(event: MessageEvent) {
        console.log(typeof (event.data));
        console.log(event.data);
    }
    /**
     * 获取消息序列号
     */
    public GetSequence(): number {
        return this._sequence++;
    }
    /**
     * 通过序列号获取消息类型
     */
    public GetResponce(sequence: number): any {
        return "something";
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
            "Sequnce": sequence,
            "TimeStamp": new Date().toISOString()
        }
        if (!("TextEncoder" in window)) {
            Tools.Logger.error("Sorry, this browser does not support TextEncoder...", "RPC");
            return;
        }
        Tools.Logger.info(json);
        let enc = new TextEncoder();
        let str = JSON.stringify(json);
        let length = enc.encode(str).length;
        str = "  ".concat(str);
        let arr = enc.encode(str);
        arr.set([length / 256,length % 256], 0);
        console.info(arr);
        this.session.SendMessage(arr.buffer);
    }
}