import { useEffect, useState } from "react";
import { Text } from "react-native";
import { timeCutting } from "../../util/function";

function SetTime({ timeLimit  ,setDisableHandle }) {

    const expire = new Date(timeLimit) - new Date();
    const [leftTime, setLeftTime] = useState(expire);
    useEffect(() => {
        const expire = new Date(timeLimit) - new Date() + new Date().getTimezoneOffset() ** 1000 * 60;
        setLeftTime(expire)
        // console.log(new Date().getTimezoneOffset())
        const interval = setInterval(() => {
            const left = new Date(timeLimit) - new Date() + new Date().getTimezoneOffset() * 1000 * 60;
            setLeftTime(left)
            if (leftTime <= 0) {
                clearInterval(interval);
                setDisableHandle();
            }
        }, 1000)
    }, []);


    // 기준 시간과의 차이 세팅



    return (
        <>
            <Text>{timeLimit}까지 앞으로 {timeCutting(leftTime)}</Text>
        </>
    );
}

export default SetTime;