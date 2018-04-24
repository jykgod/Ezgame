
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	

	
	export class IAuth{
		
		
		
        @RPC("SimCivil.Contract.IAuth")
		public static async logIn(username: string, password: string): Promise<boolean>{
            return false;
        }
		
        @RPC("SimCivil.Contract.IAuth")
		public static async logOut(): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IAuth")
		public static async getToken(): Promise<string>{
            return null;
        }
		
	}
	
}