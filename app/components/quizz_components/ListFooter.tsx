import React from "react"
import { Button, View } from "react-native"
import { Text } from "../"

interface ListFooterProps {
  quizFinished: boolean
  backToStartHandler: () => void
  finishHandler: () => void
  testData: any
  selectedAnswers: any
}

export const ListFooter = (props: ListFooterProps) => {
  const { quizFinished, testData, selectedAnswers, finishHandler, backToStartHandler } = props

  const calculateResults = () => {
    const correctAnswers = selectedAnswers.reduce(
      (total: number, answer: number, index: number) => {
        if (answer === testData.questions[index].correctAnswer) {
          return total + 1
        }
        return total
      },
      0,
    )
    return `${correctAnswers}/${testData.questions.length}`
  }

  if (quizFinished) {
    {
      return (
        <View style={{ alignItems: "center" }}>
          <Text>Results: {calculateResults()} answers are correct</Text>
          <Button title="Back to start" onPress={backToStartHandler} />
        </View>
      )
    }
  } else {
    return <Button title="Finish" onPress={finishHandler} />
  }
}
