
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	
	export enum InteractionType{
		
	}	
	

	
	export class IPlayerController{
		
		
		
        @RPC("SimCivil.Contract.IPlayerController.GetMoveState")
		public async static getMoveState(): { X: number, Y: number, Speed: number }{
            return null;
        }
		
        @RPC("SimCivil.Contract.IPlayerController.Move")
		public async static move(direction: { X: number, Y: number }, speed: number): { X: number, Y: number, Speed: number }{
            return null;
        }
		
        @RPC("SimCivil.Contract.IPlayerController.MovePercentage")
		public async static movePercentage(direction: { X: number, Y: number }, relativeSpeed: number): { X: number, Y: number, Speed: number }{
            return null;
        }
		
        @RPC("SimCivil.Contract.IPlayerController.Stop")
		public async static stop(): void{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IPlayerController.Interaction")
		public async static interaction(target: string, interactionType: InteractionType): void{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IPlayerController.Build")
		public async static build(tileElement: string, position: { X: number, Y: number }): void{
            return void(0);
        }
		
	}
	
}