
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    export class ViewChange {
        public $type = "SimCivil.Contract.ViewChange, SimCivil.Contract"
        
        // TICKCOUNT
        public TickCount: number = 0;
        // TILECHANGE
        public TileChange: TileDto[] = [];
        // ENTITYCHANGE
        public EntityChange: EntityDto[] = [];
        // EVENTS
        public Events: ViewEvent[] = [];
        // POSITION
        public Position: { Item1: number, Item2: number } = null;
        // SPEED
        public Speed: number = 0;
		
		public ToString(): string{
			return null;
		}
		

    }
    export class ViewEvent {
        public $type = "SimCivil.Contract.ViewEvent, SimCivil.Contract"
        
        // EVENTTYPE
        public EventType: ViewEventType = null;
        // TARGETENTITYID
        public TargetEntityId: string = "00000000-0000-0000-0000-000000000000";
		
		public ToString(): string{
			return null;
		}
		

    }
    export class EntityDto {
        public $type = "SimCivil.Contract.EntityDto, SimCivil.Contract"
        
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
        public $type = "SimCivil.Contract.TileDto, SimCivil.Contract"
        
        // { X: number, Y: number } System
        public Position: { X: number, Y: number } = null;
        // number System
        public Terrain: number = 0;
		

    }

	
	export enum ViewEventType{
		
		entityLeave,
		
	}	
	

	
	export class IViewSynchronizer{
		
		
		
        @RPC("SimCivil.Contract.IViewSynchronizer", true)
		public static async RegisterViewSync(callback: (viewChange:ViewChange)=>void): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IViewSynchronizer", true)
		public static async DeregisterViewSync(): Promise<void>{
            return void(0);
        }

        @RPC("SimCivil.Contract.IViewSynchronizer", false)
		public static async GetAtlas(index: ValueTupleInt32): Promise<TileDto[]>{
            return [];
        }
		
	}
	
}