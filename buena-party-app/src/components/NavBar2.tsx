import React from 'react'
import { StyleSheet, View, TouchableOpacity, ViewStyle, GestureResponderEvent } from 'react-native'
import Images from '../components/Images';
import styles from '../../assets/styles/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';

interface NavBarProps {
    style?: ViewStyle;
    navigation?: StackNavigationProp<any>;
    onPress: (event: GestureResponderEvent) => void;
}

const NavBar2: React.FC<NavBarProps> = ({ style, navigation, onPress }) => {
    return (
        <View style={[styles.boxImage2, style]}>
            <SafeAreaView>
                <TouchableOpacity onPress={onPress}>
                    <Images
                        style={styles.profile}
                        iconSource={require('../../assets/icons/profile.png')}
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

export default NavBar2;