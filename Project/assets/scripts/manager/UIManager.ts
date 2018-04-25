//UI使用分层次管理的模式
//每个层级的UI在一个独立的LayerNode下面
//相同层级的UI具备互斥的性质（即是说同一个层级的UI同时只能有一个显示在界面中）
class UIManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new UIManager();
    private constructor() { }
    /**
     * 层级节点数组
     */
    private layerNodesArray: Array<cc.Node> = new Array<cc.Node>();
    /**
     * 层级节点对象池
     */
    private layerPool: cc.NodePool = new cc.NodePool("LayerNode");
    /**
     * 初始化
     */
    public Init(): void {
    }
    /**
     * (创建)显示UI,并调用UI的OnShow方法
     */

}