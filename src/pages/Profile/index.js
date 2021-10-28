import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import AvatarSocial from 'react-native-avatar-social';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';

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

import Loading from '../../components/Loading';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [photoProfile, setPhotoProfile] = useState('');

  const [image, setImage] = useState(null);

  const [imageName, setImageName] = useState('');

  useEffect(() => {
    getPerson();
  }, []);

  useLayoutEffect(() => {
    imageUserProfile();
  }, [data, imageName]);

  async function getPerson() {
    try {
      const dataKey = '@medic:user';

      const dados = JSON.parse(await AsyncStorage.getItem(dataKey));

      const profile = 'profile' + data.id;

      setImageName(profile);
      setData(dados);
    } catch (error) {
      console.log(error);
    }
  }

  async function imageUserProfile() {
    setIsLoading(false);

    const image = 'profile' + data.id;

    try {
      await storage()
        .ref(image) //name in storage in firebase console
        .getDownloadURL()
        .then(url => {
          console.log('URL recebida: ' + url);
          setPhotoProfile(url);
        })
        .catch(
          e => console.log('Erro aqui: ' + e),
          setPhotoProfile(`https://ui-avatars.com/api/?name=${data.name}`),
        );

      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

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
    setIsLoading(false);

    const uri = image;
    const imageName = 'profile' + data.id;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    storage()
      .ref(imageName)
      .putFile(uploadUri)
      .then(snapshot => {
        Alert.alert('Sucesso', 'Avatar atualizado!');
        getPerson();
      })
      .catch(e => console.log('uploading image error => ', e));

    setIsLoading(true);
  };

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando perfil ...'} />
      ) : (
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
      )}
    </>
  );
}
