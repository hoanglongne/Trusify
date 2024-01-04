import "regenerator-runtime/runtime";

import React, {useState, useEffect, useMemo} from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImgProductDetail from "../components/ProductDetail/IngProductDetail";
import StarRatings from "react-star-ratings";
import IconVector from "../assets/images/IconVector.svg";
import { useParams } from "react-router-dom";

export default function ProductDetail({wallet, contract}) {
  //* Get ProductID from params
  const params = useParams()
  const id = params.productId

  //* Initialize const
  const today = new Date();

  //* Initialize States
  const [productObject, setProductObject] = useState(null)
  const [loading, setLoading] = useState(false)

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
  
  //* Fetch the product from blockchain
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await contract.getProductById(id)
  //       setProductObject(data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false); // Set loading to false regardless of success or failure
  //     }
  //   }
  //   fetchData()
  // },[])

  const fetchData = useMemo(async () => {
    try {
      const data = await contract.getProductById(id)
      setProductObject(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  }, [loading]);
  
  useEffect(() => {
    fetchData()
  })

  //TODO: Handle rating change (update soon)
  const handleRatingChange = (newRating) => {

  };

  //* Handle date picker change
  const handleStartDateChange = (date) => {
    console.log(startDate)
    setStartDate(date);
    console.log(startDate)
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const calculateDaysDifference = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((startDate - endDate) / oneDay) + 1);
  };

  //* Handle Loading
  if (productObject == null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <Navbar wallet={wallet} />
        <div className="flex px-[100px] pt-[125px]">
          <div className="w-[45%]">
            {/* <ImgProductDetail contract={contract} productObject={productObject} images={["https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817602.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699401600&semt=ais", 
            "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817607.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699401600&semt=ais", 
            "https://i.pinimg.com/736x/86/c1/ac/86c1ac8bac43ea337f7fe9da5c87a7fd.jpg", 
            "https://i.pinimg.com/originals/db/3f/c5/db3fc5a93f63b2b394f5f1f20dabebfe.jpg"]} /> */}
          </div>
          <div className="flex-1">
              <div className=" flex-1 pl-[60px]">
                {loading ? (
                  <p>Loading...</p>
                ) : 
                <div>
                  {/* //! Product Name */}
                  <div className="text-[1.5rem] font-bold uppercase text-[#343D47]">
                    {productObject.name}
                  </div>

                  {/* //! Rating */}
                 <div className="flex items-center mt-2.5">
                   <div className="mb-[6px]">
                     <StarRatings
                       rating={4.5}
                       starRatedColor="#343D47" 
                       changeRating={handleRatingChange}
                       numberOfStars={5}  
                       starDimension="20px"  
                       starSpacing="2px" 
                     />
                   </div>
                   <span className="ml-5 text-[#343D47] font-bold">4.5</span>
                   <span className="border border-solid border-[#C9CACB] rounded-full w-1.5 h-1.5 bg-[#C9CACB] ml-2.5 mt-1"></span>
                   <div className="ml-2.5 text-[#343D47] font-bold">
                     Read 8 reviews
                   </div>
                 </div> 

                  {/* //! Author */}
                  <div className="mt-2.5">
                        <span>By </span>
                        <span className="text-[#343D47] font-bold italic">
                          Hoang Long
                        </span>
                        <span className="text-[#343D47] font-bold italic">
                          {" "}
                          (2 products)
                        </span>
                  </div>

                  <div className="mt-5">
                    {/* //! Description */}
                    <div className="w-[90%] text-[#343D47] text-[1rem]">
                      {productObject.desc}
                    </div>

                    {/* //! Price */}
                    <div className="relative mt-2.5 font-bold text-[#343D47] text-[2rem]">
                      <span className="text-[#C9CACB] font-normal">$</span>
                      <span>{productObject.price}</span>
                      <span className="absolute bottom-2 text-[0.8rem] text-black ml-1.5">
                        (1 day rent fee)
                      </span>
                    </div>
                    
                  </div>

                  {/* //* Date */}
                  <div className="mt-3.5 mr-[110px]">
                    <span className="text-[#343D47] font-semibold text-[1.2rem]">
                      Duration
                    </span>
                    <div className=" flex items-center mt-2.5">
                      <div className=" flex border border-solid border-[#343D47] p-1.5 rounded-full">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="Start Date"
                          dateFormat="dd/MM/yyyy"
                          minDate={today}
                          customInput={
                            <input className="w-[110px] h-[30px] p-2 text-center text-[0.8rem] border-white" />
                          }
                        />
                        <img src={IconVector} alt="#" />
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="End Date"
                          dateFormat="dd/MM/yyyy"
                          minDate={startDate}
                          customInput={
                            <input className=" w-[110px] h-[30px] p-2 text-center text-[0.8rem]" />
                          }
                        />
                      </div>

                      <div className="border border-solid border-[#343D47] w-[152px] h-0 mx-5"></div>

                      {/* Hiển thị số ngày đã chọn */}
                      {
                        <div className="text-[#343D47] font-semibold text-[1rem]">
                          {calculateDaysDifference(startDate, endDate)} days
                        </div>
                      }
                    </div>
                  </div>



                </div>
                }
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
