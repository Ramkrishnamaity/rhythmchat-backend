

export type RegisterRequestType = {
    about: string
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string
}

export type LoginRequestType = {
    email: string
    password: string
}