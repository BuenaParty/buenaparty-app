import React from 'react';
import { Text } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../assets/styles/styles';

const GradientText = (props: any) => {
    return (
        <MaskedView 
            maskElement={<Text {...props} />}
        >
            <LinearGradient
                colors={["#A12577", "#42286C"]}
            >
                <Text {...props} style={[props.style, {opacity: 0}]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;