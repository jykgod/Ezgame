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
        GameLauncher.instance = this;
        cc.game.addPersistRootNode(this.node);
        TimeManager.Instance.Init();
        LocalizationManager.Instance.Init("cn");
        UIManager.Instance.Init();
        GameManager.Instance.Init();
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