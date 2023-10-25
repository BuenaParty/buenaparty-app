import { React } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Background = ({ children }) => {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#070624', '#000000', '#070624']} style={styles.container}>
                {children}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    }
});

export default Background;