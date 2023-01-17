import { useRouter } from "next/router"
import { useEffect } from "react";

const NotFound = () => {
    const router = useRouter();
    useEffect(()=>{
        setTimeout(()=>(
            router.push('/404')
            ),3000);
    },[])

  return (
    <div>NotFound Page</div>
  )
}

export default NotFound