import MapDataComponent from "../sharedComponent/MapDataComponent";

export default class MapSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(MapDataComponent);
    }

    public OnDestroy(): void {
        ECS.World.active.EntitisManager.removeSharedComponent(MapDataComponent);
    }

    protected OnUpdate(): void {
    }
}
