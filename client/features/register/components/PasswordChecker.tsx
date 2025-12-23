import { Dispatch, SetStateAction } from "react";
import PasswordInput from "./PasswordInput"
import RequirementList from "./RequirementList"
import StrengthIndicator from "./StrengthIndicator"
import { evalPasswordStrength } from "../helpers/evaluatePasswordStrength";


export type PasswordCheckerPropsType = {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>
}

function PasswordChecker({password, setPassword}: PasswordCheckerPropsType) {
    const strength = evalPasswordStrength(password);
    console.log(strength)
  return (
    <div className="flex flex-col gap-2">
        <PasswordInput password={password} setPassword={setPassword}/>
        <StrengthIndicator strength={strength}/>
        <RequirementList password={password}/>
    </div>
  )
}

export default PasswordChecker