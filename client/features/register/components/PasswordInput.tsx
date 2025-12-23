import { Dispatch, SetStateAction } from "react";
import { PasswordCheckerPropsType } from "./PasswordChecker";



function PasswordInput({password, setPassword}: PasswordCheckerPropsType) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="••••••••"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white outline-none transition"
      />
    </div> 
  )
}

export default PasswordInput