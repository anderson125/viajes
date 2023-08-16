import Jwt from "jsonwebtoken"

const generarJWT = datos => Jwt.sign({email: datos.email}, process.env.JWT_SECRET, {expiresIn: '1d'})

export {
    generarJWT
}