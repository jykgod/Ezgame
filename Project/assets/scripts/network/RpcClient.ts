/**
 * RPC修饰器
 * 用来修饰客户端发起的RPC调用函数
 */
export function RPC() {
    /**
     * 真正的修饰器函数
     */
    return function (target: object, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            let rpcClient = new RpcClient("localhost:20170");
            let _sequence = rpcClient.GetSequence();
            let result = await rpcClient.SendRpc("hello");
            return rpcClient.GetResponce(_sequence);
        }
    }
}

export class RpcClient {
    /**
     * 与rpc服务器建立的会话
     */
    private _session: NetWork.SeverSession;
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
     * rpc客户端构造函数，用来构造一个与服务器进行RPC同行的类
     * @param url 服务器地址
     */
    constructor(url: string) {
        this._session = new NetWork.SeverSession("RPC", url);
        this._session.OnGetMessage = this.GetMessage;
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
    public GetSequence(): number{
        return this._sequence ++;
    }
    /**
     * 通过序列号获取消息类型
     */
    public GetResponce(sequence: number): any{
        return "something";
    }
    /**
     * 发送rpc消息给服务器
     * @param json 由装饰器处理过后的一个json串
     */
    public SendRpc(json: string): any {
        return new Promise<void>((resolve) => { setTimeout(() => resolve(), 2000) });
    }
}