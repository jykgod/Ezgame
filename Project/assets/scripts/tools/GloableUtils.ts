import { UIManager } from "../manager/UIManager";
import { UINameEnum } from "../enum/UINameEnum";
import PopupWarningUI from "../ui/PopupWarningUI";
import GameLauncher from "../logic/GameLauncher";
import { LocalStorageEnum } from "../enum/LocalStorageEnum";
import { MapCeilTypeEnum } from "../enum/MapCeilTypEnum";
import { JsonConigUtils } from "./JsonConfigUtils";

class TipsStruct {
    public content: string;
    public okCallBack: () => void;
    public cancelCallBack: () => void;
    public constructor(content: string, okCallBack?: () => void, cancelCallBack?: () => void) {
        this.content = content;
        this.okCallBack = okCallBack;
        this.cancelCallBack = cancelCallBack;
    }
}

export class GloableUtils {
    /**
     * tips等待队列
     */
    private static tipsPendingQueue: Tools.Queue<TipsStruct> = null;
    /**
     * 用来显示提示或警告的全局方法
     * 提示窗口会按照先后顺序显示
     * @param content 
     * @param okCallBack 
     * @param cancelCallBack 
     */
    public static ShowTips(content: string, okCallBack: () => void = null, cancelCallBack: () => void = null) {
        if (GloableUtils.tipsPendingQueue == null) {
            GloableUtils.tipsPendingQueue = new Tools.Queue<TipsStruct>();
        }
        GloableUtils.tipsPendingQueue.Enqueue(new TipsStruct(content, okCallBack, cancelCallBack));
        if (GloableUtils.tipsPendingQueue.count == 1) {
            GloableUtils.RealShowTips();
        }
    }
    private static RealShowTips() {
        let tip = GloableUtils.tipsPendingQueue.first;
        UIManager.Instance.ShowUI(UINameEnum.POP_UP_WARNING_UI, (error, _popUpWarningUI: PopupWarningUI) => {
            if (error == null) {
                Logger.log(`show tips,content:${tip.content}`, "TIP");
                _popUpWarningUI.text.string = tip.content;
            } else {
                GloableUtils.tipsPendingQueue.Dequeue();
            }
        });
    }
    /**
     * 特殊用途的函数在PopupWarningUI中会被调用,其他地方不要调用该函数!
     * 没用事件监听的方式写是因为懒得写
     * tips界面点击OK按钮触发回调
     */
    public static TipsOnclickOk() {
        let tip = GloableUtils.tipsPendingQueue.Dequeue();
        tip.okCallBack != null && tip.okCallBack();
        Logger.log(`click ok,content:${tip.content}`, "TIP");
        if (GloableUtils.tipsPendingQueue.count == 0) {
            UIManager.Instance.HideUI(UINameEnum.POP_UP_WARNING_UI);
        } else {
            GloableUtils.RealShowTips();
        }
    }
    /**
     * 特殊用途的函数在PopupWarningUI中会被调用,其他地方不要调用该函数!
     * 没用事件监听的方式写是因为懒得写
     * tips界面点击cancel按钮触发回调
     */
    public static TipsOnclickCancel() {
        let tip = GloableUtils.tipsPendingQueue.Dequeue();
        tip.cancelCallBack != null && tip.cancelCallBack();
        Logger.log(`click cancel,content:${tip.content}`, "TIP");
        if (GloableUtils.tipsPendingQueue.count == 0) {
            UIManager.Instance.HideUI(UINameEnum.POP_UP_WARNING_UI);
        } else {
            GloableUtils.RealShowTips();
        }
    }

    /**
     * 查找节点路径
     */
    public static GetNodePath(from: cc.Node, to: cc.Node) {
        let ret = null;
        while (to != null && to != undefined && from != to) {
            if (ret != null) {
                ret = to.name.concat('/'.concat(ret));
            } else {
                ret = to.name;
            }
            to = to.parent;
        }
        return ret;
    }

    public static Delay(time): Promise<void> {
        return new Promise<void>((resolve, reject) => { setTimeout(() => resolve(), time) });
    }

    /**
     * @param centerType 中心ceil的地形
     * @param roundType 如果中心ceil周围存在不同种类的类型，则该值代表其他的类型
     * @param mask 用8位二进制位代表周围的地形是否和自己想同，相同则表示为1，不同为0
     * @return 返回一个对象，对象中atlas表示应该使用的图集，id表示使用哪张纹理
     */
    private GetAtalasAndCeilName(centerType: number, roundType: number, mask: number, callback: (ret: { atlas: string, id: string }) => {}) {
        JsonConigUtils.ReadJsonObjectByName("MapAtlasNameConfig", (error, conf) => {
            if (error) {
                Logger.error(error, "GetAtalasAndCeilName");
                return;
            }
            conf = conf[centerType.toString()];
            if (!conf) {
                Logger.error(`找不到地形${centerType}对应的图集配置`, "GetAtalasAndCeilName");
                return;
            }
            if (centerType == roundType) {
                conf = conf[0];
                roundType = conf[0].other_type;
            }
            else {
                let flag = false;
                for (let i = 0; i < conf.length; i++) {
                    if (conf[i].other_type == roundType) {
                        conf = conf[i];
                        flag = true;
                        break;
                    }
                }
                if (flag == false) {
                    Logger.error(`找不到地形${centerType}在周围地形为${roundType}的情况下所对应的图集配置`, "GetAtalasAndCeilName");
                    return;
                }
            }
            let ret: { atlas: string, id: string } = <any>{};
            ret.atlas = conf.atals;
            if(centerType > roundType){
                ret.id = (mask & 0b11111111).toString();
            }else{
                ret.id = mask.toString();
            }
            if (callback) {
                callback(ret);
            }
        });
    }

    /**
     * 对周围地块周围的节点遍历用数组
     */
    public static dx = [1,0,-1,1,-1,1,0,-1];
    public static dy = [-1,-1,-1,0,0,1,1,1];
}