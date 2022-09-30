import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String as PropType<string>,
            default: '',
        },
    },
    setup(props, context) {
        const { title } = props
        return () => (
            <>
                <div style="color: red">=={title}==</div>
            </>
        )
    },
})
