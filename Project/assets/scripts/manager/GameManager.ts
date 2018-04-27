import { GameStateLogin } from "../fsm/gameState/GameStateLogin";
import { GameStateSceneLoading } from "../fsm/gameState/GameStateSceneLoading";
import { GameStateEnum } from "../enum/StateEnum";

export class GameManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new GameManager();
    private constructor() { }
    /**
     * 游戏状态机
     */
    public stateMachine: FSM.StateMachine;
    /**
     * 初始化函数
     */
    public Init() {
        this.stateMachine = FSM.StateMachine.GetBuilder().
            AddState(new GameStateLogin()).
            AddState(new GameStateSceneLoading()).
            build();
        this.stateMachine.ChangeState(GameStateEnum.GAME_STATE_LOGIN);
    }
    /**
     * 更新函数，主要用于更新游戏状态机
     * @param dt 游戏帧间隔时间
     */
    public Update(dt) {
        this.stateMachine.Update();
    }
}