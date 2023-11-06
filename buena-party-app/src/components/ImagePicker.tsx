import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, ImageSourcePropType } from 'react-native';
import ImagePicker, { launchImageLibrary, ImagePickerResponse, ImageLibraryOptions } from 'react-native-image-picker';

const style = {
  profile: {
    width: 100,
    height: 100,
  },
};

interface ProfileImagePickerState {
  profileImage: ImageSourcePropType | null;
}

class ProfileImagePicker extends Component<{}, ProfileImagePickerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      profileImage: null,
    };
  }

  handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
            // O usuário cancelou a seleção da imagem
          } else if (response.errorCode) {
            // Ocorreu um erro ao selecionar a imagem
            console.log(response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            // A imagem foi selecionada com sucesso
            const selectedImage = response.assets[0];
            this.setState({ profileImage: { uri: selectedImage.uri } });
          }
        });
    };

  render() {
    return (
      <TouchableOpacity onPress={this.handleImagePicker}>
        {this.state.profileImage ? (
          <Image source={this.state.profileImage} style={style.profile} />
        ) : (
          <Text>Deixar em branco para adicionar imagem de perfil</Text>
        )}
      </TouchableOpacity>
    );
  }
}

export default ProfileImagePicker;
