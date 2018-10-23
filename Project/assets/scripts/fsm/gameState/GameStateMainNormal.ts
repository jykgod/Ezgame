import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";

export class GameStateMainNormal implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_MAIN_NORMAL;
    StateEnter(...args: any[]): void {
        UIManager.Instance.ShowUI(UINameEnum.MAIN_UI);
        cc.loader.loadRes(GloableConstantUtils.TestPrefabPath.concat("TestPlayer"), (error, res) => {
            let node = cc.instantiate<cc.Node>(res);
            node.setParent(cc.Canvas.instance.node);
            Logger.log("nihaoa", "GameStateMainNormal");
        });
    }

    StateEnd(currentStateTIme: number): void {
        UIManager.Instance.HideUI(UINameEnum.MAIN_UI);
    }
}