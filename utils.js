'use strict'

import jwt from 'jsonwebtoken'

export function JWTGenerator (id) {
    return jwt.sign({id: id}, process.env.JWT_SECRET)
}
