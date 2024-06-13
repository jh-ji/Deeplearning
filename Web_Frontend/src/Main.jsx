import React, { useEffect, useState } from 'react';
import Card from './Card';

function Main() {
    const [congestion,setCongestion]=useState('');
    const [peopleNum,setPeopleNum]=useState(0);
    useEffect(() => {
        // WebSocket 연결 생성
        const ws = new WebSocket('ws://3.38.231.37:3002');

        // 연결이 열릴 때 실행
        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = async (event) => {
            const data = event.data;
            setPeopleNum(data);
          };

        // 연결이 닫힐 때 실행
        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        // 컴포넌트 언마운트 시 연결 종료
        return () => {
            ws.close();
        };
    }, []);
    
    useEffect(() => {
        if(peopleNum<3) setCongestion('매우낮음');
        else if(peopleNum<5) setCongestion('낮음');
        else if(peopleNum<7) setCongestion('보통');
        else if(peopleNum<10) setCongestion('높음');
        else setCongestion('매우높음');
    }, [peopleNum]);
    return (
        <div>
            <h1 style={{color:'white'}}>2024-1 DeepLearning Project-인원혼잡도관제시스템</h1>
            <h1 style={{color:'white'}}>장소목록</h1>
              <Card
                 address={'3공학관 19122호'}
                 peopleNum={peopleNum}
                 congestion={congestion}
                 />
                  <Card
                 address={'장소추가가능'}
                 congestion={0}
                 />
        </div>
    );
}


export default Main;