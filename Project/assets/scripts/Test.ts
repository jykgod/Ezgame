// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(dragonBones.ArmatureDisplay)
    db: dragonBones.ArmatureDisplay = null;


    start () {
        Logger.info("123");
        Logger.info(this.db.dragonAsset);
        Logger.info(this.db.dragonAtlasAsset);
        let armature: dragonBones.Armature = this.db.armature();
        Logger.info(armature);
        let slot: dragonBones.Slot = armature.getSlot("legR");
        Logger.info(armature.display);
    }

}
