import PositionComponent from "../component/PositionComponent";
import NpcComponent from "../component/NpcComponent";
import HealthComponent from "../component/HealthComponent";
import { ResourcesManager } from "../../manager/ResourcesManager";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";
import GraphicComponent from "../component/GraphicComponent";
import { BodyPartIndex } from "../../enum/BodyPartIndex";

export default class NpcBehaviour extends ECS.ComponentBehaviour {
    @ECS.inject(PositionComponent)
    position: PositionComponent;
    @ECS.inject(NpcComponent)
    npc: NpcComponent;
    @ECS.inject(HealthComponent)
    health: HealthComponent;
    public OnStart(): void {
        Logger.log("Create:" + this.npc.npcAssets.roleSummary.Name, "NPC");
        (async () => {
            this.npc.npcAssets.inspect = await SimCivil.Contract.IPlayerController.Inspect(this.npc.npcAssets.guid);
            Logger.info(this.npc.npcAssets.inspect);
        })();

        let graphic = ECS.World.active.EntitisManager.GetComponent(this.Entity, GraphicComponent) as GraphicComponent;
        ResourcesManager.Instance.loadRes(GloableConstantUtils.GamePrefabPath.concat("Player"), (error, res) => {
            if (error) {
                Logger.log(error.message);
                return;
            }
            let node: cc.Node = cc.instantiate<cc.Node>(res);
            node.setParent(cc.Canvas.instance.node);
            graphic.node = node;
        });
    }

    public OnUpdate = function (): void {
    }
}