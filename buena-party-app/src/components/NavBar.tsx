import React from 'react'
import { StyleSheet,Dimensions, View, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native'
import Images from '../components/Images';
import styles from '../../assets/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';


interface NavBarProps {
    style?: ViewStyle;
    navigation?: StackNavigationProp<any>;
    onPress: (event: GestureResponderEvent) => void;
};
const{width,height} = Dimensions.get('screen')

const NavBar: React.FC<NavBarProps> = ({ style, navigation, onPress }) => {
    return (
        <View style={[styles.boxImage, style]}>
            <SafeAreaView>
                <TouchableOpacity onPress={onPress}>
                    <Images
                        style={styles.back}
                        iconSource={require('../../assets/icons/back.png')}
                    />
                </TouchableOpacity>
                <Images
                    style={styles.LogoBranca}
                    iconSource={require('../../assets/icons/LogoBranco.png')}
                    
                />
                
            </SafeAreaView>
        </View>

    )
}

export default NavBar;