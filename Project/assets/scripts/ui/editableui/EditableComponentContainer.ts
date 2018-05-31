import { EditableComponentContainerConfigure } from "./EditableComponentContainerConfigure";
import { ComponentUINameEnum } from "../../enum/ComponentUINameEnum";
import UIBase from "../UIBase";
/**
 * 可编辑UI组件的容器
 * 需要挂在包含有可编辑UI的父UI上面（用以初始化可编辑UI的初始数据）
 */
const { ccclass, property, requireComponent, disallowMultiple} = cc._decorator;

@ccclass
@disallowMultiple
@requireComponent(UIBase)
export class EditableComponentUIContainer extends cc.Component {
    private conf: EditableComponentContainerConfigure;
    /**
     * 初始化生成的可编辑组件UI数组(仅在第一次加载UI的时候生成一次，以后都从本地存储空间中读取)
     */
    @property([cc.Class(
        {
            name: 'ComponentUIStruct',
            properties: {
                name: {
                    default: ComponentUINameEnum.DEFAULT,
                    tooltip: '可编辑组件UI的名字（从ComponentUINameEnum里面取）'
                },
                fatherNode: {
                    type: cc.Node,
                    default: null,
                    tooltip: '可编辑组件UI需要挂载的节点'
                }
            }
        }
    )])
    private editableComponentUIArr = [];
}