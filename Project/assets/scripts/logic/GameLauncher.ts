import { GameManager } from "../manager/GameManager";
import { UIManager } from "../manager/UIManager";
import { LocalizationManager } from "../manager/LocalizationManager";
import { ResourcesManager } from "../manager/ResourcesManager";
import { UI2EcsSessionManager } from "../manager/UI2EcsSessionManager";
import InputSystem from "../ecs/system/InputSystem";
import UISessionData from "../ecs/sharedComponent/UISessionDate";
import NpcBehaviour from "../ecs/behaviour/NpcBehaviour";
import HealthBehaviour from "../ecs/system/HealthBehaviour";

const { ccclass, property } = cc._decorator;

/**
 * 启动器
 * 负责初始化、更新、销毁各个manager
 */
@ccclass
export default class GameLauncher extends cc.Component {
    /**
     * 单例
     */
    private static instance: GameLauncher = null;
    public static get Instance(): GameLauncher {
        return this.instance;
    }

    onLoad() {
        //---------------------test----------------------
        // cc.sys.localStorage.clear();
        //-----------------------------------------------
        GameLauncher.instance = this;
        cc.game.addPersistRootNode(this.node);
        ResourcesManager.Instance.Init();
        TimeManager.Instance.Init();
        LocalizationManager.Instance.Init("cn");
        UIManager.Instance.Init();
        GameManager.Instance.Init();
        UI2EcsSessionManager.Instance.Init();
        let world = ECS.World.CreateAWorld('simsivil');
        //添加输入系统
        world.addSystem(InputSystem);
        //定义行为
        world.defineBehaviour(NpcBehaviour, HealthBehaviour);
        //添加UI会话数据组件
        ECS.World.active.EntitisManager.addSharedComponent(UISessionData);
        // let world = ECS.World.CreateAWorld("hello");
        // world.addSystem(InputSystem);
        // let entity1 = world.EntitisManager.CreateAEntity();
        // let entity2 = world.EntitisManager.CreateAEntity();
        // let entity3 = world.EntitisManager.CreateAEntity();
        // let entity4 = world.EntitisManager.CreateAEntity();
        // world.EntitisManager.addComponent(entity1, TestComponent);
        // world.EntitisManager.addComponent(entity2, TestComponent, PositionComponent);
        // world.EntitisManager.addComponent(entity3, PositionComponent);
        // world.EntitisManager.addComponent(entity4, TestComponent, PositionComponent);
        // let heap = new Tools.BinaryHeap<number>((a,b)=>{return a > b});
        // heap.Push(5);
        // heap.Push(10);
        // heap.Push(3);
        // heap.Push(7);
        // Logger.log(heap.GetSortArray());
        // Logger.log(heap.GetSortArray());
        // let entityManager = ECS.World.CreateAWorld("myWorld").EntitisManager;
        // entityManager.addComponent(entityManager.CreateAEntity(), TestComponent, TestComponent2);
        // entityManager.addComponent(entityManager.CreateAEntity(), TestComponent);
        // Logger.log(entityManager.GetEntities(TestComponent), "getentities1");
        // Logger.log(entityManager.GetEntities(TestComponent2), "getentities2");
        // entityManager.addComponent(1, TestComponent2);
        // Logger.log(entityManager.GetEntities(TestComponent), "getentities3");
        // Logger.log(entityManager.GetEntities(TestComponent2), "getentities4");
        // entityManager.removeComponent(1, TestComponent2);
        // Logger.log(entityManager.GetEntities(TestComponent), "getentities5");
        // Logger.log(entityManager.GetEntities(TestComponent2), "getentities6");
        // let node1 = new cc.Node();
        // node1.name = "nihao"
        // node1.parent = UIManager.Instance.Canvas.node;

        // let node2 = new cc.Node();
        // node2.name = "baba"
        // node2.parent = node1;

        // let node3 = new cc.Node();
        // node3.name = "erzi"
        // node3.parent = node2;
        // Logger.log(cc.(node3, node1));
        // let a = LocalStorageUtils.loadStorageObject<A>("A");
        // Logger.info(a);
    }

    update(dt) {
        TimeManager.Instance.Update(dt);
        GameManager.Instance.Update(dt);
        UI2EcsSessionManager.Instance.Update(dt);
        if (ECS.World.active != null && ECS.World.active != undefined) {
            ECS.World.active.update();
        }
    }

    onDestroy() {
        ECS.World.RemoveWorld('simsivil');
    }

    private setScreenFit() {

    }
}