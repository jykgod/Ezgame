﻿
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	

	
	export class IPlayerController{
		
		
		public publicAPI: ;
		
		
        @RPC("SimCivil.Contract.IPlayerController", true)
		public static async Move(direction: { X: number, Y: number }, speed: number): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IPlayerController", true)
		public static async Stop(): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IPlayerController", true)
		public static async MoveTo(position: { X: number, Y: number }, timestamp: Date): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IPlayerController", false)
		public static async Inspect(entityId: string): Promise<InspectionResult>{
            return null;
        }
		
	}
	
}