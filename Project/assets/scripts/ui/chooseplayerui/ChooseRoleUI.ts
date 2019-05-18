import UIBase from "../UIBase";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { ChooseRoleUIComponent } from "./ChooseRoleUIComponent";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";
import { GameManager } from "../../manager/GameManager";
import { GameStateEnum } from "../../enum/StateEnum";
import { SceneEnum } from "../../enum/SceneEnum";
import { EventEnum } from "../../enum/EventEnum";
import PlayerAssetsData from "../../ecs/sharedComponent/PlayerAssetsData";
import GameLauncher from "../../logic/GameLauncher";

const { ccclass, property } = cc._decorator;
//角色选择界面
@ccclass
export class ChooseRoleUI extends UIBase {
    components: ChooseRoleUIComponent[] = new Array<ChooseRoleUIComponent>();
    @property(cc.Node)
    RolesComponentsNode: cc.Node;

    public show(): void {
        UIAnimationUtils.ScaleIn(this.node);
    }

    public Refresh(rolesData: SimCivil.Contract.RoleSummary[]): void {
        this.clear();
        if (rolesData == null || rolesData == undefined) return;
        ResourcesManager.Instance.loadRes(GloableConstantUtils.UIPrefabPath + "ChooseRoleUIComponent", (error, res) => {
            if (error) {
                Logger.error(error, "ChooseRoleUI");
                return;
            }
            for (let i = 0; i < rolesData.length; i++) {
                let tNode = cc.instantiate<cc.Node>(res);
                this.components.push(tNode.getComponent(ChooseRoleUIComponent));
                this.components[i].node.setParent(this.RolesComponentsNode);
                this.components[i].SetData(rolesData[i]);
            }
            PlayerAssetsData.instance.Role = rolesData[0];
            GameLauncher.Instance.node.emit(EventEnum.ChooseRole, rolesData[0]);
        });
    }

    private clear(): void {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].destroy();
        }
        this.components = new Array<ChooseRoleUIComponent>();
    }

    public CreateRole(): void {
        UIManager.Instance.ShowUI(UINameEnum.POP_UP_CREATE_ROLE_UI);
    }

    public ChooseRole(): void {
        // UIManager.Instance.DestroyAll();
        // UIManager.Instance.HideUI(UINameEnum.CHOOSE_ROLE_UI);
        //打开pendingUI
        (async () => {
            let use_role = await SimCivil.Contract.IRoleManager.UseRole(PlayerAssetsData.instance.Role.Id);
            if (use_role == true) {
                UIManager.Instance.HideUI(UINameEnum.CHOOSE_ROLE_UI);
                GameManager.Instance.stateMachine.ChangeState(GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum.MAIN, GameStateEnum.GAME_STATE_MAIN_NORMAL);
            }
        })();
    }

    public hide(): void {
        UIAnimationUtils.ScaleOut(this.node);
    }
}