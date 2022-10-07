import { useEffect, useState } from "react";
import { Text } from "react-native";
import { timeCutting } from "../../util/function";

function SetTime({ timeLimit }) {
    //들어온 시간이 분단위 
    const [leftTime, setLeftTime] = useState(timeLimit*1000*60);
    //ms단위로 변환
    console.log(leftTime)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setLeftTime(current=>current-1000)
        },1000)
        if(setLeftTime<=0){
            clearInterval(interval);
        }
    },[]);


// 기준 시간과의 차이 세팅



    return (
        <>
        <Text>{timeCutting(leftTime)}</Text>
        </>
    );
}

export default SetTime;