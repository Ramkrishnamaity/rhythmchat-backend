

export type RegisterRequestType = {
    bio: string
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