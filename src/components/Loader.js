import React from 'react'
import ContentLoader from "react-content-loader"

const Loader = () => {
  return (
    <ContentLoader
      className='loader'
      speed={1.5}
      width={300}
      height={700}
      viewBox="0 0 300 700"
      backgroundColor="#f3f3f3a5"
      foregroundColor="#ecebebd5"
    >
      <rect x="0" y="0" rx="12" ry="12" width="300" height="36" />
      <rect x="0" y="480" rx="10" ry="10" width="300" height="30" />
      <rect x="0" y="410" rx="12" ry="12" width="300" height="50" />
      <circle cx="150" cy="220" r="150" />
      <rect x="0" y="530" rx="10" ry="10" width="300" height="30" />
      <rect x="0" y="580" rx="10" ry="10" width="300" height="30" />
      <rect x="0" y="630" rx="10" ry="10" width="300" height="30" />
    </ContentLoader>
  )
}

export default Loader