# Ezgame

这个项目是为[SimCivil](https://github.com/tcz717/SimCivil)开发的客户端。  
游戏引擎使用的是CocosCreator(v1.9.0)（不用unity是因为开发目的是2d游戏，ccc够用了，但主要原因还是因为我一直想试试这个引擎~)  
开发语言：TypsScript/JavaScript  
关于游戏的概念可以去看看服务端那边项目的说明~  

## 关于配置表
### 物品配置
文件名:ItemConfig.json  
只包含一个字段data用来存储物品的配置数组,其中每个物品的配置如下  
<pre><code>{  
    "data": [  
        {  
            "id": 0,  
            "name": "测试道具",  
            "des": "测试道具描述",  
            "icon": "a",  
            "skill": 0,  
            "type": 0  
        }  
    ]  
}
</code></pre>
icon是图片名.  
skill如果道具使用会触发技能的话该字段是技能ID，否则可以没有这个字段或者为负数.  
type字段表示物品类型,暂定的几个类型如下:  
0x01 -> 消耗型  
0x02 -> 任务道具  
0x04 -> 唯一  
0x08 -> 会触发技能  
...