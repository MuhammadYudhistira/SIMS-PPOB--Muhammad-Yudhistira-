import React from 'react'

const BannerCard = ({ name, src }) => {
  return (
    <div className="min-w-[300px] rounded-xl overflow-hidden">
      <img
        src={src}
        alt={name}
        className="h-36 object-cover"
      />
    </div>
  )
}

export default BannerCard
