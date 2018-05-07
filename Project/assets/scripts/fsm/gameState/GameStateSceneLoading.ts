import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import GameLauncher from "../../logic/GameLauncher";
import { EventEnum } from "../../enum/EventEnum";
import { GameManager } from "../../manager/GameManager";
/**
 * 游戏场景切换时的状态
 * 状态开始时打开loadingUI，结束时关闭loadingUI
 */
export class GameStateSceneLoading implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_SCENE_LOADING;
    StateEnter(sceneName: string, gameStateAfterLoadScene: number | string, ...args): void {
        UIManager.Instance.ShowUI(UINameEnum.LOADING_UI);
        cc.director.loadScene(sceneName, () => {
            //UIManager.Instance.DestroyAll();//destroy过后label依然显示？不知道是不是个bug？？？
            GameManager.Instance.stateMachine.ChangeState(gameStateAfterLoadScene, ...args);
        });
    }

    StateUpdate(currentStateTime) {
        /**
         * 广播加载进度
         */
        GameLauncher.Instance.node.emit(EventEnum.GameSceneLoadingProgress, currentStateTime);
    }

    StateEnd(currentStateTIme: number): void {
        UIManager.Instance.HideUI(UINameEnum.LOADING_UI);
    }
}