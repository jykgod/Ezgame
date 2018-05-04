import GameLauncher from "../logic/GameLauncher";
import { EventEnum } from "../enum/EventEnum";
import { JsonConfigNameEnum } from "../enum/JsonConfigNameEnum";

/**
 * 本地化文本管理类
 */
export class LocalizationManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new LocalizationManager();
    private constructor() { }
    /**
     * 是否完成初始化
     */
    private inited = false;
    /**
     * 语言代码
     */
    private languageCode: string;
    /**
     * 本地化字典json对象 
     */
    private localizationDictionary: object;
    /**
     * 通过语言代码进行初始化(刷新)本地化文本版本
     * @param languageCode 语言代码,ex:en,cn;和语言本地化配置表的名字相同
     */
    public Init(languageCode: string) {
        if (languageCode == JsonConfigNameEnum.Language_CN) {
            this.languageCode = JsonConfigNameEnum.Language_CN;
        } else {
            this.languageCode = JsonConfigNameEnum.Language_EN;
        }
        this.inited = false;
        JsonConigUtils.ReadJsonObjectByName(this.languageCode, (error, object) => {
            if (error == null) {
                this.localizationDictionary = object;
                this.inited = true;
                GameLauncher.Instance.node.emit(EventEnum.RefreshLocalizationText);
            }
        });
    }
    /**
     * 通过key获取本地化文本内容
     * @param key 
     */
    public GetLocalizationTextByKey(key: string): string {
        if (this.inited == false) {
            return "...";
        }
        return this.localizationDictionary[key];
    }

    /**
     * 通过key获取本地化带参数文本内容
     * 带参形式参考c#的形式,即{k}表示第k个参数
     * @param key 键值
     * @param args 参数数组
     */
    public GetLocalizationTextByKeyWithParams(key: string, ...args : string[]): string {
        if (this.inited == false) {
            return "...";
        }
        let ret: string = this.localizationDictionary[key];
        if (args != undefined) {
            for (let i = 0; i < args.length; i++) {
                ret = ret.replace(`{${i}}`, args[i]);
            }
        }
        return ret;
    }
}