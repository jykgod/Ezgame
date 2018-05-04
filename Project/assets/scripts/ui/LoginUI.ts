import UIBase from "./UIBase";
import { GameManager } from "../manager/GameManager";
import { GameStateEnum } from "../enum/StateEnum";
import { SceneEnum } from "../enum/SceneEnum";
import { LocalizationManager } from "../manager/LocalizationManager";
import { JsonConfigNameEnum } from "../enum/JsonConfigNameEnum";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginUI extends UIBase {

    @property(cc.EditBox)
    public accountEditBox: cc.EditBox;
    @property(cc.EditBox)
    public passwrodEditBox: cc.EditBox;

    public hide() {
        UIAnimationUtils.ScaleOut(this.node);
    }
    public show() {
        UIAnimationUtils.ScaleIn(this.node);
    }

    /**
     * 点击登录按钮
     */
    public onClickLogin() {
        // 尝试与服务器建立连接，初始化rpcclient
        if (RpcClient.Instance.session == null || RpcClient.Instance.session.connected == false) {
            JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum.Client_Config, (error, clientConfig) => {
                if (error == null) {
                    RpcClient.Instance.Init(clientConfig.ServerIP, () => this.onClickLogin());
                }
            });
        } else {
            //已经建立后直接调用登录接口
            SimCivil.Contract.IAuth.LogIn(this.accountEditBox.string, this.passwrodEditBox.string).then(
                (logined) => {
                    Logger.info(logined);
                    GameManager.Instance.stateMachine.ChangeState(GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum.MAIN)
                });
        }
    }
}
