import { createServer } from 'vite'
import _ from 'lodash'
import vue3Config from './vue3.config'
import vue3Component from './vue3.component'
import { buildInfo } from '@/parse'

export default async () => {
    let obj = {}
    if(buildInfo.mode === "component"){
        obj = vue3Component(true)
    }else{
        obj = vue3Config(true)
    }
    const server = await createServer({
        ...obj,
        logLevel: 'info',
        server: {
            port: 3366
        }
    })
    await server.listen()
    server.printUrls()
}
