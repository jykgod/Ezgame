class TimeManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new TimeManager();
    private constructor() { }
    /**
     * 游戏第一个场景加载完成时到当前帧经过的帧时间
     */
    private _realTimeSinceStartScene: number = 0;
    /**
     * 游戏第一个场景加载完成时到当前帧经过的帧时间
     */
    public get realTimeSinceStartScene(): number {
        return this._realTimeSinceStartScene;
    }
    /**
     * 登录时的服务器时间
     */
    private _loginServerTime: number = 0;
    /**
     * 登录时的客户端时间
     */
    private _loginDateTime: Date = new Date(0);
    /**
     * 初始化函数
     */
    public Init() {
        this._realTimeSinceStartScene = 0;
    }
    /**
     * 需要每帧调用的update
     * @param dt 当前帧与上一帧的间隔时间
     */
    public Update(dt: number) {
        this._realTimeSinceStartScene += dt;
    }
    /**
     * 获取当前本地时间
     */
    public GetDateTime(): Date {
        return new Date();
    }
    /**
     * 存储服务器时间
     * @param loginServerTime 登录时的服务器时间
     */
    public SaveServerTime(loginServerTime: number): void {
        if (this._loginServerTime == 0) {
            this._loginDateTime = new Date();
            this._loginServerTime = loginServerTime;
        }
    }

    /**
     * 获取当前的服务器时间
     */
    public GetCurrentServerTIme(): number {
        return Math.round(new Date() - this._loginDateTime) + this._loginServerTime;
    }
}