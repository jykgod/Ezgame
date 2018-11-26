export default class ViewChangeData implements ECS.ISharedComponentData{
    public static instance: ViewChangeData;
    public data: SimCivil.Contract.ViewChange;
    /**
     * 用于判断是否已经获得了数据
     */
    public gotData: boolean;
}