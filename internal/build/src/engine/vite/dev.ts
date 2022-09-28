import { createServer } from 'vite'
import _ from 'lodash'
import vue3Config from './vue3.config'

export default async () => {
    const server = await createServer({
        ...vue3Config(true),
        logLevel: 'info',
        server: {
            port: 3366
        }
    })
    await server.listen()
    server.printUrls()
}
