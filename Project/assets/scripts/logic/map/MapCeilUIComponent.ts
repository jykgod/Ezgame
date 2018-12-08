import { GloableUtils } from "../../tools/GloableUtils";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import MapCeilComponent from "../../ecs/component/MapCeilComponent";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { EcsUtility } from "../../ecs/utility/EcsUtility";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapCeilUIComponent extends cc.Component {
    @property([cc.Sprite])
    public sprites: Array<cc.Sprite> = [];

    public mapCeil: MapCeilComponent;

    onLoad() {
        this.node.active = false;
    }

    update(dt) {
        if (this.mapCeil.uiDirty) {
            let atlas = this.mapCeil.ceil.Atlas;
            this.node.position = this.mapCeil.pos.mul(EcsUtility.LogicToUIRatio);
            if (atlas != null) {
                this.mapCeil.uiDirty = false;
                ResourcesManager.Instance.loadAtlas(atlas, (error, a) => {
                    if (error != null) {
                        Logger.error(error, "MapCeilUIComponent");
                        return;
                    }
                    let masks = this.mapCeil.ceil.Mask;
                    for (let i = 0; i < masks.length; i++) {
                        this.sprites[i].spriteFrame = a.getSpriteFrame(GloableUtils.GetMaskString(masks[i]));
                    }
                });
            }
        }
    }
}
