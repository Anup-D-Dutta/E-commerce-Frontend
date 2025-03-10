// import React from 'react'
// import banner from '../assets/banner.jpg'
// import shoes from '../assets/SK_samba.webp'
// import bannerMobile from '../assets/sh2.webp'
// // import shMobile from '../assets/sh2.webp'
// import { useSelector } from 'react-redux'
// import { valideURLConvert } from '../utils/valideURLConvert'
// import {Link, useNavigate} from 'react-router-dom'
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory)
//   const categoryData = useSelector(state => state.product.allCategory)
//   const subCategoryData = useSelector(state => state.product.allSubCategory)
//   const navigate = useNavigate()

//   const handleRedirectProductListpage = (id,cat)=>{
//       console.log(id,cat)
//       const subcategory = subCategoryData.find(sub =>{
//         const filterData = sub.category.some(c => {
//           return c._id == id
//         })

//         return filterData ? true : null
//       })
//       const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

//       navigate(url)
//       console.log(url)
//   }


//   return (
//    <section className='bg-white'>
//       <div className='container mx-auto'>
//           <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
//               <img
//                 src={shoes}
//                 className='w-full h-full hidden lg:block'
//                 alt='banner' 
//               />
//               <img
//                 src={bannerMobile}
//                 className='w-full h-full lg:hidden'
//                 alt='banner' 
//               />
//           </div>
//       </div>

//       <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2'>
//           {
//             loadingCategory ? (
//               new Array(12).fill(null).map((c,index)=>{
//                 return(
//                   <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
//                     <div className='bg-blue-100 min-h-24 rounded'></div>
//                     <div className='bg-blue-100 h-8 rounded'></div>
//                   </div>
//                 )
//               })
//             ) : (
//               categoryData.map((cat,index)=>{
//                 return(
//                   <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
//                     <div>
//                         <img 
//                           src={cat.image}
//                           className='w-full h-full object-scale-down'
//                         />
//                     </div>
//                   </div>
//                 )
//               })

//             )
//           }
//       </div>

//       {/***display category product */}
//       {
//         categoryData?.map((c,index)=>{
//           return(
//             <CategoryWiseProductDisplay 
//               key={c?._id+"CategorywiseProduct"} 
//               id={c?._id} 
//               name={c?.name}
//             />
//           )
//         })
//       }



//    </section>
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import banner1 from '../assets/puma_b.webp'
import banner2 from '../assets/SK_samba.webp'
import banner3 from '../assets/sh2.webp'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'


const images = [banner1, banner2, banner3] // Array of images for the slider

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 4000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    )
    if (subcategory) {
      console.log('yes')
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`
      navigate(url)
    }
  }

  return (
      <section className='bg-white'>

        <div className='container mx-auto'>
          {/* Image Slider */}
          <div className='w-full h-2 lg:h-full min-h-48 bg-blue-100 rounded overflow-hidden relative'>
            <motion.div
              className='flex w-full h-full'
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              transition={{ ease: 'easeOut', duration: 0.8 }}
              key={currentIndex}
            >
              <img src={images[currentIndex]} className='w-full h-full object-cover' alt='banner' />
            </motion.div>
          </div>
        </div>

        {/* Category Section */}
        {/* <div>
        <h1 className='container mx-auto text-2xl font-bold p-1 text-black '>{categoryData.length > 0 ? categoryData[0].name : "No Category"}</h1>

        <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
          {loadingCategory
            ? new Array(12).fill(null).map((_, index) => (
              <div key={index} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            ))
            : categoryData.map(cat => (
              <div
                key={cat._id}
                className='w-full h-full cursor-pointer'
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <img src={cat.image} className='w-full h-full object-scale-down' alt={cat.name} />
              </div>
            ))}
        </div>
      </div> */}

        {/* Display category-wise products */}
        <p style={{ fontWeight: 'bold', fontSize: '1.3rem', }}>{categoryData.name}</p>

        {categoryData?.map(c => (
          <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
        ))}

      </section>

  )
}

export default Home
