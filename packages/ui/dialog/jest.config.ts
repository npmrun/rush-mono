import Config from "@internal/build/jest.config"
import { JestConfig } from "@internal/build"
import path from "path"
console.log(process.cwd());
console.log(__dirname.replace("d:","D:"));
console.log(path.normalize(__dirname));

export default {
    ...Config,
    roots: [ __dirname.replace("d:","D:") ]
} as JestConfig