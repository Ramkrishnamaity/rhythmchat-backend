

export type UserModelType<T> = T & {
    bio: string
    firstName: string
    lastName: string
    email: string
    password: string
    image: string
}