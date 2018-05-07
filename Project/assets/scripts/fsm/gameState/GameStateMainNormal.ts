import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";

export class GameStateMainNormal implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_MAIN_NORMAL;
    StateEnter(...args: any[]): void {
        UIManager.Instance.ShowUI(UINameEnum.MAIN_UI);
    }
    
    StateEnd(currentStateTIme: number): void {
        UIManager.Instance.HideUI(UINameEnum.MAIN_UI);
    }   
}