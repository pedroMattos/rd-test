const RecomendationDetails = ({ details, title }) => {
  return (
    <div className="space-y-2">
      <h4 className="font-bold text-sm text-gray-800">
        {title}
      </h4>
      <ul className="space-y-2">
        {details.map((detail, detailIndex) => (
          <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
            <span className="leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecomendationDetails
