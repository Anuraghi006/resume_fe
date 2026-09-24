import axiosinstance from "./axiosInstance";

const axiosService= async(httpMethod,url,reqBody)=>{
    try{
        const response=await axiosinstance({
            method:httpMethod,
            url,
            data:reqBody
        })
        return response
    }
    catch(err){
        console.log(err);
        throw err
        
    }
}
export default axiosService