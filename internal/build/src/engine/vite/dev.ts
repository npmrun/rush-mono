import { createServer } from 'vite'
import _ from 'lodash'
import vue3Config from './vue3.config'

export default async () => {
    const server = await createServer({
        ...vue3Config(true),
        logLevel: 'info'
    })
    await server.listen()
    server.printUrls()
}
