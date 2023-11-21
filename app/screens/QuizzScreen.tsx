import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Button, FlatList, StyleSheet, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Text } from "app/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import testData from "../api/request.json"
import { formatTimeCompact } from "app/helpers/time"

import { ListFooter, ListHeader, RenderItem, Question } from "app/components/quizz_components"

interface QuizzScreenProps extends AppStackScreenProps<"Quizz"> {}

export const QuizzScreen: FC<QuizzScreenProps> = observer(function QuizzScreen() {
  const insets = useSafeAreaInsets()
  const [quizzStarted, setQuizzStarted] = useState(false)
  const [quizFinished, setQuizFinished] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(testData.questions.length).fill(null),
  )
  const [isLoading, setIsLoading] = useState(false)

  const quizzStartHandler = async () => {
    setIsLoading(true)
    setQuizzStarted(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }
  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    const updatedAnswers = selectedAnswers.map((answer, index) => {
      if (index === questionIndex) {
        return optionIndex
      }

      return answer
    })
    setSelectedAnswers(updatedAnswers)
  }

  const backToStartHandler = () => {
    setQuizzStarted(false)
    setQuizFinished(false)
    setSelectedAnswers(new Array(testData.questions.length).fill(null))
  }

  const finishHandler = async () => {
    setQuizFinished(true)
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const ListHeaderComponent = () => (
    <ListHeader
      testData={testData}
      quizzStarted={quizzStarted}
      quizFinished={quizFinished}
      setQuizFinished={setQuizFinished}
    />
  )

  const ListFooterComponent = () => (
    <ListFooter
      quizFinished={quizFinished}
      backToStartHandler={backToStartHandler}
      testData={testData}
      selectedAnswers={selectedAnswers}
      finishHandler={finishHandler}
    />
  )

  const renderItem = (renderItemData: { item: Question; index: number }) => (
    <RenderItem
      renderItemData={renderItemData}
      quizFinished={quizFinished}
      selectedAnswers={selectedAnswers}
      selectAnswer={selectAnswer}
    />
  )

  return (
    <View style={styles.container}>
      {!quizzStarted ? (
        <View style={styles.startContainer}>
          <Text>{testData.testInfo.title}</Text>
          <Text>{testData.questions.length} questions</Text>
          <Text>Time Limit: {formatTimeCompact(testData.testInfo.timeLimit)}</Text>
          <Button title="Start quizz" onPress={quizzStartHandler} />
        </View>
      ) : isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={testData.questions}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
          style={{ paddingTop: insets.top }}
          contentContainerStyle={{ paddingBottom: insets.top * 2 }}
        />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  startContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
})
