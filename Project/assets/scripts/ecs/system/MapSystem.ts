import MapDataComponent from "../sharedComponent/MapDataComponent";
import MapCeil from "../../struct/MapCeil";

export default class MapSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(MapDataComponent);
    }

    public OnDestroy(): void {
        ECS.World.active.EntitisManager.removeSharedComponent(MapDataComponent);
    }

    protected OnUpdate(): void {
        let serverData = MapDataComponent.instance.ceilsFromServer;
        if (serverData.length > 0) {
            for (let i = 0; i < serverData.length; i++) {
                if(!MapDataComponent.instance.ceils[serverData[i].Position.Item1]){
                    MapDataComponent.instance.ceils[serverData[i].Position.Item1] = [];
                    MapDataComponent.instance.ceils[serverData[i].Position.Item1][serverData[i].Position.Item2] = new MapCeil(serverData[i].Terrain, 0);
                }
            }
            serverData = new Array<SimCivil.Contract.TileDto>();
        }
    }
}
