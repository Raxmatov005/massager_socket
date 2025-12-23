import { hasNumber, hasMixedCase, hasLength, hasSymbol } from '../utils/validateInput';

function RequirementList({password}: {password:string}) {

  const requirements = [
    {
      label: "at least one number",
      met: hasNumber(password)
    },
    {
      label: "at least one lowercase and uppercase",
      met: hasMixedCase(password)
    },
    {
      label: "at least 8 characters",
      met: hasLength(password)
    },
    {
      label: "at least one symbol",
      met: hasSymbol(password)
    },
  ];

  return (
    <div>
      {requirements.map((req, index) => (
        <p key={index} className={`${req.met ? "text-green-400" : "text-red-600"}`}>
          {req.met ? "✅" : "❌"} {req.label}
        </p>
      ))}
    </div>
  )
}

export default RequirementList