import MapCeil from "../../struct/MapCeil";
import { GloableUtils } from "../../tools/GloableUtils";
import { GloableConstantUtils } from "../../tools/GloableConstantUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MapCeilUIComponent extends cc.Component {
    @property([cc.Sprite])
    public sprites: Array<cc.Sprite> = [];

    public RestType(x: number, y: number, ceils: Array<Array<MapCeil>>) {
        x = ~~x;
        y = ~~y;
        if (!ceils[x] || !ceils[x][y]) {
            return;
        }
        /**
         * 需要重构一下代码！！！！！！！！！！
         * 1.定义一个大的地块作为component记录整个地块的信息，便于整体的销毁！
         * 2.地块中定义一个MapCeil的二维数组！
         * 3.这段reset的代码应该在MapCeil中执行，因为这应该是个持久化的内容!
         * 4.mapCeil中应该持久化存储atlas的名字以及4个地块对应的id!
         * 5.渲染用的MapCeilUIComponent应该是直接放在map节点下并滚动从对象池中创建或销毁!
         */
        let rx = 0;
        let ry = 0;
        let mask = 0;
        let rType = 0;
        for (let i = 0; i < 8; i++) {
            rx = x + GloableUtils.dx[i];
            ry = y + GloableUtils.dy[i];
            if (ceils[rx] && ceils[rx][ry]) {
            }
        }
    }
}
