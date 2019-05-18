import { GameStateEnum } from "../../enum/StateEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import MapSystem from "../../ecs/system/MapSystem";
import ViewSyncSystem from "../../ecs/system/ViewSyncSystem";
import MotionControllerSystem from "../../ecs/system/MotionControllerSystem";
import PlayerMotionSyncSystem from "../../ecs/system/PlayerMotionSyncSystem";
import CameraSystem from "../../ecs/system/CameraSystem";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";

export class GameStateMainNormal implements FSM.IState {
    stateType = GameStateEnum.GAME_STATE_MAIN_NORMAL;
    // world : ECS.World;
    StateEnter(...args: any[]): void {
        UIManager.Instance.ShowUI(UINameEnum.MAIN_UI);
        //添加地图系统
        ECS.World.active.addSystem(MapSystem);
        //添加相机系统
        ECS.World.active.addSystem(CameraSystem);
        //添加视野同步系统
        ECS.World.active.addSystem(ViewSyncSystem);
        //添加移动控制系统
        ECS.World.active.addSystem(MotionControllerSystem);
        //添加玩家移动同步系统
        ECS.World.active.addSystem(PlayerMotionSyncSystem);
        //创建player
        ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("Player"), (error, res) => {
            if (error) {
                Logger.log(error.message);
                return;
            }
            let node: cc.Node = cc.instantiate<cc.Node>(res);
            node.setParent(cc.Canvas.instance.node);
        });
    }

    StateUpdate(currentStateTime: number): void{
    }

    StateEnd(currentStateTIme: number): void {
        ECS.World.active.removeSystem(PlayerMotionSyncSystem);
        ECS.World.active.removeSystem(MotionControllerSystem);
        ECS.World.active.removeSystem(ViewSyncSystem);
        ECS.World.active.removeSystem(CameraSystem);
        ECS.World.active.removeSystem(MapSystem);
        UIManager.Instance.HideUI(UINameEnum.MAIN_UI);
        // ECS.World.RemoveWorld('simsivil');
        // this.world = null;
    }
}