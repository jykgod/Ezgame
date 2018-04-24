
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    export class ViewChange {
        
        // TICKCOUNT
        public TickCount: number = 0;
        // TILECHANGE
        public TileChange: TileDto[] = [];
        // ENTITYCHANGE
        public EntityChange: EntityDto[] = [];
        // EVENTS
        public Events: ViewEvent[] = [];
		
		public ToString(): string{
			return null;
		}
		

    }
    export class ViewEvent {
        
        // EVENTTYPE
        public EventType: ViewEventType = null;
        // TARGETENTITYID
        public TargetEntityId: string = "00000000-0000-0000-0000-000000000000";
		
		public ToString(): string{
			return null;
		}
		

    }
    export class EntityDto {
        
        // ID
        public Id: string = "00000000-0000-0000-0000-000000000000";
        // NAME
        public Name: string = null;
        // POS
        public Pos: { X: number, Y: number } = null;
		
		public ToString(): string{
			return null;
		}
		

    }
    export class TileDto {
        
        // POSITION
        public Position: { X: number, Y: number } = null;
        // SURFACE
        public Surface: string = null;
		

    }

	
	export enum ViewEventType{
		
		entityLeave,
		
	}	
	

	
	export class IViewSynchronizer{
		
		
		
        @RPC("SimCivil.Contract.IViewSynchronizer", true)
		public static async RegisterViewSync(callback: Action<ViewChange>): Promise<void>{
            return void(0);
        }
		
	}
	
}