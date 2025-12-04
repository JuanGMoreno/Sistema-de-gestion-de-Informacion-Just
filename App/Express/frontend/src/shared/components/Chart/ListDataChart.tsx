import { useEffect, useState } from "react";
import { Chart, useChart } from "@chakra-ui/charts"
import { Cell, Pie, PieChart } from "recharts"
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";



function ListDataChart() {
    const [dataChart, setDataChart] = useState<any[]>([]);

    // Tamaños responsivos para el gráfico
    const chartSize = useBreakpointValue({ base: 280, sm: 320, md: 400, lg: 450 });
    const outerRadius = useBreakpointValue({ base: 70, sm: 110, md: 140, lg: 160 });


    const getData = async () => {
        const response = await fetch('http://localhost:3000/graficos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        const colors = ["blue.solid", "orange.solid", "green.solid", "pink.solid"];

        const chartData = Object.entries(data).map(([key, value], index) => ({
            name: key,
            value: value,
            color: colors[index % colors.length],
        }));

        setDataChart(chartData);
    };

    useEffect(() => {
        getData();
    }, []);

    const chart = useChart({
        data: dataChart,
    })

    return (
        <Box 
            marginTop={{ base: "0.5rem", md: "1rem" }}
            padding={{ base: "0.5rem", md: "1rem" }}
        >
            <Box 
                mb={{ base: "5", md: "7" }} 
                display="flex" 
                justifyContent="start" 
                pl={{ base: "2", md: "4" }}
                pr={{ base: "2", md: "0" }}
                flexDirection="column"
            >
                <Text 
                    fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
                    fontWeight="bold"
                >
                    Distribución de Datos
                </Text>
                <Text 
                    fontSize={{ base: "sm", md: "md" }} 
                    color="gray.500" 
                    mt="2"
                >
                    Distribución de proyectos según su estado actual
                </Text>
            </Box>
            <Box 
                padding={{ base: "0.5rem", md: "1rem" }} 
                margin={{ base: "0", md: "1rem" }} 
                animation="fade-in 0.5s"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Chart.Root 
                    boxSize={chartSize}
                    width={{ base: "100%", md: "auto" }}
                    maxWidth="100%"
                    chart={chart}
                >
                    <PieChart>
                        <Pie
                            isAnimationActive={false}
                            data={chart.data}
                            dataKey={chart.key("value")}
                            outerRadius={outerRadius}
                            innerRadius={0}
                            labelLine={false}
                            label={({ name, index }) => {
                                const { value } = chart.data[index ?? -1]
                                const percent = value / chart.getTotal("value")
                                return `${name}: ${(percent * 100).toFixed(1)}%`
                            }}
                        >
                            {chart.data.map((item) => {
                                return <Cell key={item.name} fill={chart.color(item.color)} />
                            })}
                        </Pie>
                    </PieChart>
                </Chart.Root>
            </Box>

        </Box>
    )


}

export default ListDataChart;