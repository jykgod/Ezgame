import { GameManager } from "../manager/GameManager";
import { UIManager } from "../manager/UIManager";
import { LocalizationManager } from "../manager/LocalizationManager";

const { ccclass, property } = cc._decorator;

/**
 * 启动器
 * 负责初始化、更新、销毁各个manager
 */
@ccclass
export default class GameLauncher extends cc.Component {
    /**
     * 单例
     */
    private static instance: GameLauncher = null;
    public static get Instance(): GameLauncher {
        return this.instance;
    }

    onLoad() {
        //---------------------test----------------------
        // cc.sys.localStorage.clear();
        //-----------------------------------------------
        GameLauncher.instance = this;
        cc.game.addPersistRootNode(this.node);
        TimeManager.Instance.Init();
        LocalizationManager.Instance.Init("cn");
        UIManager.Instance.Init();
        GameManager.Instance.Init();

        // let node1 = new cc.Node();
        // node1.name = "nihao"
        // node1.parent = UIManager.Instance.Canvas.node;

        // let node2 = new cc.Node();
        // node2.name = "baba"
        // node2.parent = node1;

        // let node3 = new cc.Node();
        // node3.name = "erzi"
        // node3.parent = node2;
        // Logger.log(cc.(node3, node1));
        // let a = LocalStorageUtils.loadStorageObject<A>("A");
        // Logger.info(a);
    }

    update(dt) {
        TimeManager.Instance.Update(dt);
        GameManager.Instance.Update(dt);
    }

    onDestroy() {
    }

    private setScreenFit() {

    }
}