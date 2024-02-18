import React from 'react'
import DesktopHome from '../Components/Home/DesktopHome'
import MobileHome from '../Components/Home/MobileHome'
import { useEffect , useState} from 'react'
const HomePage = () => {
  
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 772;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);


  return (
    <>
    {width < breakpoint ? <MobileHome /> : <DesktopHome />}

    </>
  )
}

export default HomePage