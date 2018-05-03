namespace Tools {
    export class JsonConigUtils {
        private constructor() { }

        /**
         * 用于缓存json对象
         */
        private static jsonObjectDict: Array<object> = new Array<object>();

        /**
         * 通过文件路径读取json文件，转成对象后返回
         * 如果获取成功则error为null
         * @param path 文件路径(resources目录下)
         */
        public static ReadJsonObjectByPath(path: string, callBack: (error: Error, object: any) => void) {
            if (JsonConigUtils.jsonObjectDict[path] != undefined && JsonConigUtils.jsonObjectDict[path] != null) {
                callBack(null, JsonConigUtils.jsonObjectDict[path])
                return;
            }
            cc.loader.loadRes(path, cc.TextAsset, (error, res) => {
                JsonConigUtils.jsonObjectDict[path] = res;
                callBack(error, res);
            });
        }

        /**
         * 通过文件名读取json文件，转成对象后返回
         * 如果获取成功则error为null
         * @param name 文件名(json文件需要放在resources/json/目录下)
         */
        public static ReadJsonObjectByName(name: string, callBack: (error: Error, object: any) => void) {
            if (JsonConigUtils.jsonObjectDict[name] != undefined && JsonConigUtils.jsonObjectDict[name] != null) {
                callBack(null, JsonConigUtils.jsonObjectDict[name])
                return;
            }
            cc.loader.loadRes(GloableConstantUtils.JsonPath.concat(name), (error, res) => {
                JsonConigUtils.jsonObjectDict[name] = res;
                callBack(error, res);
            });
        }
    }
}
var JsonConigUtils = Tools.JsonConigUtils;