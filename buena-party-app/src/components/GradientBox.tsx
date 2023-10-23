import React, { ReactNode, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Text,
    Image,
} from 'react-native';
import styles from '../../assets/styles/styles';


interface GradientBoxProps {
    colors: string[];
    children?: ReactNode;
    iconSource: { uri: string } | number;
};

const GradientBox: React.FC<GradientBoxProps> = ({ colors, children, iconSource }) => {


    return (
        
        <LinearGradient 
            colors={["#A12577", "#42286C"]}
            style={[styles.formBoxBorder]}
        >

            <View style={styles.formBox}>
                <Image  
                    style={styles.imageFormBox}
                    source={iconSource}
                />
                {children}
            </View>
        </LinearGradient>
    );
};

export default GradientBox;