import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import InputSystem from "../../ecs/system/InputSystem";
import MapSystem from "../../ecs/system/MapSystem";
import MotionControllerComponent from "../../ecs/component/MotionControllerComponent";
import ViewSyncSystem from "../../ecs/system/ViewSyncSystem";
import MotionControllerSystem from "../../ecs/system/MotionControllerSystem";
import PlayerMotionSyncSystem from "../../ecs/system/PlayerMotionSyncSystem";
import RoleSystem from "../../ecs/system/RoleSystem";

export class GameStateMainNormal implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_MAIN_NORMAL;
    world : ECS.World;
    StateEnter(...args: any[]): void {
        UIManager.Instance.ShowUI(UINameEnum.MAIN_UI);
        this.world = ECS.World.CreateAWorld('simsivil');
        this.world.addSystem(RoleSystem);
        this.world.addSystem(InputSystem);
        this.world.addSystem(MapSystem);
        this.world.addSystem(ViewSyncSystem);
        this.world.addSystem(MotionControllerSystem);
        this.world.addSystem(PlayerMotionSyncSystem);

        
    }

    StateUpdate(currentStateTime: number): void{
    }

    StateEnd(currentStateTIme: number): void {
        UIManager.Instance.HideUI(UINameEnum.MAIN_UI);
        ECS.World.RemoveWorld('simsivil');
        this.world = null;
    }
}