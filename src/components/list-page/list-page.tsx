// @ts-nocheck
import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./list-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import { nanoid } from "nanoid";

export type TArrElement = {
  letter: number | null;
  state: ElementStates;
  head: string;
  tail: string;
  isSmall: boolean;
  id: number | null;

}

export const ListPage: React.FC = () => {
  const arrElement: TArrElement = {
    letter: null,
    state: ElementStates.Default,
    head: "",
    tail: "",
    isSmall: false,
    id: null,
  }
  
  const generateRandomArray = () => {
    const array = [];
    for (let i = 0; i <= 3; i++) {
      const arrayNumbers = Math.floor(Math.random() * 100);
      array.push({
        letter: arrayNumbers,
        state: ElementStates.Default,
        head: "",
        tail: "",
        isSmall: false,
        id: null,
      })
    }
    return array
  }

  const [inputValue, setInputValue] = useState<number>()
  const [inputIndex, setInputIndex] = useState<number>()
  const [listArray, setListArray] = useState<TArrElement[]>([...generateRandomArray()])

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(+e.target.value)
  }
  const onChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(+e.target.value)
  }


  const timer = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(null)
      }, 500)
    })
  }

  const addToHead = async () => {
    listArray[0].head = <Circle
    letter={inputValue}
    state={ElementStates.Changing}
    isSmall={true}/>
    setListArray([...listArray]);
    await timer()
    arrElement.letter = inputValue        
    inputValue && listArray.unshift(arrElement);
    listArray[0].state = ElementStates.Modified
    listArray[0].head = "head"
    listArray[1].head = ""
    setListArray([...listArray]);
    await timer()
    listArray[0].state = ElementStates.Default        
    setListArray([...listArray]);
  }

  const addToTail = async () => {
    listArray[listArray.length - 1].tail = <Circle
    letter={inputValue}
    state={ElementStates.Changing}
    isSmall={true}/>
    setListArray([...listArray]);
    await timer()
    arrElement.letter = inputValue
    inputValue && listArray.push(arrElement);
    listArray[listArray.length - 1].state = ElementStates.Modified
    listArray[listArray.length - 1].tail = "tail"
    listArray[listArray.length - 2].tail = ""
    setListArray([...listArray]);
    await timer()
    listArray[listArray.length - 1].state = ElementStates.Default        
    setListArray([...listArray]);
  }

  const removeFromHead = async () => {
    listArray[0].head = <Circle
    letter={listArray[0].letter}
    state={ElementStates.Changing}
    isSmall={true}/>
    listArray[0].letter = null
    setListArray([...listArray]);
    await timer()
    listArray.shift();
    setListArray([...listArray]);
  }

  const removeFromTail = async () => {
    listArray[listArray.length - 1].tail = <Circle
    letter={listArray[listArray.length - 1].letter}
    state={ElementStates.Changing}
    isSmall={true}/>
    listArray[listArray.length - 1].letter = null
    setListArray([...listArray]);
    await timer()
    listArray.pop();
    setListArray([...listArray]);
  }

  const addByIndex = async () => {
    
    listArray[inputIndex].head = <Circle
    letter={inputValue}
    state={ElementStates.Changing}
    isSmall={true}/>
    setListArray([...listArray]);
    await timer()
    arrElement.letter = inputValue
    inputIndex && listArray.splice(inputIndex, 0, arrElement);
    listArray[inputIndex + 1].head = ""
    listArray[inputIndex].state = ElementStates.Modified
    setListArray([...listArray]);
    await timer()
    listArray[inputIndex].state = ElementStates.Default
    setListArray([...listArray]);
  }

  const removeByIndex = async () => {
    listArray[inputIndex].tail = <Circle
    letter={listArray[inputIndex].letter}
    state={ElementStates.Changing}
    isSmall={true}/>
    setListArray([...listArray]);
    listArray[inputIndex].letter = null
    await timer()    
    listArray.splice(inputIndex, 1);
    setListArray([...listArray]);
  }

  useEffect(() => {
    generateRandomArray()
  }, [])
  
  console.log(Math.floor(Math.random() * 100));
  
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__controls}>
        <Input
          onChange={onChangeValue}/>
        <div className={styles.list__buttons}>
          <Button
            text="Добавить в head"
            onClick={addToHead}/>
          <Button
            text="Добавить в tail"
            onClick={addToTail}/>
          <Button
            text="Удалить из head"
            onClick={removeFromHead}/>
          <Button
            text="Удалить из tail"
            onClick={removeFromTail}/>
        </div>
      </div>
      <div className={styles.list__controls}>
        <Input
          onChange={onChangeIndex}/>
        <Button
          text="Добавить по индексу"
          onClick={addByIndex}/>
        <Button
          text="Удалить по индексу"
          onClick={removeByIndex}/>
      </div>
      <div className={styles.circle__container}>
        {listArray.map((item, index) => {
          return (
            <>
              <Circle
                key={index}
                letter={item.letter}
                index={index}
                state={item.state}
                head={item.head}
                tail={item.tail}
                isSmall={item.isSmall}/>
              <ArrowIcon
              key={nanoid()}/>
            </>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
