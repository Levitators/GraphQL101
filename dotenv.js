'use strict'

import fs from 'fs'
import dotenv from 'dotenv'

const envConfig = dotenv.parse(fs.readFileSync('.env'))
for (let k in envConfig) {
    process.env[k] = envConfig[k]
}
