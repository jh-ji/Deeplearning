import React, { useEffect, useState } from 'react';

function Congestionview() {
    const [imageData, setImageData] = useState(false);
    const [base64Image, setBase64Image] = useState('');
    const [peopleNum,setPeopleNum]=useState(0);
    const [congestion,setCongestion]=useState('');
    useEffect(() => {
        // WebSocket 연결 생성
        const ws = new WebSocket('ws://127.0.0.1:3001');

        // 연결이 열릴 때 실행
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = async (event) => {
            const blob = event.data;
           
            setBase64Image("data:image/jpeg;base64,"+blob);
           
            setImageData(true);
          };

        // 연결이 닫힐 때 실행
        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        const ws2 = new WebSocket('ws://127.0.0.1:3002');

        // 연결이 열릴 때 실행
        ws2.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws2.onmessage = async (event) => {
            const data = event.data;
           //console.log(data);
           setPeopleNum(data);
          };

        // 연결이 닫힐 때 실행
        ws2.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
        // 컴포넌트 언마운트 시 연결 종료
        return () => {
            ws.close();
            ws2.close();
        };
    }, []);

    useEffect(() => {
            if(peopleNum<3) setCongestion('매우낮음');
            else if(peopleNum<5) setCongestion('낮음');
            else if(peopleNum<7) setCongestion('보통');
            else if(peopleNum<10) setCongestion('높음');
            else setCongestion('매우높음');
    }, [base64Image]);
    
    return (
        <div>
           <h1 style={{color:'white'}}>2024-1 DeepLearning Project-인원혼잡도관제시스템</h1>
            {imageData && (
                <img style={{width:'50vw',height:'70vh',borderRadius:'20px',boxShadow: '10px 10px 8px 0 rgba(0, 0, 0, 0.1)'}}src={base64Image} alt="No signal" />
            )}
            {imageData&& (
                <h1 style={{color:'white'}}>모델이 예측한 사람수: {peopleNum}명</h1>
            )}
            {imageData&& (
                <h1 style={{color:'white'}}>혼잡도: {congestion} </h1>
            )}
        </div>
    );
}


export default Congestionview;