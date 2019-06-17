import HealthComponent from "../component/HealthComponent";
import GraphicComponent from "../component/GraphicComponent";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { EcsUtility } from "../utility/EcsUtility";
import PositionComponent from "../component/PositionComponent";
import { UIManager } from "../../manager/UIManager";
import HpUI from "../../ui/userheader/HpUI";

export default class HealthBehaviour extends ECS.ComponentBehaviour {
    @ECS.inject(HealthComponent)
    hpComp: HealthComponent;
    @ECS.inject(GraphicComponent)
    graphicComp: GraphicComponent;

    public OnStart(): void {
        console.log("惊了");
        if (!this.hpComp.hpUI) {
            let tempHpComp = this.hpComp;
            ResourcesManager.Instance.loadRes(GloableConstantUtils.UIPrefabPath + "HpUI", (err, res) => {
                tempHpComp.hpUI = (cc.instantiate(res) as cc.Node).getComponent<HpUI>(HpUI);
                tempHpComp.hpUI.node.setParent(UIManager.Instance.Canvas.node);
            });
        }
    }

    public OnUpdate = function(): void {
        if (this.hpComp.hpUI) {
            if (this.hpComp.dirty) {
                if (this.hpComp.HP >= 0 && this.hpComp.maxHP > 0) {
                    this.hpComp.hpUI.setHp(this.hpComp.HP, this.hpComp.maxHP);
                } else {
                    this.hpComp.hpUI.setHp(1, 1);
                }
            }
            if (this.graphicComp.node) {
                this.hpComp.hpUI.node.position = this.graphicComp.node.position.add(cc.v2(0, 100));
            }
        }
    }
}