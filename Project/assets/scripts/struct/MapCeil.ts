import { MapCeilTypeEnum } from "../enum/MapCeilTypEnum";
import { JsonConigUtils } from "../tools/JsonConfigUtils";
import { JsonConfigNameEnum } from "../enum/JsonConfigNameEnum";

/**
 * 对应服务器上面一个1*1的地块
 * 在客户端这个地块使用4个地块纹理表示
 */
export default class MapCeil {
    /**
     * 地图的类型
     * grass
     */
    private _type: number;
    public get type(): number {
        return this._type;
    }

    private _atlas: string;

    private _mask: number;


    /**
     * 构造函数
     * 需要知道地块的类型以及周围8个地块的类型
     * @param type 
     * @param roundsType 
     */
    public constructor(type: number, roundsType: Array<number>) {
        this.Reset(type, roundsType);
    }

    public Reset(type: number, roundsType: Array<number>) {
        this._type = type;
        this._mask = 0;
        let roundType = type;
        for (let i = 0; i < roundsType.length; i++) {
            if (roundsType[i] == type) {
                this._mask = 1 + (this._mask << 1);
            } else {
                roundType = roundsType[i];
            }
        }
        if (roundType > type) {
            this._mask = this._mask ^ 0b11111111;
        }

        JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum.Map_Atlas_Name, (error, res) => {
            let conf = res[type.toString()];
            for (let i = 0; i < conf.length; i++) {
                if(conf[i].other_type == roundType){
                    this._atlas = conf[i].atlas;
                    return;
                }
            }
            this._atlas = conf[0].atlas;
        });
    }
}