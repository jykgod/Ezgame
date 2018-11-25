import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { EcsUtility } from "../utility/EcsUtility";

export default class RoleSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        let createRoleOption = new SimCivil.Contract.CreateRoleOption();
        createRoleOption.Gender = SimCivil.Contract.Gender.male;
        createRoleOption.Name = "jyk";
        createRoleOption.Race = SimCivil.Contract.Race.human;
        EcsUtility.GotRole = false;
        (async () => {
            let success = await SimCivil.Contract.IRoleManager.CreateRole(createRoleOption);
            if (success == true) {
                Logger.log("CreateRole success！", "MovementTest");
            } else {
                Logger.log("CreateRole faild", "MovementTest");
            }
            EcsUtility.GotRole = await SimCivil.Contract.IRoleManager.UseRole((await SimCivil.Contract.IRoleManager.GetRoleList())[0].Id);
            if (EcsUtility.GotRole == true) {
                ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("Player"), (error, res)=>{
                    if(error){
                        Logger.log(error.message);
                        return;
                    }
                    let node:cc.Node = cc.instantiate<cc.Node>(res);
                    node.setParent(cc.Canvas.instance.node);
                });
            } else {
                Logger.log("UseRole faild", "MovementTest");
            }
        })();
    }

    public OnDestroy(): void {
        EcsUtility.GotRole = false;
    }

    protected OnUpdate(): void {
    }
}