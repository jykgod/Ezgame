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
    private _type: number = -1;
    public get type(): number {
        return this._type;
    }
    /**
     * 图集名
     * 并非构造后立即能够访问
     * 如果图集配置在构造前已经被加载过了，则该参数在构造后能够直接访问，否则会延迟到图集配置完成加载之后。
     */
    private _atlas: string = null;
    public get Atlas(): string {
        return this._atlas;
    }
    /**
     * 周围8个地块的地形
     */
    private mask: number;
    /**
     * 对应4个节点的mask（toString过后直接对应于图块在atlas中的名字）
     */
    private _mask: number[];
    public get Mask(): number[]{
        return this._mask;
    }

    public constructor() {
    }

    /**
     * 更新函数
     * 需要知道地块的类型以及周围8个地块的类型
     * @param type 自己的地形
     * @param roundsType 周围8个地块的类型
     * @returns 是否发生了改变
     */
    public Reset(type: number, roundsType: Array<number>): boolean {
        this._mask = [0, 0, 0, 0];
        let mask = 0;
        let roundType = type;
        for (let i = 0; i < roundsType.length; i++) {
            if (roundsType[i] == type) {
                mask = 1 + (mask << 1);
            } else {
                mask = mask << 1;
                roundType = roundsType[i];
            }
        }
        if (this._type == type && this.mask == mask) {
            return false;
        }
        this._type = type;
        this.mask = mask;

        this._mask[0] = 0b00001011 + (mask & (1 << 7)) + (mask & (1 << 6)) + ((mask & (1 << 6)) >> 1) + (mask & (1 << 4)) + ((mask & (1 << 4)) >> 2);
        this._mask[1] = 0b00010110 + ((mask & (1 << 6)) << 1) + (mask & (1 << 6)) + (mask & (1 << 5)) + (mask & (1 << 3)) + ((mask & (1 << 3)) >> 3);
        this._mask[2] = 0b01101000 + ((mask & (1 << 4)) << 3) + (mask & (1 << 4)) + (mask & (1 << 2)) + (mask & (1 << 1)) + ((mask & (1 << 1)) >> 1);
        this._mask[3] = 0b11010000 + ((mask & (1 << 3)) << 2) + (mask & (1 << 3)) + ((mask & (1 << 1)) << 1) + (mask & (1 << 1)) + (mask & (1 << 0));

        if (roundType < type) {
            for (let i = 0; i < 4; i++) {
                this._mask[i] = this._mask[i] ^ 0b11111111;
            }
        }
        // Logger.info(type);
        // Logger.info(roundsType);
        // Logger.info(this.mask);
        // Logger.info(this._mask);

        JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum.Map_Atlas_Name, (error, res) => {
            let conf = res[type.toString()];
            for (let i = 0; i < conf.length; i++) {
                if (conf[i].other_type == roundType) {
                    this._atlas = conf[i].atlas;
                    return;
                }
            }
            this._atlas = conf[0].atlas;
        });
        return true;
    }
}