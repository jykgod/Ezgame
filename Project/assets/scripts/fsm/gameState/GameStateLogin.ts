import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";

export class GameStateLogin implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_LOGIN;
    StateEnter(...args: any[]): void {
        Logger.log("state login", "GameStateLogin");
        UIManager.Instance.ShowUI(UINameEnum.LOGIN_UI);
    }
    
    StateEnd(currentStateTIme: number): void {
        UIManager.Instance.HideUI(UINameEnum.LOGIN_UI);
    }   
}