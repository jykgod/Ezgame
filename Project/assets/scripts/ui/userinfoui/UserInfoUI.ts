import UIBase from "../UIBase";
import PlayerAssetsData from "../../ecs/sharedComponent/PlayerAssetsData";
import AttriDispComponentUI from "./AttriDispComponentUI";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import { AbilityIndex } from "../../enum/AbilityIndex";
import { EffectIndex } from "../../enum/EffectIndex";
import { BodyPartIndex } from "../../enum/BodyPartIndex";

const { ccclass, property } = cc._decorator;

@ccclass
export class UserInfoUI extends UIBase {
    private abilityComponents: AttriDispComponentUI[] = new Array<AttriDispComponentUI>();
    private effectComponents: AttriDispComponentUI[] = new Array<AttriDispComponentUI>();
    private bodyPartComponents: AttriDispComponentUI[] = new Array<AttriDispComponentUI>();

    @property(cc.Node)
    public AbilityCompNode: cc.Node;
    @property(cc.Node)
    public EffectCompNode: cc.Node;
    @property(cc.Node)
    public BodyPartNode: cc.Node;

    public show() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleIn(this.node);
        if (PlayerAssetsData.instance.npcAssets && PlayerAssetsData.instance.npcAssets.inspect) {
            let inspect = PlayerAssetsData.instance.npcAssets.inspect;
            ResourcesManager.Instance.loadRes(GloableConstantUtils.UIPrefabPath + "AttriDispComponentUI", (error, res) => {
                if (inspect.Values["Abilities"] != null && inspect.Values["Abilities"] != undefined) {
                    for (let i = 0; i < inspect.Values["Abilities"].$values.length; i++) {
                        if(this.abilityComponents.length <= i){
                            let tNode = cc.instantiate<cc.Node>(res);
                            this.abilityComponents.push(tNode.getComponent(AttriDispComponentUI));
                        }
                        this.abilityComponents[i].node.setParent(this.AbilityCompNode);
                        this.abilityComponents[i].SetValue(AbilityIndex[i], inspect.Values["Abilities"].$values[i].Value.toString());
                    }
                }

                if (inspect.Values["Effects"] != null && inspect.Values["Effects"] != undefined) {
                    for (let i = 0; i < inspect.Values["Effects"].$values.length; i++) {
                        if(this.effectComponents.length <= i){
                            let tNode = cc.instantiate<cc.Node>(res);
                            this.effectComponents.push(tNode.getComponent(AttriDispComponentUI));
                        }
                        this.effectComponents[i].node.setParent(this.EffectCompNode);
                        this.effectComponents[i].SetValue(EffectIndex[i], inspect.Values["Effects"].$values[i].Value.toString());
                    }
                }

                if (inspect.Values["BodyParts"] != null && inspect.Values["BodyParts"] != undefined) {
                    for (let i = 0; i < inspect.Values["BodyParts"].$values.length; i++) {
                        if(this.bodyPartComponents.length <= i){
                            let tNode = cc.instantiate<cc.Node>(res);
                            this.bodyPartComponents.push(tNode.getComponent(AttriDispComponentUI));
                        }
                        this.bodyPartComponents[i].node.setParent(this.BodyPartNode);
                        this.bodyPartComponents[i].SetValue(BodyPartIndex[i], inspect.Values["BodyParts"].$values[i].Hp.toString() + "(" + inspect.Values["BodyParts"].$values[i].MaxHp.toString() + ")");
                    }
                }
            });
        }
    }

    public hide() {
        //throw new Error("Method not implemented.");
        UIAnimationUtils.ScaleOut(this.node);
    }
}
