import { Box, Text } from "@chakra-ui/react"
import { TLine } from "@lib/types"

type LineProps = {
    lenght?: number
    [key: string]: any
}

const Line = ({ length, isActive, ...rest }: LineProps) => {
    return (
        <Box
            w='100%'
            minW="1px"
            maxW="3px"
            borderRadius={4}
            height={`${length}%`}
            background={isActive ? "green.400" : "whiteAlpha.500"}
            {...rest}
        >
            {/* <Text fontSize="100%">{length}</Text> */}
        </Box>
    )
}

export default Line
