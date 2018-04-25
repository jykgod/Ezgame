namespace NetWork {
    export class SeverSession {
        /**
         * websocket对象
         */
        private ws: WebSocket;
        /**
         * 会话状态
         */
        private sesionState: SessionState = SessionState.DISCONNECTED;
        /**
         * 服务器名字
         */
        private name: string;
        /**
         * 构造函数
         * @param name 服务器会话名字
         * @param url 服务器url,需要使用'ws'或者'wss'开头
         */
        public constructor(name: string, url: string) {
            if (name == null || name == undefined) {
                Tools.Logger.error("session name can't be null or undefined");
                return;
            }
            let self = this;
            this.ws = new WebSocket("ws://" + url);
            this.name = name;
            this.sesionState = SessionState.CONNECTING;
            this.ws.onopen = function (event: Event) {
                Tools.Logger.log("connect", self.name);
                self.sesionState = SessionState.CONNECTED;
                if (self.OnConnect != undefined) {
                    self.OnConnect(event);
                }
            }
            this.ws.onclose = function (event: CloseEvent) {
                Tools.Logger.log("disconnect", self.name);
                self.sesionState = SessionState.DISCONNECTED;
                if (self.OnDisConnect != undefined) {
                    self.OnDisConnect(event);
                }
            }
            this.ws.onmessage = function (event: MessageEvent) {
                Tools.Logger.log("getmessage:" + event.data, self.name);
                if (self.OnGetMessage != undefined) {
                    self.OnGetMessage(event);
                }
            }
            this.ws.onerror = function (event: ErrorEvent) {
                Tools.Logger.error("error:" + event.error, self.name);
                if (self.OnError != undefined) {
                    self.OnError(event);
                }
            }
        }
        /**
         * 服务器链接成功时回调
         */
        public OnConnect?: (event: Event) => void;
        /**
         * 服务器关闭链接过后回调
         */
        public OnDisConnect?: (event: CloseEvent) => void;
        /**
         * 服务器收到消息后回调
         */
        public OnGetMessage?: (event: MessageEvent) => void;
        /**
         * 服务器收到消息后回调
         */
        public OnError?: (event: ErrorEvent) => void;
        /**
         * 获取会话状态
         */
        public get state() {
            return this.sesionState;
        }
        /**
         * 判断会话是否处于链接状态
         */
        public get connected(): boolean {
            return this.sesionState == SessionState.CONNECTED;
        }
        /**
         * 主动断开会话
         */
        public Close(code?: number, reason?: string) {
            if (this.sesionState == SessionState.DISCONNECTING || this.sesionState == SessionState.DISCONNECTED) {
                return;
            }
            Logger.log("Try close", this.name);
            this.sesionState = SessionState.DISCONNECTING;
            this.ws.close(code, reason);
        }

        /**
         * 向服务器发送消息
         * @param arrayBuffer 字节数组
         */
        public SendMessage(arrayBuffer: ArrayBuffer) {
            this.ws.send(arrayBuffer);
        }
    }

    export enum SessionState {
        CONNECTED,
        CONNECTING,
        DISCONNECTED,
        DISCONNECTING
    }
}