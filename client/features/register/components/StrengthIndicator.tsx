import { evalPasswordStrengthReturn } from "../helpers/evaluatePasswordStrength"

function StrengthIndicator({strength}: evalPasswordStrengthReturn) {

  const color = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500"
  }

  const size = {
    weak: "33%",
    medium: "66%",
    strong: "100%"
  }

  
  return (
    <div className="mt-3">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
        className={`h-full ${color[strength]}`}
        style={{width: size[strength]}}
        ></div>
      </div>
      <p className={`text-sm text-white-600 mt-1`}>{strength}</p>
    </div>
  )
}

export default StrengthIndicator