import { INiuTreeData, INiuTreeKey, INiuTreeProps } from "./type"

export function convertTreeData(items: INiuTreeProps[]) {
    return convertData<INiuTreeProps, INiuTreeData>(items)
}
export function convert(item: INiuTreeProps) {
    return convertData<INiuTreeProps, INiuTreeData>([item])[0]
}

export function convertData<
    T extends { children?: T[] },
    S extends { children?: S[] }
>(data: T[] | S[]): S[] {
    const transformData = data.map((item: any) => {
        const children = item.children && convertData(item.children)
        const result = {
            ...item,
            isEdit: item?.isEdit?item.isEdit:false,
            isNew: item?.isNew?item.isNew:false,
            isFolder: !!children,
            isExpand: item?.isExpand?item.isExpand:false, // 默认全部收缩
            isFile: !children,
            children,
        } as S
        return result
    })
    return transformData
}

export function sort(treeData: INiuTreeData[]) {
    // 文件夹排前面
    // 按文件名排序
}

export function flatTreeData(treeData: INiuTreeData[]): INiuTreeData[] {
    let res: INiuTreeData[] = []
    treeData.forEach((data) => {
        res.push(data)
        if (data.children) {
            res = res.concat(flatTreeData(data.children))
        }
    })
    return res
}
export function isChildOf(
    a_key: INiuTreeKey,
    b_key: INiuTreeKey,
    treeData: INiuTreeData[]
) {
    if (!a_key) return false
    if (!b_key) return false
    if (a_key === b_key) return false

    let target_node = findByKey(b_key, treeData)
    if (!target_node || !Array.isArray(target_node.children)) return false

    return (
        flatTreeData(target_node.children).findIndex((i) => i.key === a_key) >
        -1
    )
}
export function isChild(
    a_key: INiuTreeKey,
    treeData: INiuTreeData[]
) {
    if (!a_key) return false
    return (
        treeData.findIndex((i) => i.key === a_key) >
        -1
    )
}
export function forEachTree(tree: INiuTreeData[], cb: (node: INiuTreeData)=>void) {
    tree.forEach(v=>{
        cb && cb(v)
        if(v.children && v.children.length){
            forEachTree(v.children, cb)
        }
    })
}

export function findByKey(
    key: INiuTreeKey,
    treeData: INiuTreeData[]
): INiuTreeData | undefined {
    for (let i = 0; i < treeData.length; i++) {
        const data = treeData[i]
        if (data.key === key) {
            return data
        }
        if (data.children && data.children.length) {
            let result = findByKey(key, data.children)
            if (result) {
                return result
            }
        }
    }
}
export function findByKeyParent(
    key: INiuTreeKey,
    treeData: INiuTreeData[]
): INiuTreeData | undefined {
    for (let i = 0; i < treeData.length; i++) {
        const data = treeData[i]
        if (data.children?.map(v=>v.key).includes(key)) {
            return data
        }
        if (data.children && data.children.length) {
            let result = findByKeyParent(key, data.children)
            if (result) {
                return result
            }
        }
    }
}
export function insertBeforeByKey(
    key: INiuTreeKey,
    node: INiuTreeData,
    treeData: INiuTreeData[]
) {
    if (!treeData || !treeData.length) {
        return
    }
    for (let i = 0; i < treeData.length; i++) {
        let data = treeData[i]
        console.log(key)

        if (data.key === key) {
            console.log(node)
            treeData.splice(i, 0, node)
            break
        }
        if (data && data.children) {
            insertBeforeByKey(key, node, data.children)
        }
    }
}
export function insertAfterByKey(
    key: INiuTreeKey,
    node: INiuTreeData,
    treeData: INiuTreeData[]
) {
    if (!treeData || !treeData.length) {
        return
    }
    for (let i = 0; i < treeData.length; i++) {
        let data = treeData[i]
        if (data.key === key) {
            treeData.splice(i + 1, 0, node)
            break
        }
        if (data && data.children) {
            insertAfterByKey(key, node, data.children)
        }
    }
}
// https://blog.csdn.net/baidu_36095053/article/details/121649810
export function removeByKey(key: INiuTreeKey, treeData: INiuTreeData[], cb?:(node: INiuTreeData)=>void) {
    if (!treeData || !treeData.length) {
        return
    }
    for (let i = 0; i < treeData.length; i++) {
        let data = treeData[i]
        if (data.key === key) {
            cb && cb(data)
            treeData.splice(i, 1)
            break
        }
        if (data && data.children) {
            removeByKey(key, data.children)
        }
    }
}
