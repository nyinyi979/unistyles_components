import { createStyleSheet } from "react-native-unistyles";

export default function Switch(){

}

const styleSheet = createStyleSheet((theme)=>({
    'primary':{

    },
    'black':{
        backgroundColor: theme.color['white'],
        circleColor: theme.color['darkGray'],
        unactiveColor: theme.color['black'],
        disabledColor: theme.color['lightGray']
    }
}))