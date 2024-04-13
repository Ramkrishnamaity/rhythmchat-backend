

export type UserModelType<T> = T & {
    userName: string
    bio: string
    firstName: string
    lastName: string
    email?: string
    image: string
    phoneNumber: string
}