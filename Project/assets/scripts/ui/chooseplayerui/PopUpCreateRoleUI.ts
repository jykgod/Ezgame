import UIBase from "../UIBase";
import { UI2EcsSessionManager } from "../../manager/UI2EcsSessionManager";
import UIProto from "../../struct/UIProto";
import { UIProtoTypeEnum } from "../../enum/UIProtoTypeEnum";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";

const { ccclass, property } = cc._decorator;
/**
 * 角色创建界面
 */
@ccclass
export class PopUpCreateRoleUI extends UIBase {
    private gender: any;
    private race: any;

    @property(cc.EditBox)
    NameEditLabel: cc.EditBox;

    public show(): void {
        // UIAnimationUtils.ScaleIn(this.node);
    }

    public hide(): void{
        UIAnimationUtils.ScaleOut(this.node);
    }

    onLoad(): void {
        this.gender = SimCivil.Contract.Gender.male;
        this.race = SimCivil.Contract.Race.human;
    }

    public SetGender(gender: string): void {
        switch (gender) {
            case "male":
                this.gender = SimCivil.Contract.Gender.male;
                break;
            case "female":
                this.gender = SimCivil.Contract.Gender.female;
                break;
            case "other":
                this.gender = SimCivil.Contract.Gender.other;
                break;
            case "none":
                this.gender = SimCivil.Contract.Gender.none;
                break;
        }
    }

    public SetRace(race: string): void {
        switch (race) {
            case "human":
                this.race = SimCivil.Contract.Race.human;
                break;
        }
    }

    public OnClickSure(): void {
        if (this.NameEditLabel.string == "") return;
        let role = new SimCivil.Contract.CreateRoleOption();
        role.Gender = this.gender;
        role.Race = this.race;
        role.Name = this.NameEditLabel.string;
        Logger.info(role);
        UI2EcsSessionManager.Instance.Send(new UIProto(UIProtoTypeEnum.REQ_CREATE_ROLE, role));
        UIManager.Instance.HideUI(UINameEnum.POP_UP_CREATE_ROLE_UI);
    }
}