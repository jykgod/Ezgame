namespace Magic.Core {
    export class Slot {
        public Types: GenerateDataType[];
        public Data: IGenerateData;

        public SelfModule: ModuleBase;
        public LinkedSlots: Slot[];
        public static GetDataDes(dataType: GenerateDataType): string {
            return "";
        }
    }
}