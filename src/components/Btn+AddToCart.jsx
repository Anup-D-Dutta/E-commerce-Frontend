import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'



const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()



    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }
        toast("Please Login")
    }

    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addTocart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingitem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingitem)

        const product = cartItem.find(item => item.productId._id === data._id)
        setQty(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartItem])


    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)

        if (response.success) {
            toast.success("Item added")
        }
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1)

            if (response.success) {
                toast.success("Item remove")
            }
        }
    }
    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='text-sm text-black  hover:text-white flex w-6 h-6 lg:border border-black hover:bg-black p-1 rounded-full flex items-center justify-center'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button onClick={increaseQty} className='text-sm text-black hover:text-white lg:border border-black hover:bg-black w-6 h-6 flex p-1 rounded-full flex items-center justify-center'><FaPlus /></button>
                    </div>
                ) : (
                    <>
                        {/* Show full 'Add to Cart' button on medium screens and above */}
                        <button
                            onClick={handleADDTocart}
                            className='text-white font-bold gap-3 text-lg flex items-center justify-center w-64 h-12 sm:w-[35rem] sm:h-16 bg-black border border-black hover:bg-black hover:opacity-90 transition duration-300 ease-in-out'
                        >
                            <FaCartShopping size={25} />
                            {loading ? <Loading /> : "Add to cart"}
                        </button>
                        <button
                            onClick={redirectToCheckoutPage}

                            className='text-white mt-3 font-bold text-lg flex items-center justify-center w-64 h-12 sm:w-[35rem] sm:h-16 bg-black border border-black hover:bg-black hover:opacity-90 transition duration-300 ease-in-out'
                        >
                            {loading ? <Loading /> : "Buy Now"}
                        </button>



                        {/* Show '+' icon button on small screens */}
                        {/* <button onClick={handleADDTocart} className='block md:hidden bg-black text-white p-2 rounded flex items-center justify-center'>
                            {loading ? <Loading /> : 'Add to card'}
                        </button> */}
                    </>

                )
            }

        </div>
    )
}

export default AddToCartButton
