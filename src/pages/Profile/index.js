import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AvatarSocial from 'react-native-avatar-social';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
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
  ContainerEdit,
  Button,
  Icon,
} from './styles';

import Loading from '../../components/Loading';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [photoProfile, setPhotoProfile] = useState('');

  const { currentUser } = auth();

  const navigation = useNavigation();

  useEffect(() => {
    getPerson();
    imageUserProfile();
  }, [currentUser, setPhotoProfile]);

  async function getPerson() {
    try {
      const dataKey = '@medic:user';

      const dados = JSON.parse(await AsyncStorage.getItem(dataKey));

      setData(dados);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function imageUserProfile() {
    setIsLoading(false);

    try {
      storage()
        .ref(`/profile/${currentUser.uid}`)
        .getDownloadURL()
        .then(url => {
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
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar');
        return;
      } else {
        const data = response.assets.map(item => {
          return {
            uri: item.uri,
            type: item.type,
          };
        });

        const { uri, type } = data[0];
        uploadImage(uri, type);
      }
    });
  };

  async function uploadImage(uri, type) {
    let imgUri = uri;

    const uploadUri =
      Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;

    storage()
      .ref(`/profile/${currentUser.uid}`)
      .putFile(uploadUri, { contentType: type })
      .then(() => {
        Alert.alert('Sucesso', 'Avatar atualizado!');
        imageUserProfile();
      })
      .catch(e => console.log('uploading image error => ', e));
  }

  function handleNavigateToEditProfile() {
    navigation.navigate('EditProfile', {
      data,
    });
  }

  return (
    <>
      {isLoading === false ? (
        <Loading title={'Carregando perfil ...'} />
      ) : (
        <Container>
          <ContainerProfile>
            <ProfilePhoto>
              <ContainerEdit>
                <Title>Meu perfil</Title>

                <Button onPress={handleNavigateToEditProfile}>
                  <Icon name={'edit'} />
                </Button>
              </ContainerEdit>

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
