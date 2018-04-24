
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	

	
	export class IRoleManager{
		
		
		
        @RPC("SimCivil.Contract.IRoleManager")
		public static async CreateRole(option: CreateRoleOption): Promise<boolean>{
            return false;
        }
		
        @RPC("SimCivil.Contract.IRoleManager")
		public static async GetRoleList(): Promise<RoleSummary[]>{
            return [];
        }
		
        @RPC("SimCivil.Contract.IRoleManager")
		public static async UseRole(eid: string): Promise<boolean>{
            return false;
        }
		
        @RPC("SimCivil.Contract.IRoleManager")
		public static async ReleaseRole(): Promise<boolean>{
            return false;
        }
		
	}
	
}