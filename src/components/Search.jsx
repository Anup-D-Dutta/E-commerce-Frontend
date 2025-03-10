import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';


const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])


    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-3xl border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-black '>
        <div >
            {
                (isMobile && isSearchPage ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 rounded-full'>
                        <FaArrowLeft size={20} className=''/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 '>
                        <IoSearch size={22}/>
                    </button>
                )
            }
        </div>
        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                     //not in search page
                     <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                        <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "reebok"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "nike"',
                                    1000,
                                    'Search "jordan"',
                                    1000,
                                    'Search "puma"',
                                    1000,
                                    'Search "adidas"',
                                    1000,
                                    'Search "asics"',
                                    1000,
                                   
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                     </div>
                ) : (
                    //when i was search page
                    <div className='w-full h-full'>
                        <input
                            type='text'
                            placeholder='Search for atta dal and more.'
                            autoFocus
                            defaultValue={searchText}
                            className='bg-transparent w-full h-full outline-none '
                            onChange={handleOnChange}
                        />
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Search


// -------------------------------------------------------------------------------------------------



// import React, { useEffect, useState } from 'react';
// import { IoSearch } from "react-icons/io5";
// import { FaArrowLeft } from "react-icons/fa";
// import { useLocation, useNavigate } from 'react-router-dom';
// import useMobile from '../hooks/useMobile';

// const Search = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [showSearchField, setShowSearchField] = useState(false);
//     const params = useLocation();
//     const searchText = params.search.slice(3);

//     useEffect(() => {
//         setShowSearchField(location.pathname === "/search");
//     }, [location]);

//     const handleOnChange = (e) => {
//         const value = e.target.value;
//         navigate(`/search?q=${value}`);
//     };

//     const handleSearchClick = () => {
//         setShowSearchField(true);
//     };

//     const handleBackClick = () => {
//         setShowSearchField(false);
//     };

//     return (
//         <div 
//             style={{
//                 position: 'fixed',
//                 top: '1.3rem',
//                 right: '13.5rem',
//                 // zIndex: 1000, 
//                 display: 'flex',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }} 
//         >
//             {showSearchField ? (
//                 <button onClick={handleBackClick} style={{ marginRight: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
//                     <FaArrowLeft size={20} />
//                 </button>
//             ) : (
//                 <button onClick={handleSearchClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                     <IoSearch size={22} />
//                 </button>
//             )}
//             {showSearchField && (
//                 <input
//                     style={{
//                         // border: '1px solid black',
//                         borderRadius: '8px',
//                         padding: '5px',
//                         outline: 'none',
//                         width: '200px',
//                     }}
//                     type='text'
//                     placeholder='Search for atta dal and more.'
//                     autoFocus
//                     defaultValue={searchText}
//                     onChange={handleOnChange}
//                 />
//             )}
//         </div>
//     );
// };

// export default Search;


// import React, { useEffect, useState } from 'react';
// import { IoSearch } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { TypeAnimation } from 'react-type-animation';
// import { FaArrowLeft } from "react-icons/fa";
// import useMobile from '../hooks/useMobile';

// const Search = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isSearchPage, setIsSearchPage] = useState(false);
//     const [isMobile] = useMobile();
//     const params = useLocation();
//     const searchText = params.search.slice(3);

//     useEffect(() => {
//         setIsSearchPage(location.pathname === "/search");
//     }, [location]);

//     const redirectToSearchPage = () => {
//         navigate("/search");
//     };

//     const handleOnChange = (e) => {
//         const value = e.target.value;
//         navigate(`/search?q=${value}`);
//     };

//     return (
//         <div
//             style={{
//                 width: '100%',
//                 minWidth: '300px',
//                 maxWidth: '420px',
//                 height: '44px',
//                 // position: 'fixed',
//                 // right:'14rem',
//                 borderRadius: '8px',
//                 // border: '1px solid #ccc',
//                 overflow: 'hidden',
//                 display: 'flex',
//                 alignItems: 'center',
//                 color: '#6b7280',
//                 backgroundColor: '#f8fafc',
//                 transition: 'border-color 0.2s ease-in-out'
//             }}
//         >
//             <div>
//                 {isMobile && isSearchPage ? (
//                     <Link
//                         to="/"
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '100%',
//                             padding: '8px',
//                             margin: '4px',
//                             borderRadius: '50%',
//                             backgroundColor: '#fff',
//                             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         <FaArrowLeft size={20} />
//                     </Link>
//                 ) : (
//                     <button
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             height: '100%',
//                             padding: '12px',
//                             cursor: 'pointer',
//                             background: 'none',
//                             border: 'none'
//                         }}
//                     >
//                         <IoSearch size={22} />
//                     </button>
//                 )}
//             </div>

//             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
//                 {!isSearchPage ? (
//                     <div
//                         onClick={redirectToSearchPage}
//                         style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                     >
//                         <TypeAnimation
//                             sequence={[
//                                 'Search "milk"', 1000,
//                                 'Search "bread"', 1000,
//                                 'Search "sugar"', 1000,
//                                 'Search "paneer"', 1000,
//                                 'Search "chocolate"', 1000,
//                                 'Search "curd"', 1000,
//                                 'Search "rice"', 1000,
//                                 'Search "egg"', 1000,
//                                 'Search "chips"'
//                             ]}
//                             wrapper="span"
//                             speed={50}
//                             repeat={Infinity}
//                         />
//                     </div>
//                 ) : (
//                     <div style={{ width: '100%', height: '100%' }}>
//                         <input
//                             type="text"
//                             placeholder="Search for atta dal and more."
//                             autoFocus
//                             defaultValue={searchText}
//                             onChange={handleOnChange}
//                             style={{
//                                 background: 'transparent',
//                                 width: '100%',
//                                 height: '100%',
//                                 outline: 'none',
//                                 border: 'none',
//                                 fontSize: '16px',
//                                 padding: '5px 10px'
//                             }}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Search;
