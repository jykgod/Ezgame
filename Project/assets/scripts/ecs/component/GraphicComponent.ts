/**
 * 渲染组件
 * 仅控制渲染开关和渲染的次序
 * 不关心渲染内容
 */
export default class GraphicComponent implements ECS.IComponentData {
    /**
     * 用于管理渲染顺序,layer越大则越靠后被渲染
     */
    public layer: number;
    /**
     * 用于管理相同层级之间物体的渲染顺序,zOrder越大则越靠后被渲染
     */
    public zOrder: number;
    /**
     * 渲染预制名字
     */
    public prefabName: string;
    /**
     * 渲染已存在的对象节点
     * 每个渲染对象在渲染时如果存在缓存对象则用缓存对象来渲染，否则根据预制名从对象池取一个新的对象并渲染.
     */
    public objectID: cc.Node;
    /**
     * 物体是否被渲染
     */
    public enable: boolean;
}