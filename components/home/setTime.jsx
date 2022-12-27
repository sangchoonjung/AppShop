import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import BaseFont from "../../assets/font/base";
import { timeCutting } from "../../util/function";

function SetTime({ timeLimit, setDisableHandle }) {
  const [leftTime, setLeftTime] = useState(new Date(timeLimit) - new Date());
  useEffect(() => {
    if (!timeLimit) { return; }
    const expire = new Date(timeLimit) - new Date() + new Date().getTimezoneOffset() ** 1000 * 60;
    setLeftTime(expire)
    const interval = setInterval(() => {
      const left = new Date(timeLimit) - new Date() + new Date().getTimezoneOffset() * 1000 * 60;
      setLeftTime(left)
      if (leftTime <= 0) {
        clearInterval(interval);
        setDisableHandle();
      }
    }, 1000)
  }, [timeLimit]);
  // 기준 시간과의 차이 세팅
  return (
    <>
      <BaseFont style={styles.fontStyle}>
        Due Date <BaseFont style={{ color: "red" }}>{timeLimit}</BaseFont>
      </BaseFont>

      {(timeCutting(leftTime) ?
        <BaseFont style={styles.fontStyle}>
          Left Time <BaseFont style={{ color: "red" }}>{timeCutting(leftTime)}</BaseFont>
        </BaseFont>
        :
        <BaseFont style={styles.fontStyle}>
          <BaseFont style={{ color: "red" }}>Sold Out!</BaseFont>
        </BaseFont>
      )
      }
    </>
  );
}
const styles = StyleSheet.create({
  fontStyle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold"
  }
})

export default SetTime;