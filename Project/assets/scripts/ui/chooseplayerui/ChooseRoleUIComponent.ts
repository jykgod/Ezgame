import Avatar from "../../logic/player/Avatar";
import { EventEnum } from "../../enum/EventEnum";
import PlayerAssetsData from "../../ecs/sharedComponent/PlayerAssetsData";
import GameLauncher from "../../logic/GameLauncher";

const { ccclass, property } = cc._decorator;
//角色选择界面
@ccclass
export class ChooseRoleUIComponent extends cc.Component {
    private role: Avatar = null;
    private roleData: SimCivil.Contract.RoleSummary = null;
    @property(cc.Node)
    public roleNode: cc.Node;
    @property(cc.Label)
    public nameLabel: cc.Label;
    @property(cc.Label)
    public raceLabel: cc.Label;
    @property(cc.Node)
    public choosed: cc.Node;

    async onLoad() {
        GameLauncher.Instance.node.on(EventEnum.ChooseRole, this.onChangeRoleEvent, this);
        this.role = new Avatar(this.roleNode);
        await this.role.load();
        this.refresh();
    }

    public SetData(roleData: SimCivil.Contract.RoleSummary) {
        this.roleData = roleData;
        this.nameLabel.string = "" + roleData.Name;
        this.raceLabel.string = "" + roleData.Race;
        this.refresh();
    }

    public OnClick() {
        if (this.roleData != null && this.roleData != undefined) {
            PlayerAssetsData.instance.Role = this.roleData;
            GameLauncher.Instance.node.emit(EventEnum.ChooseRole, this.roleData);
        }
    }

    public onChangeRoleEvent(role: SimCivil.Contract.RoleSummary){
        if (this.roleData == role) {
            this.choosed.active = true;
        }else{
            this.choosed.active = false;
        }
    }

    onDestroy(){
        GameLauncher.Instance.node.off(EventEnum.ChooseRole, this.OnClick, this);
    }

    private refresh() {
        if (this.roleData != null && this.role != null && this.role.loaded == true) {
            
        }
    }
}