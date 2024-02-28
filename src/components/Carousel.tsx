import { useState } from 'react';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Box, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0A1E28',
        },
        secondary: {
            main: '#69F58C',
        },
    },
});

export default function Carousel({ children }: any) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const numItems = 20;
    const itemWidth = 300;
    const carouselWidth = numItems * itemWidth;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 5) % numItems);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 5 + numItems) % numItems);
    };

    return (
        <Box sx={{ height: "224px", overflow: "hidden" }}>
            <Box sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100vw",
                height: "224px",
            }}>
                <ThemeProvider theme={theme}>
                    <IconButton onClick={handlePrev} sx={{
                        zIndex: 2,
                        borderRadius: 0,
                        width: 50,
                        height: 50,
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": {
                            bgcolor: "#0A1E28",
                            opacity: 1,
                        },
                    }} color="secondary" size="large">
                        <NavigateBefore />
                    </IconButton>
                    <IconButton onClick={handleNext} sx={{
                        zIndex: 2,
                        borderRadius: 0,
                        width: 50,
                        opacity: 0,
                        transition: "opacity 0.3s",
                        "&:hover": {
                            bgcolor: "#0A1E28",
                            opacity: 1,
                        },
                    }} color="secondary" size="large">
                        <NavigateNext />
                    </IconButton>
                </ThemeProvider>
            </Box>
            <Box paddingX={2}>
                <motion.ul
                    style={{
                        display: "flex",
                        width: `${carouselWidth}px`,
                        transform: `translateX(-${currentIndex * itemWidth}px)`,
                    }}
                    className="flex gap-4"
                >
                    {children}
                </motion.ul>
            </Box>
        </Box>
    );
};
