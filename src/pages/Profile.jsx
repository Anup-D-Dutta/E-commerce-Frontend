import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';


const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false)
    // const [userData,setUserData] = useState({
    //     name : user.name,
    //     email : user.email,
    //     mobile : user.mobile,
    // })
    const [userData, setUserData] = useState({
        name: user?.name ?? "",   // Ensure name is never null
        email: user?.email ?? "",
        mobile: user?.mobile ?? "",
    });

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name ?? "",    // Fallback to empty string
                email: user.email ?? "",
                mobile: user.mobile ?? "",
            });
        }
    }, [user]);


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setUserData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='p-4'>

            {/**profile upload and display image */}
            <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                {
                    user.avatar ? (
                        <img
                            alt={user.name}
                            src={user.avatar}
                            className='w-full h-full'
                        />
                    ) : (
                        <FaRegUserCircle size={65} />
                    )
                }
            </div>
            <button onClick={() => setProfileAvatarEdit(true)} className='text-sm min-w-20 border border-black hover:border-gray-900 hover:text-white hover:bg-gray-900 px-3 py-1 rounded-full mt-3'>Edit</button>

            {
                openProfileAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
                )
            }

            {/**name, mobile , email, change password */}
            <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Name</label>
                    <input
                        className='p-2 bg-blue-50 outline-none border focus-within:border-black rounded-lg'
                        type='text'
                        placeholder='Enter your name'
                        value={userData.name ?? ""}  // Ensure value is never null
                        name='name'
                        onChange={handleOnChange}
                        required
                    />

                </div>
                <div className='grid'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your email'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-black rounded-lg'
                        value={userData.email}
                        name='email'
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className='grid'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                        type='text'
                        id='mobile'
                        placeholder='Enter your mobile'
                        className='p-2 bg-blue-50 outline-none border focus-within:border-black rounded-lg'
                        value={userData.mobile}
                        name='mobile'
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="flex justify-center items-center">
    <button className="w-40 border px-4 py-2 font-semibold hover:bg-black border-black text-black hover:text-white rounded-xl">
        {loading ? "Loading..." : "Submit"}
    </button>
</div>

            </form>
        </div>
    )
}

export default Profile
