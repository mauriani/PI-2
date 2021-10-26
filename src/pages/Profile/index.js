import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import AvatarSocial from 'react-native-avatar-social';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  ContainerProfile,
  ProfilePhoto,
  UserAvatarButton,
  Title,
  Informations,
  InformationsText,
  InformationsSub,
} from './styles';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [photoProfile, setPhotoProfile] = useState('');

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  async function getPerson() {
    setLoading(false);

    const dataKey = '@medic:user';

    const dados = JSON.parse(await AsyncStorage.getItem(dataKey));

    if (dados.photo === '') {
      setPhotoProfile(`https://ui-avatars.com/api/?name=${dados.name}`);
    }

    setData(dados);
    setLoading(true);
  }

  useLayoutEffect(() => {
    getPerson();
  }, []);

  const handleSelectPhoto = () => {
    const options = {
      title: 'Selecione um avatar',
      takePhotoButtonTitle: 'Usar camera',
      chooseFromLibraryButtonTitle: 'Escolha da galeria',
      cancelButtonTitle: 'Cancelar',
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      mediaType: 'photo',
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, response => {
      const data = response.assets.map(item => {
        return {
          uri: item.uri,
          type: item.type,
          base64: item.base64,
        };
      });

      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar');
        return;
      }

      setImage(data[0].uri);
      uploadImage();
    });
  };

  const uploadImage = async () => {
    const uri = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    console.log(uploadUri);

    setUploading(true);
    setTransferred(0);
  };

  return (
    <>
      <Container>
        <ContainerProfile>
          <ProfilePhoto>
            <Title>Meu perfil</Title>
            <UserAvatarButton onPress={handleSelectPhoto}>
              <AvatarSocial
                dim={180}
                image={{
                  uri: photoProfile,
                }}
                type="image"
                isStatus={true}
                isIcon={true}
                icon={'camera'}
                iconSize={28}
                iconColor="#ffbc43"
                badgeText={100}
                badgeColor="#ffffff"
                badgeBackground="#303030"
                positionStatus="left"
              />
            </UserAvatarButton>
          </ProfilePhoto>
        </ContainerProfile>

        <Informations>
          <InformationsText>Nome</InformationsText>
          <InformationsSub>{data.name}</InformationsSub>
          <InformationsText>Email</InformationsText>
          <InformationsSub>{data.email}</InformationsSub>
          <InformationsText>Profissão</InformationsText>
          <InformationsSub>{data.profession}</InformationsSub>
        </Informations>
      </Container>
    </>
  );
}
