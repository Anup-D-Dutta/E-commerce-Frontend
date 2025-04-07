import toast from "react-hot-toast"
import SummaryApi from "../common/SummaryApi"
import Axios from "./Axios"
import AxiosToastError from "./AxiosToastError"

export const addToCartProduct = async(productId,qty, size)=>{
    try {
        const response = await Axios({
            ...SummaryApi.addTocart,
            data : {
                quantity : qty,
                productId : productId,
                size
            }
        })

        const { data : responseData} = response

        console.log(responseData)
        if(responseData.success){
            toast.success(responseData.message)
        }
        return responseData

    } catch (error) {
        AxiosToastError(error)

        return {}
    }
}

export const getCartItems = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getCartItem
        })

        const { data : responseData } = response

        if(responseData.success){
            return responseData 
        }
    } catch (error) {
        AxiosToastError(error)
        return error
    }
}