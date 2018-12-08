import { UINameEnum } from "../enum/UINameEnum";
import { GloableConstantUtils } from "../tools/GloableConstantUtils";

export class ResourcesManager {
    /**
     * 单例模式声明
     */
    public static readonly Instance = new ResourcesManager();
    private constructor() { }

    private atlasMap: Array<cc.SpriteAtlas> = new Array<cc.SpriteAtlas>();

    public Init() {

    }

    public loadRes(path: string, callback: (error: Error, resource: any) => void) {
        cc.loader.loadRes(path, callback);
    }

    public loadAtlas(atlasName: string, callback: (error: Error, resource: cc.SpriteAtlas) => void) {
        if (this.atlasMap[atlasName]) {
            callback(null, this.atlasMap[atlasName]);
        } else {
            cc.loader.loadRes(GloableConstantUtils.AtlasPath.concat(atlasName), cc.SpriteAtlas, (error, atlas) => {
                if (!error) {
                    this.atlasMap[atlasName] = atlas;
                    //解决出现黑线的问题
                    (atlas as cc.SpriteAtlas).getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
                }
                callback(error, atlas);
            });
        }
    }
}