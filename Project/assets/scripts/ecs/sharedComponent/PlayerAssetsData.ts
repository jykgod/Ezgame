export default class PlayerAssetsData implements ECS.ISharedComponentData{
    public static instance: PlayerAssetsData;

    public Roles: SimCivil.Contract.RoleSummary[];
    public Role: SimCivil.Contract.RoleSummary;
}