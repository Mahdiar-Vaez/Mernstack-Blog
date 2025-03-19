
const fetchData=async (url,option={}) => {
    try {
        const res=await fetch(import.meta.env.VITE_BACKEND_API+url,option)
        const data=await res.json()
        console.log("🚀 ~ fetchData ~ data:", data)

        return data
    } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
        
        return {success:false,message:'خطا در برقراری ارتباط'}
    } 
}
export default fetchData