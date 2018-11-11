import { UIManager } from "../manager/UIManager";
import { UINameEnum } from "../enum/UINameEnum";
import PopupWarningUI from "../ui/PopupWarningUI";
import GameLauncher from "../logic/GameLauncher";
import { LocalStorageEnum } from "../enum/LocalStorageEnum";

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
}