import React from 'react'
import { ShimmerPostList } from "react-shimmer-effects";

const Shimeer = () => {
  return (

     <div className="container mx-auto">
          <ShimmerPostList  postStyle="STYLE_FOUR" col={3} row={1} gap={30} />
     </div>
  )
}

export default Shimeer