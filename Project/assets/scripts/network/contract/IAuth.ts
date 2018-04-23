
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	

	
	export class IAuth{
		
		
		
        @RPC("SimCivil.Contract.IAuth.LogIn")
		public async static logIn(username: string, password: string): boolean{
            return false;
        }
		
        @RPC("SimCivil.Contract.IAuth.LogOut")
		public async static logOut(): void{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IAuth.GetToken")
		public async static getToken(): string{
            return null;
        }
		
	}
	
}