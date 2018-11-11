import MotionComponent from "../../ecs/component/MotionComponent";
import PositionComponent from "../../ecs/component/PositionComponent";
import MotionControllerComponent from "../../ecs/component/MotionControllerComponent";
import DirectionComponent from "../../ecs/component/DirectionComponent";

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
export default class Npc extends cc.Component {

    protected _entity: number;
    public get entity(): number {
        return this._entity;
    }
}
