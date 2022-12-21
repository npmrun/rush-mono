import { defineComponent, PropType, renderSlot, toRefs } from "vue";
import aanode from "./node.vue"
export default defineComponent({
  name: "RenderNode",
  props: {
    data: {
      type: Object as PropType<any>,
      required: true,
    },
    slots: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const { data, slots } = toRefs(props);
    
    return () => <>
      <aanode></aanode>
    </>;
  },
});
