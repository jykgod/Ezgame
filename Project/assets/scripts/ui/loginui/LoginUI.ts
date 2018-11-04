import UIBase from "../UIBase";
import { GameManager } from "../../manager/GameManager";
import { GameStateEnum } from "../../enum/StateEnum";
import { SceneEnum } from "../../enum/SceneEnum";
import { LocalizationManager } from "../../manager/LocalizationManager";
import { JsonConfigNameEnum } from "../../enum/JsonConfigNameEnum";
import { GloableUtils } from "../../tools/GloableUtils";
import { JsonConigUtils } from "../../tools/JsonConfigUtils";

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
    public accountEditBox: cc.EditBox = null;
    @property(cc.EditBox)
    public passwrodEditBox: cc.EditBox = null;
    @property(cc.Button)
    public loginButton: cc.Button = null;
    @property(cc.Button)
    public registerButton: cc.Button = null;
    @property(cc.EditBox)
    public ipEditBox: cc.EditBox = null;

    public hide() {
        UIAnimationUtils.ScaleOut(this.node);
    }
    public show() {
        JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum.Client_Config, (error, clientConfig) => {
            UIAnimationUtils.ScaleIn(this.node);
            if(clientConfig.Test == false){
                this.ipEditBox.enabled = false;
            }else{
                this.ipEditBox.string = clientConfig.ServerIP;
            }
        });
    }

    /**
     * 点击登录按钮
     */
    public onClickLogin() {
        this.SetButtonEnable(false);
        if (this.CheckIfConnectServer(() => this.onClickLogin())) {
            //已经建立后直接调用登录接口
            SimCivil.Contract.IAuth.LogInAsync(this.accountEditBox.string, this.passwrodEditBox.string).then(
                (logined) => {
                    this.SetButtonEnable(true);
                    if (logined == null || logined == false) {
                        GloableUtils.ShowTips(LocalizationManager.Instance.GetLocalizationTextByKey("login_text_tips_error"));
                    } else {
                        GameManager.Instance.stateMachine.ChangeState(GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum.MAIN, GameStateEnum.GAME_STATE_MAIN_NORMAL);
                    }
                });
        }
    }

    /**
     * 点击注册按钮
     */
    public onClickRegister() {
        this.SetButtonEnable(false);
        if (this.CheckIfConnectServer(() => this.onClickRegister())) {
            //已经建立后直接调用注册接口
            SimCivil.Contract.IAuth.Register(this.accountEditBox.string, this.passwrodEditBox.string).then(
                (success) => {
                    this.SetButtonEnable(true);
                    if (success == null || success == false) {
                        GloableUtils.ShowTips(LocalizationManager.Instance.GetLocalizationTextByKey("register_text_tips_error"));
                    } else {
                        GloableUtils.ShowTips(LocalizationManager.Instance.GetLocalizationTextByKey("register_text_tips_success"));
                    }
                });
        }
    }

    private SetButtonEnable(enable: boolean) {
        this.loginButton.interactable = enable;
        this.registerButton.interactable = enable;
    }

    /**
     * 检查是否和服务器建立了连接，如果没有则创建连接
     * @param callback 建立连接过后的回到函数
     */
    private CheckIfConnectServer(callback): boolean {
        if (RpcClient.Instance.session == null || RpcClient.Instance.session.connected == false) {
            JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum.Client_Config, (error, clientConfig) => {
                if (error == null) {
                    // offline模式不链接服务器直接进入游戏
                    if (clientConfig.OfflineMode == true) {
                        GameManager.Instance.stateMachine.ChangeState(GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum.MAIN, GameStateEnum.GAME_STATE_MAIN_NORMAL);
                    } else {
                        if(clientConfig.Test == false){
                            RpcClient.Instance.Init(clientConfig.ServerIP, callback);
                        }else{
                            RpcClient.Instance.Init(this.ipEditBox.string, callback);
                        }
                    }
                } else {
                    this.SetButtonEnable(true);
                    GloableUtils.ShowTips(LocalizationManager.Instance.GetLocalizationTextByKey("connet_server_error"));
                }
            });
            return false;
        }
        return true;
    }
}
