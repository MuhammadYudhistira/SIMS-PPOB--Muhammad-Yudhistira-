import React from 'react'
import { Link } from 'react-router-dom'

const ServiceItem = ({ icon, label, code }) => {
  return (
    <Link to={`/transactions/${code}`} className="flex flex-col items-center">
      <div className="size-12 flex items-center justify-center  rounded-lg mb-2">
        <img
          src={icon}
          alt={label}
          className="object-contain size-12"
        />
      </div>
      <span className="text-xs text-center capitalize">{label}</span>
    </Link>
  )
}

export default ServiceItem