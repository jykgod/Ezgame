
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	

	
	export class IAuth{
		
		
		
        /** Obsolete*/
        @RPC("SimCivil.Contract.IAuth", false)
		public static async LogIn(username: string, password: string): Promise<boolean>{
            return false;
        }
		
        
        @RPC("SimCivil.Contract.IAuth", false)
		public static async LogInAsync(username: string, password: string): Promise<boolean>{
            return false;
        }
		
        /** Obsolete*/
        @RPC("SimCivil.Contract.IAuth", true)
		public static async LogOut(): Promise<void>{
            return void(0);
        }
		
        
        @RPC("SimCivil.Contract.IAuth", true)
		public static async LogOutAsync(): Promise<void>{
            return void(0);
        }
		
        /** Obsolete*/
        @RPC("SimCivil.Contract.IAuth", false)
		public static async GetToken(): Promise<string>{
            return null;
        }
		
        
        @RPC("SimCivil.Contract.IAuth", false)
		public static async Register(username: string, password: string): Promise<boolean>{
            return false;
        }
		
	}
	
}