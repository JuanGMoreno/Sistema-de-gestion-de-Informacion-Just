import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

function ShowAnalysis() {
    const [data, setData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const getData = async () => {
        setLoading(true);
        setError("");
        setData("");
        
        try {
            const response = await fetch('http://localhost:3000/analisis', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Error al obtener el análisis');
            }
            
            const result = await response.json();
            setData(result.analysis);
        } catch (error) {
            console.error("Error fetching analysis data:", error);
            setError("Error al generar el análisis. Por favor, intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box 
            p="6" 
            borderWidth="1px" 
            borderRadius="lg" 
            boxShadow="sm"
            bg="white"
            _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
            <Flex 
                direction="column" 
                gap="4"
            >
                <Flex 
                    justify="space-between" 
                    align="center" 
                    flexWrap="wrap" 
                    gap="3"
                >
                    <Text 
                        fontSize="2xl" 
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{ color: "white" }}
                    >
                        Análisis de Proyectos
                    </Text>
                    
                    <Button 
                        onClick={getData}
                        colorScheme="blue"
                        size="md"
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? "Generando..." : "Generar Análisis"}
                    </Button>
                </Flex>

                {loading && (
                    <Box 
                        p="8" 
                        textAlign="center"
                        bg="blue.50"
                        _dark={{ bg: "blue.900" }}
                        borderRadius="md"
                    >
                        <Flex 
                            justify="center" 
                            align="center" 
                            gap="2"
                        >
                            <Text 
                                fontSize="lg" 
                                fontWeight="medium"
                                color="blue.600"
                                _dark={{ color: "blue.200" }}
                            >
                                Generando análisis
                            </Text>
                            <Box
                                as="span"
                                display="inline-block"
                                color="blue.600"
                                _dark={{ color: "blue.200" }}
                                fontSize="lg"
                                fontWeight="bold"
                                animation="pulse 1.5s ease-in-out infinite"
                            >
                                ...
                            </Box>
                        </Flex>
                        <Text 
                            fontSize="sm" 
                            color="gray.600"
                            _dark={{ color: "gray.400" }}
                            mt="2"
                        >
                            Por favor espera, esto puede tardar unos momentos
                        </Text>
                    </Box>
                )}

                {/* Mensaje de error */}
                {error && (
                    <Box 
                        p="4" 
                        bg="red.50"
                        _dark={{ bg: "red.900" }}
                        borderRadius="md"
                        borderLeft="4px solid"
                        borderColor="red.500"
                    >
                        <Text 
                            color="red.700"
                            _dark={{ color: "red.200" }}
                            fontSize="sm"
                        >
                            {error}
                        </Text>
                    </Box>
                )}

                {/* Resultado del análisis */}
                {data && !loading && (
                    <Box 
                        p="5" 
                        bg="gray.50"
                        _dark={{ bg: "gray.700" }}
                        borderRadius="md"
                        borderLeft="4px solid"
                        borderColor="green.500"
                    >
                        <Text 
                            fontSize="md" 
                            color="gray.700"
                            _dark={{ color: "gray.200" }}
                            lineHeight="1.8"
                            whiteSpace="pre-wrap"
                        >
                            {data}
                        </Text>
                    </Box>
                )}

                {/* Mensaje inicial cuando no hay datos */}
                {!data && !loading && !error && (
                    <Box 
                        p="8" 
                        textAlign="center"
                        borderWidth="2px"
                        borderStyle="dashed"
                        borderColor="gray.300"
                        _dark={{ borderColor: "gray.600" }}
                        borderRadius="md"
                    >
                        <Text 
                            color="gray.500"
                            _dark={{ color: "gray.400" }}
                            fontSize="md"
                        >
                            Haz clic en "Generar Análisis" para obtener un análisis detallado de todos tus proyectos
                        </Text>
                    </Box>
                )}
            </Flex>
        </Box>
    );
}

export default ShowAnalysis;