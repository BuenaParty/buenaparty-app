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
    data: { id: string; nome: string; e_mail: string; telefone: string };
};

const GuestsBox: React.FC<GuestsBoxProps> = ({ data }) => {
    
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
          <LinearGradient
            style={styles.background}
            colors={["#A12577", "#42286C"]}
          >
            <TouchableOpacity onPress={toggleExpand}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {data.nome}
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
                      {data.e_mail}
                    </Text>
                    <Text style={styles.headerTextExpanded}>
                      {data.telefone}
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