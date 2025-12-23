import { hasNumber, hasMixedCase, hasLength, hasSymbol } from "../utils/validateInput"


export type evalPasswordStrengthReturn = 'weak' | 'medium' | 'strong'

export const evalPasswordStrength = (password: string): evalPasswordStrengthReturn => {
    const strength =[
        hasNumber(password), 
        hasMixedCase(password), 
        hasLength(password), 
        hasSymbol(password)
    ]
    console.log(strength)

    const trueValues = strength.filter(s => s === true)
    if(trueValues.length <= 1) return 'weak'
    if(trueValues.length <= 3) return 'medium'
    return 'strong'
}