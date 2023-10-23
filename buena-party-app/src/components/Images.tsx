import {View, Image,ImageStyle,StyleSheet, ViewStyle} from 'react-native';
import React from 'react';




interface LogoProps {
   style?:ImageStyle;
   iconSource: { uri: string } | number;
}

const Images: React.FC<LogoProps> = ({style, iconSource}) => {
    return (
        <Image style={[style]} source={iconSource}/>
    );
};
const styles = StyleSheet.create({ 
    
})

export default Images;