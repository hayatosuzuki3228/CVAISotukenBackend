import { UserCategory } from "./UserCategory"

export function verify(sessionCategory?: UserCategory, ...targetCategory: UserCategory[]) {
    if(!targetCategory.includes(sessionCategory as UserCategory)) { 
        throw new Error("認証情報が不正です")
    }
}

export function verifyStudent(sessionCategory: UserCategory | undefined) {
    verify(sessionCategory, UserCategory.student)
}

export function verifyCompany(sessionCategory: UserCategory | undefined) {
    verify(sessionCategory, UserCategory.company)
}

export function verifyAdmin(sessionCategory: UserCategory | undefined) {
    verify(sessionCategory, UserCategory.admin)
}