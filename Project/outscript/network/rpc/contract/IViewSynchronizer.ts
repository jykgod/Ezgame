﻿
module SimCivil.Contract {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    export class AppearanceDto {
        
        // TYPE
        public Type: AppearanceType = null;
        // ID
        public Id: number = 0;
        // PRIMARYCOLOR
        public PrimaryColor: number = 0;
        // SECONDARYCOLOR
        public SecondaryColor: number = 0;
        // QUALITY
        public Quality: number = 0;
        // MATERIAL
        public Material: Material = null;
		

    }
    export class ViewChange {
        
        // TICKCOUNT
        public TickCount: number = 0;
        // TILECHANGE
        public TileChange: TileDto[] = [];
        // ENTITYCHANGE
        public EntityChange: EntityDto[] = [];
        // EVENTS
        public Events: ViewEvent[] = [];
        // POSITION
        public Position: { X: number, Y: number } = null;
        // ATLASINDEX
        public AtlasIndex: { X: number, Y: number } = null;
        // SPEED
        public Speed: number = 0;
		
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
        // HP
        public Hp: number = 0;
		
		public ToString(): string{
			return null;
		}
		

    }
    export class TileDto {
        
        // POSITION
        public Position: { X: number, Y: number } = null;
        // TERRAIN
        public Terrain: number = 0;
        // HEIGHT
        public Height: number = 0;
		

    }

	
	export enum Material{
		
		none,
		
		wood,
		
	}	
	
	export enum AppearanceType{
		
		block,
		
		body,
		
		hair,
		
		helmet,
		
		mask,
		
		necklace,
		
		shoulder,
		
		belt,
		
		armor,
		
		backpack,
		
		rightHanded,
		
		leftHanded,
		
		twoHanded,
		
		gloves,
		
		pants,
		
		shoes,
		
	}	
	
	export enum ViewEventType{
		
		entityLeave,
		
	}	
	

	
	export class IViewSynchronizer{
		
		
		public publicAPI: ;
		
		
        @RPC("SimCivil.Contract.IViewSynchronizer", true)
		public static async RegisterViewSync(callback: Action<ViewChange>): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IViewSynchronizer", true)
		public static async DeregisterViewSync(): Promise<void>{
            return void(0);
        }
		
        @RPC("SimCivil.Contract.IViewSynchronizer", false)
		public static async GetAtlas(index: { X: number, Y: number }): Promise<TileDto[]>{
            return [];
        }
		
        @RPC("SimCivil.Contract.IViewSynchronizer", false)
		public static async GetAtlasTimeStamp(index: { X: number, Y: number }): Promise<Date>{
            return new Date(0);
        }
		
        @RPC("SimCivil.Contract.IViewSynchronizer", false)
		public static async GetAppearance(entity: string): Promise<AppearanceDto[]>{
            return [];
        }
		
	}
	
}