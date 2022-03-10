import { useCallback, useContext, useEffect, useReducer, useState } from "react";

import { randomFloat } from "@lib/random";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import Line from "@components/Line";
import { shuffleArray } from "@lib/array";

const BubbleSort = () => {
    const [isRunning, setIsRunning] = useState(false);

    const [isRandom, setIsRandom] = useState(false);
    const [size, setSize] = useState(130);

    const initArray = useCallback((min: number = 5) => {
        const arr: number[] = [];

        if (isRandom) {
            for (let i = 0; i < size; i++) {
                arr.push(+randomFloat(min, 100).toFixed(2));
            }

            return arr;
        }

        for (let i = 0; i < size; i++) {
            arr.push(+(100 - i * (100 - min) / (size - 1)).toFixed(2));
        }
        return shuffleArray(arr);
    }, [isRandom, size]);

    const [heights, setHeights] = useState<number[]>(() => initArray());

    const reset = (min: number = 5) => {
        setHeights(initArray(min));
    }

    const handleStart = () => {
        let arr = [...heights];

        let len = arr.length;
        let checked = false;
        do {
            checked = false;
            for (let i = 0; i < len; i++) {
                if (arr[i] > arr[i + 1]) {
                    let tmp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = tmp;

                    checked = true;
                }
            }
        } while (checked);
        setHeights(arr);
    }

    return (
        <Stack
            flex={1}
            direction='column'
            spacing={8}
            p={6}
            maxW="100%">
            <Stack
                direction='row'
                align='flex-end'
                justify='space-between'
                spacing={0}
                h="100%"
                w="100%">
                {
                    heights.map((height, i) => (
                        <Line key={i} isActive={false} style={{
                            height: `${height}%`,
                        }} />
                    ))
                }
            </Stack>
            <Stack direction={'row'}>
                <Button
                    onClick={() => handleStart()}
                >
                    Start Sort
                </Button>
                <Button
                    onClick={() => reset()}
                >
                    Reset
                </Button>
            </Stack>
        </Stack>
    )
}

export default BubbleSort