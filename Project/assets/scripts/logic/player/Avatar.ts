import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { ResourcesManager } from "../../manager/ResourcesManager";

export default class Avatar {
    private head: cc.Sprite;
    private lEar: cc.Sprite;
    private rEar: cc.Sprite;
    private lEye: cc.Sprite;
    private rEye: cc.Sprite;
    private mouth: cc.Sprite;
    private hair: cc.Sprite;
    private body: cc.Sprite;
    private lHand: cc.Sprite;
    private rHand: cc.Sprite;
    private lLeg: cc.Sprite;
    private rLeg: cc.Sprite;
    /** 
     * 是否已经加载完成
     */
    public loaded: boolean;
    /**
     * 角色形象挂载的节点
     */
    public node: cc.Node;

    public constructor(node: cc.Node) {
        this.node = node;
        this.loaded = false;
    }

    public async load(): Promise<void> {
        let promise = new Promise<void>((resolve, reject) => {
            ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath + "Avatar", (error, res) => {
                if (error) {
                    Logger.error(error, "Avatar");
                    reject();
                    return;
                }
                let avatar = cc.instantiate<cc.Node>(res);
                avatar.setParent(this.node);
                this.loaded = true;
                resolve();
            });
        });
        return promise;
    }
}