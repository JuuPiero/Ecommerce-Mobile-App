import { MD3LightTheme as DefaultTheme } from "react-native-paper"

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#0865fe",  
      secondary: "#03dac6",
      background: "#f5f5f5",
      surface: "#ffffff",
      error: "#B00020",
    },
    roundness: 2, 
};
  
export default theme;