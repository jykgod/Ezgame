# Ezgame

这个项目是为[SimCivil](https://github.com/tcz717/SimCivil)开发的客户端。  
游戏引擎使用的是CocosCreator(~~v1.9.0~~ v2.0.1)（不用unity是因为开发目的是2d游戏，ccc够用了，但主要原因还是因为我一直想试试这个引擎~)  
开发语言：TypsScript/JavaScript  
关于游戏的概念可以去看看服务端那边项目的说明~  

## 说明
        游戏入口是gamelauncher。
        outscript文件夹下面的代码改动后需要先用tsc翻译成js后再运行才会起效。
        rpc部分主要是为了迎合服务器的设计开发的，并不适用于其他项目。
        创建一个ui需要在UINameEnum中定义ui的名称，并在assets/prefab/ui/目录下创建相同名称的预制，并将同名的脚本挂在预制上面，步骤很麻烦，以后会开发一个工具自动完成枚举、预制、脚本的创建。
        ecs的框架是按照自己的理解搭的，可能会有设计得不太科学的地方，欢迎指出来。

