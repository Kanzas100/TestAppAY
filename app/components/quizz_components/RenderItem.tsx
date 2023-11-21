import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "../Text"
import BouncyCheckbox from "react-native-bouncy-checkbox"

export type Question = {
  questionText: string
  options: string[]
  correctAnswer: number
}

interface RenderItemProps {
  renderItemData: { item: Question; index: number }
  quizFinished: boolean
  selectedAnswers: any
  selectAnswer: (index: any, optionIndex: any) => void
}

export const RenderItem = (props: RenderItemProps) => {
  const { renderItemData, quizFinished, selectedAnswers, selectAnswer } = props
  const { item, index } = renderItemData
  return (
    <View style={styles.marginVertical}>
      <Text>
        Question {index + 1}: {item.questionText}
      </Text>
      {item.options.map((option, optionIndex) => (
        <View key={optionIndex} style={{ flexDirection: "row", alignItems: "center" }}>
          <BouncyCheckbox
            size={25}
            fillColor={
              quizFinished ? (item.correctAnswer === optionIndex ? "green" : "red") : "grey"
            }
            unfillColor="#FFFFFF"
            text={option}
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={{
              textDecorationLine: "none",
              color: quizFinished ? (item.correctAnswer === optionIndex ? "green" : "red") : "grey",
            }}
            disableBuiltInState
            disabled={quizFinished}
            onPress={() => selectAnswer(index, optionIndex)}
            isChecked={selectedAnswers[index] === optionIndex}
            style={styles.marginVertical}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  marginVertical: {
    marginVertical: 8,
  },
  iconStyle: {
    borderColor: "red",
  },
  innerIconStyle: {
    borderWidth: 2,
  },
})
