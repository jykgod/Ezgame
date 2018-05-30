namespace Tools {
    /**
     * 用于从本地读写数据
     */
    export class LocalStorageUtils {
        public static setNumber(key: string, value: number) {
            cc.sys.localStorage.setItem(key, value.toString());
        }

        public static setString(key: string, value: string) {
            cc.sys.localStorage.setItem(key, value);
        }

        public static setObject(key: string, value: object) {
            cc.sys.localStorage.setItem(key, JSON.stringify(value));
        }

        public static getNumber(key: string): number {
            let ret: string = cc.sys.localStorage.getItem(key);
            return +ret;
        }

        public static getString(key: string): string {
            return cc.sys.localStorage.getItem(key);
        }

        public static getObject(key: string): object {
            return JSON.parse(cc.sys.localStorage.getItem(key))
        }

        public static loadStorageObject<T extends LocalStorageBase>(key: string): T{
            return <T>LocalStorageUtils.getObject(key);
        }
        // public static loadStorageObject<T extends LocalStorageBase>(): T{
        //     return <T>LocalStorageUtils.getObject();
        // }

        public static saveStorageObject(obj : LocalStorageBase){
            obj.Save();
        }
    }
}

var LocalStorageUtils = Tools.LocalStorageUtils;