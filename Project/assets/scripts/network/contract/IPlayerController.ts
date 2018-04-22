
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

	
	export enum InteractionType{
		
	}	
	

	
	export interface IPlayerController{
		
		
		
		getMoveState(): { X: number, Y: number, Speed: number };
		
		move(direction: { X: number, Y: number }, speed: number): { X: number, Y: number, Speed: number };
		
		movePercentage(direction: { X: number, Y: number }, relativeSpeed: number): { X: number, Y: number, Speed: number };
		
		stop(): void;
		
		interaction(target: string, interactionType: InteractionType): void;
		
		build(tileElement: string, position: { X: number, Y: number }): void;
		
	}
	
}