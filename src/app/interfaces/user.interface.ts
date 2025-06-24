export interface IAddress {
    city: string,
    street: string,
    zip: number
}



export interface IUser {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN',
    address: IAddress
}