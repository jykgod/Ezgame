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
}