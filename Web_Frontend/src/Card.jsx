import React, { useState } from "react";
import './Card.css';
import { Navigate, useNavigate } from "react-router-dom";
const Card=(props)=>{
  
  const navigate=useNavigate();
    const address=props.address;
    const peopleNum=props.peopleNum;
    const congestion=props.congestion;
    function gotoview(){
      navigate('/Congestionview',{state : {
      
      }});
      
    }
    
   
  return(
                 <div className="Card" >
                  <br></br>
                   <h2>장소: {address}</h2>
                   <h2 className="con">모델이 예측한 인원수: {peopleNum}명</h2>
                   
                   <h2 className="con2">혼잡도: {congestion}</h2>

                   <button className="viewbutton"onClick={gotoview}>CCTV보기</button>
                   <br></br>
                    
                    
                   
                  
                </div>
  )
};
export default Card;