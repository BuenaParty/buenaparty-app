import React, { useState, useEffect } from 'react'
import Background from '../components/Background';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';
import styles from '../../assets/styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import EventBoxDark from '../components/EventBoxDark';
import GradientButtonL from '../components/GradientButtonL';
import Images from '../components/Images';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

type FeedProps = {
    navigation: StackNavigationProp<any>;
    route: {
        params: {
            eventName: string;
        };
    };
};

const { width, height } = Dimensions.get('screen')
const baseTextSize = 25;
const textSize = (screen.width * 0.3 * baseTextSize) / 100;

const Feed: React.FC<FeedProps> = ({ navigation, route }) => {


    const { params } = useRoute();
    const eventName = params && 'eventName' in params ? params.eventName : 'Carregando...'

    const [posts, setPosts] = useState([]); // Array para guardar os posts
    const [caption, setCaption] = useState('');
    const [selectedMedia, setSelectedMedia] = useState(null);

    const handleGoBack = () => {
        navigation.goBack();
      }
    
    // Função para escolher imagem do aparelho
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = 'uri' in result ? result.uri : result.assets[0].uri;
            // Adicionar imagem estado temporário
            setSelectedMedia({ type: 'image', uri });
            setCaption('');
        }
    };

    // Função para escolher video do aparelho
    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });

        if (!result.canceled) {
            const uri = 'uri' in result ? result.uri : result.assets[0].uri;
            //Adicionar video ao array
            setSelectedMedia({ type: 'video', uri });
            setCaption('');
        }
    };

    //Função para renderizar os ítens na Lista
    const renderPost = ({ item }) => (
        <View style={style.postContainer}>
            {item.type === 'image' ? (
                <Image source={{ uri: item.uri }} style={style.postImage} />
            ) : (
                <Text>Video: {item.uri}</Text>
            )}
            <Text>{item.caption}</Text>
        </View>
    );

    const handleSend = () => {
        if (selectedMedia) {
            setPosts([...posts, { ...selectedMedia, caption }]);
            setSelectedMedia(null);
            setCaption('');
        }
    };

    return (
        <Background colors={[]}>
            <SafeAreaView style={style.main}>
                <View style={style.headerContainer}>
                    <View style={style.boxImage}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Images style={style.back} iconSource={require('../../assets/icons/back.png')} />
                        </TouchableOpacity>
                        <View style={style.LogoContainer}>
                            <Images style={style.LogoBranca} iconSource={require('../../assets/icons/LogoBranco.png')} />
                        </View>
                    </View>
                    <View style={style.feedName}>
                        <Text style={style.text}>{typeof eventName === 'string' ? eventName : 'Carregando...'}</Text>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {selectedMedia && (
                        <View style={style.postContainer}>
                            {selectedMedia.type === 'image' ? (
                                <Image source={{ uri: selectedMedia.uri }} style={style.postImage} />
                            ) : (
                                <Text>Video: {selectedMedia.uri}</Text>
                            )}
                            <Text>{caption}</Text>
                        </View>
                    )}

                </ScrollView>
                <View style={style.bottomBar}>
                    <TouchableOpacity onPress={pickImage} style={style.bottomBarButton}>
                        <Images style={style.bottomBarIcon} iconSource={require('../../assets/icons/image.png')} />
                    </TouchableOpacity>
                    <TextInput
                        style={style.captionInput}
                        placeholder='Escolha uma legenda...'
                        value={caption}
                        onChangeText={(text) => setCaption(text)}
                    />
                    <TouchableOpacity onPress={pickVideo} style={style.bottomBarButton}>
                        <Images style={style.bottomBarIcon} iconSource={require('../../assets/icons/video.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSend}
                        style={style.bottomBarButton}
                    >
                        <Text style={style.bottomBarText}>Send</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </Background>
    )
}
const style = StyleSheet.create({
    boxImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        flex: 0.3,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    LogoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
    },
    LogoBranca: {
        width: width / 4,
        height: width / 4,
        alignItems: 'center',
        marginRight: width / 6,

    },
    back: {
        width: width / 6,
        height: width / 6,

    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        overflow: 'hidden'
    },
    text: {
        color: 'white',
        fontSize: textSize,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    qrCodeBox: {
        flex: 1
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        color: 'white',
        textAlign: 'center'
    },
    postContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    postImage: {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'white',
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomBarButton: {
        padding: 10,
    },
    bottomBarIcon: {
        width: 30,
        height: 30,
    },
    captionInput: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        borderColor: 'white',
        color: 'white',
    },
    bottomBarText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    feedName: {
        marginTop: 20,
    }
});
export default Feed;