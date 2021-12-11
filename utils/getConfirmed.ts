import { UsersRoles, UsersViewModel } from "../types/users"

export function getConfirmed(confirmed: boolean, user: UsersViewModel) {
    return (user === null && confirmed === true) 
        || (user !== null && confirmed === true)
        || (user && user.role === UsersRoles.Editor && user.confirmed) 
        || (user && user.role === UsersRoles.Admin && user.confirmed)
};