/**
 * 游戏状态机的枚举
 */
export enum GameStateEnum{
    /**
     * 登录状态
     */
    GAME_STATE_LOGIN = 0,
    /**
     * 加载状态(用于场景切换时的加载)
     */
    GAME_STATE_SCENE_LOADING = 1,
    /**
     * 主场景正常状态
     */
    GAME_STATE_MAIN_NORMAL = 2,
}