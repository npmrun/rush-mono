export interface INiuTreeProps {
    key: INiuTreeKey // 唯一键值
    title: string // 标题
    isExpand?: boolean // 标题
    isEdit?: boolean
    isDel?: boolean // 是否被删除了
    isNew?: boolean,
    data?: any // 节点数据
    children?: INiuTreeProps[] // 子节点
}

export type INiuTreeKey = string | number

export interface INiuTreeData<T = any> {
    key: INiuTreeKey
    title: string
    isFolder: boolean
    isExpand: boolean
    isFile: boolean
    isNew?: boolean,
    isDel?: boolean,
    data?: T
    isEdit: boolean
    children?: INiuTreeData[]
}

export enum ENiuTreeStatus {
    DragUp = 'drag-up',
    DragIn = 'drag-in',
    DragInner = 'drag-inner',
    DragDown = 'drag-down',
    DragIng = 'drag-ing',
}