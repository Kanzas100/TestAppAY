import { formatTime } from "app/helpers/time"
import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../"

interface ListHeaderProps {
  testData: any
  quizzStarted: boolean
  quizFinished: boolean
  setQuizFinished: (value: React.SetStateAction<boolean>) => void
}

export const ListHeader = (props: ListHeaderProps) => {
  const { testData, quizzStarted, quizFinished, setQuizFinished } = props
  const [timeLeft, setTimeLeft] = useState<number>(testData.testInfo.timeLimit)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (quizzStarted && !quizFinished && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setQuizFinished(true)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [quizzStarted, timeLeft])

  return (
    <View style={styles.container}>
      <Text>{testData.testInfo.title}</Text>
      {!quizFinished && <Text style={{ width: 150 }}>Time Left: {formatTime(timeLeft)}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
})
