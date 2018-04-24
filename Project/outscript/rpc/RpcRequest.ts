module SimCivil.Rpc {
    export class RpcResponse{
        public ReturnValue?: object;
        public Sequence?: number;
        public ErrorInfo?: string;
        public TimeStamp?: Date;
    }
}