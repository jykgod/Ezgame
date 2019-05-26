import InputData from "../sharedComponent/InputData";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import { UserInfoUI } from "../../ui/userinfoui/UserInfoUI";

export default class FuncKeySystem extends ECS.ComponentSystem {

    protected OnUpdate = function(): void {
        if(InputData.instance.e == true){
            InputData.instance.e = false;
            let ui = UIManager.Instance.GetUI(UINameEnum.USER_INFO_UI) as UserInfoUI;
            if (ui != undefined && ui != null){
                if (ui.node.active == true){
                    UIManager.Instance.HideUI(UINameEnum.USER_INFO_UI);
                    return;
                }
            }
            UIManager.Instance.ShowUI(UINameEnum.USER_INFO_UI);
        }
    }
}