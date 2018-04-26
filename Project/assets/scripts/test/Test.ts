import { UIManager } from "../manager/UIManager";

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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';
    stateMachine : FSM.StateMachine;
    start() {
        // RpcClient.Instance.Init("localhost:20170", function(ev: Event){
        //     new Promise<void>(async () =>{ 
        //         let x = await SimCivil.Contract.IAuth.LogIn("jyk", "123");
        //        console.info(x);
        //     }
        //     )
        // });
        // Logger.log(1);
        // this.asyncTest();
        // Logger.log(4);
        UIManager.Instance.Init();
        UIManager.Instance.ShowUI(UINameEnum.LAYER_NODE,()=>{
            UIManager.Instance.HideUI(UINameEnum.LAYER_NODE);
        });
    }
    async asyncTest(){
        Logger.log(2);
        await 1+1;
        Logger.log(3);
    }
    update(dt){
        TimeManager.Instance.Update(dt);
    }
}
