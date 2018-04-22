
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    export class ViewChange {
        
        // TICKCOUNT
        public tickCount: number = 0;
        // TILECHANGE
        public tileChange: TileDto[] = [];
        // ENTITYCHANGE
        public entityChange: EntityDto[] = [];
        // EVENTS
        public events: ViewEvent[] = [];
		
		public toString(): string{
			return null;
		}
		

    }
    export class ViewEvent {
        
        // EVENTTYPE
        public eventType: ViewEventType = null;
        // TARGETENTITYID
        public targetEntityId: string = "00000000-0000-0000-0000-000000000000";
		
		public toString(): string{
			return null;
		}
		

    }
    export class EntityDto {
        
        // ID
        public id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public name: string = null;
        // POS
        public pos: { X: number, Y: number } = null;
		
		public toString(): string{
			return null;
		}
		

    }
    export class TileDto {
        
        // POSITION
        public position: { X: number, Y: number } = null;
        // SURFACE
        public surface: string = null;
		

    }

	
	export enum ViewEventType{
		
		entityLeave,
		
	}	
	

	
	export interface IViewSynchronizer{
		
		
		
		registerViewSync(callback: void): void;
		
	}
	
}