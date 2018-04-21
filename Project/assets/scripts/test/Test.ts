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
    session : NetWork.SeverSession;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start() {
        this.session = new NetWork.SeverSession("server1", "ws://192.168.0.106:20170");
    }
    update(dt){
        TimeManager.Instance.Update(dt);
        if (TimeManager.Instance.realTimeSinceStartScene > 10){
            this.session.Close();
        }
        // this.stateMachine.Update();
    }

    // update (dt) {}
}
