import { InjectionKey, Slots } from "vue";

export const TreeInjectionKey: InjectionKey<TreeContext> =  Symbol('TreeInjectionKey');

type TreeContext = Readonly<{
//   renderNode: TypeWithUndefined<RenderNodeFunc>;
//   renderIcon: TypeWithUndefined<RenderIconFunc>;
  slots: Slots;
//   expandedKeys: Set<NodeKey>;
//   getSelectedNode: () => TypeWithUndefined<BaseTreeNode>;
//   getCheckedNodes: () => BaseTreeNode[];
//   getHalfCheckedNodes: () => BaseTreeNode[];
//   getExpandedKeys: () => NodeKey[];
}>;