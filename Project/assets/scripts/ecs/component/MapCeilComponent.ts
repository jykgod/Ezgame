import MapCeil from "../../struct/MapCeil";

/**
 * MapCeil
 */
export default class MapCeilComponent implements ECS.IComponentData {
    /**
     * 每个地块的类型和id
     */
    public ceils: Array<Array<MapCeil>> = new Array<Array<MapCeil>>();
}