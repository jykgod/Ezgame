
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    export class RoleSummary {
        public $type = "SimCivil.Contract.RoleSummary, SimCivil.Contract"
        
        // ID
        public Id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public Name: string = null;
        // GENDER
        public Gender: Gender = null;
        // RACE
        public Race: Race = null;
		
		public ToString(): string{
			return null;
		}
		

    }

	

	
}