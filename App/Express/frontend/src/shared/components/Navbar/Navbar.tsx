import { Box, Text, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"

interface NavbarProps {
    onSectionChange: (section: 'projects' | 'analysis' | 'charts') => void;
}

function Navbar({ onSectionChange }: NavbarProps) {
    const bgColor = useColorModeValue("blue.500", "gray.800")
    const textColor = useColorModeValue("white", "gray.100")
    const buttonBg = useColorModeValue("blue.600", "gray.700")
    const buttonHoverBg = useColorModeValue("blue.700", "gray.600")
    const buttonTextColor = useColorModeValue("white", "gray.100")

    return (
        <Box 
            as="nav" 
            padding={{ base: "0.75rem 1rem", md: "1rem" }} 
            bg={bgColor} 
            color={textColor} 
            position="sticky" 
            top="0" 
            zIndex="1000"
            boxShadow="sm"
        >
            <Flex 
                justify="space-between" 
                align="center"
                direction={{ base: "column", md: "row" }}
                gap={{ base: "3", md: "0" }}
            >
                <Text 
                    fontSize={{ base: "lg", md: "xl" }} 
                    fontWeight="bold"
                    textAlign={{ base: "center", md: "left" }}
                    width={{ base: "100%", md: "auto" }}
                >
                    Gestion de Proyectos
                </Text>
                
                <Flex 
                    align="center" 
                    gap={{ base: "2", md: "4" }}
                    direction={{ base: "column", sm: "row" }}
                    width={{ base: "100%", md: "auto" }}
                    justify={{ base: "center", md: "flex-end" }}
                >
                    <ButtonGroup 
                        width={{ base: "100%", sm: "auto" }}
                        display="flex"
                        flexDirection={{ base: "column", sm: "row" }}
                        gap={{ base: "2", sm: "1" }}
                    >
                        <Button 
                            variant="solid" 
                            bg={buttonBg} 
                            color={buttonTextColor}
                            _hover={{ bg: buttonHoverBg }}
                            onClick={() => onSectionChange('projects')}
                            size={{ base: "sm", md: "md" }}
                            width={{ base: "100%", sm: "auto" }}
                        >
                            Proyectos
                        </Button>
                        <Button 
                            variant="solid" 
                            bg={buttonBg} 
                            color={buttonTextColor}
                            _hover={{ bg: buttonHoverBg }}
                            onClick={() => onSectionChange('analysis')}
                            size={{ base: "sm", md: "md" }}
                            width={{ base: "100%", sm: "auto" }}
                        >
                            Analisis
                        </Button>
                        <Button 
                            variant="solid" 
                            bg={buttonBg} 
                            color={buttonTextColor}
                            _hover={{ bg: buttonHoverBg }}
                            onClick={() => onSectionChange('charts')}
                            size={{ base: "sm", md: "md" }}
                            width={{ base: "100%", sm: "auto" }}
                        >
                            Graficos
                        </Button>
                    </ButtonGroup>
                    <ColorModeButton />
                </Flex>
            </Flex>
        </Box>
    )
}


export default Navbar