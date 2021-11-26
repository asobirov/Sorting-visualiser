import type { NextPage } from 'next'
import { TLine } from '@lib/types';

import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Stack, Text, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'

import { mergeSort } from '../algorithms/mergeSort';
import { insertionSort } from '../algorithms/insertionSort';
import Line from '../components/Line';


const Home: NextPage = () => {
  const [array, setArray] = useState<TLine[]>([]);
  const [length, setLength] = useState<number>(30);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [steps, setSteps] = useState<number>(0);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const resetArray = useCallback(() => {
    const array: TLine[] = Array.from({ length: length }, (_, i) => {
      return {
        length: getRandomInt(1, 100),
        isActive: false,
      }
    });
    setArray(array);
    setTotalSteps(0);
    setSteps(0);
    setIsSorting(false);
  }, [length]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleLengthChange = (value: number) => {
    setLength(value);
    resetArray();
  }

  const handleMergeSort = () => {
    // setArray(mergeSort(array));
  }
  const handleInsertionSort = () => {
    setIsSorting(true);
    const { replay, sortedArr } = insertionSort(array);
    setTotalSteps(replay.length);
    let i = 0;
    var interval = setInterval(() => {
      if (i >= replay.length - 1 || !replay.length) {
        clearInterval(interval);
        setIsSorting(false);
      }
      let arr = [...array];

      /**
       * Set lines as active
       */
      const [firstIdx, secondIdx] = replay[i];
      arr[firstIdx].isActive = true;
      arr[secondIdx].isActive = true;

      /**
       * Swap lines lengths
       */
      let temp = arr[firstIdx].length;
      arr[firstIdx].length = arr[secondIdx].length;
      arr[secondIdx].length = temp;
      setArray(arr);
      setSteps(prev => prev + 1);
      setTimeout(() => {
        arr[firstIdx].isActive = false;
        arr[secondIdx].isActive = false;
        setArray(arr);
      });
      i++;
    });
  }

  return (
    <Stack
      flex={1}
      direction='column'
      spacing={8}
      p={6}
      maxW="100%"
    >
      <Stack
        direction='row'
        align='flex-end'
        justify='space-between'
        spacing={0}
        h="100%"
        w="100%"
      >
        {array.map((line, key) => <Line key={key} length={line.length} isActive={line.isActive} />)}
      </Stack>
      <Stack direction='row' justify='space-between' spacing={32}>
        <Stack flex={1}>
          <Text>{steps} out of {totalSteps} steps</Text>

          <Slider
            defaultValue={length}
            max={1000}
            min={20}
            onChangeEnd={(val) => handleLengthChange(val)}
            isDisabled={isSorting}
          >
            <SliderTrack bg="whiteAlpha.100">
              <SliderFilledTrack bg="green.900" />
            </SliderTrack>
            <SliderThumb boxSize={6}>
              <Text color={"black"} fontSize={'0.5rem'} lineHeight={1}>{length}</Text>
            </SliderThumb>
          </Slider>
        </Stack>
        <Stack align='flex-end'>
          <Button
            onClick={() => resetArray()}
            isDisabled={isSorting}
          >
            Reset Array
          </Button>
          <Stack direction='row'>
            <Button
              onClick={() => handleMergeSort()}
              isDisabled={isSorting}
            >
              Merge Sort
            </Button>
            <Button
              onClick={() => handleInsertionSort()}
              isDisabled={isSorting}
            >
              Insertion Sort
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack >
  )
}

export default Home
