import InputData from "../sharedComponent/InputData";
import GameLauncher from "../../logic/GameLauncher";
import TestComponent from "../component/TestComponent";
import PositionComponent from "../component/PositionComponent";
import { UIManager } from "../../manager/UIManager";
import { UINameEnum } from "../../enum/UINameEnum";

export default class InputSystem extends ECS.ComponentSystem {
    public OnStart(): void {
        ECS.World.active.EntitisManager.addSharedComponent(InputData);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        GameLauncher.Instance.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        GameLauncher.Instance.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        GameLauncher.Instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    public OnDestroy(): void {
        ECS.World.active.EntitisManager.removeSharedComponent(InputData);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        GameLauncher.Instance.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        GameLauncher.Instance.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        GameLauncher.Instance.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    private onMouseDown(event: cc.Event.EventMouse) {
        switch (event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                InputData.instance.mouse_left = true;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                InputData.instance.mouse_right = true;
                break;
        }
        InputData.instance.mousePosition = event.getLocation();
        InputData.instance.time = TimeManager.Instance.realTimeSinceStartScene;
    }

    private onMouseUp(event) {
        switch (event.getButton()) {
            case cc.Event.EventMouse.BUTTON_LEFT:
                InputData.instance.mouse_left = false;
                break;
            case cc.Event.EventMouse.BUTTON_RIGHT:
                InputData.instance.mouse_right = false;
                break;
        }
        InputData.instance.mousePosition = event.getLocation();
        InputData.instance.time = TimeManager.Instance.realTimeSinceStartScene;
    }

    private onMouseMove(event) {
        InputData.instance.mousePosition = event.getLocation();
        InputData.instance.time = TimeManager.Instance.realTimeSinceStartScene;
    }

    private onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                InputData.instance.up = true;
                break;
            case cc.macro.KEY.a:
                InputData.instance.left = true;
                break;
            case cc.macro.KEY.s:
                InputData.instance.down = true;
                break;
            case cc.macro.KEY.d:
                InputData.instance.right = true;
                break;
            case cc.macro.KEY.e:
                InputData.instance.e = true;
        }
        InputData.instance.time = TimeManager.Instance.realTimeSinceStartScene;
    }

    private onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                InputData.instance.up = false;
                break;
            case cc.macro.KEY.a:
                InputData.instance.left = false;
                break;
            case cc.macro.KEY.s:
                InputData.instance.down = false;
                break;
            case cc.macro.KEY.d:
                InputData.instance.right = false;
                break;
            case cc.macro.KEY.e:
                InputData.instance.e = false;
        }
        InputData.instance.time = TimeManager.Instance.realTimeSinceStartScene;
    }
}