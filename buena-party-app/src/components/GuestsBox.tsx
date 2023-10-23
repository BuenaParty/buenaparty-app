import React, { useState, ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import styles from '../../assets/styles/styles';

interface GuestsBoxProps {
    data: { key: string; name: string; email: string; phone: string }[];
};

const GuestsBox: React.FC<GuestsBoxProps> = ({ data }) => {
    
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const guest = data[0];

    return (
        <View style={styles.container}>
          <LinearGradient
            style={styles.background}
            colors={["#A12577", "#42286C"]}
          >
            <TouchableOpacity onPress={toggleExpand}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {guest.name}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
    
          {isExpanded && (
            <View>
              <View style={styles.content}>
                <LinearGradient
                  style={styles.background}
                  colors={["#A12577", "#42286C"]}
                >
                  <View style={styles.headerExpanded}>
                    <Text style={styles.headerTextExpanded}>
                      {guest.email}
                    </Text>
                    <Text style={styles.headerTextExpanded}>
                      {guest.phone}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}
        </View>
      );
    };

export default GuestsBox;