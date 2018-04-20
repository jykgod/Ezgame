class TimeManager {
    /**
     * 单例模式声明
     */
    private static instance: TimeManager = null;
    private constructor() { }
    public static get Instance(): TimeManager {
        if (this.instance == null) {
            this.instance = new TimeManager();
        }
        return this.instance;
    }

    /**
     * 游戏第一个场景加载完成时到当前帧经过的帧时间
     */
    private _realTimeSinceStartScene: number = 0;
    public get realTimeSinceStartScene(): number {
        return this._realTimeSinceStartScene;
    }

    /**
     * 需要每帧调用的update
     * @param dt 当前帧与上一帧的间隔时间
     */
    public Update(dt: number) {
        this._realTimeSinceStartScene += dt;
    }
}