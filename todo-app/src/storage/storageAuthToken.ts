import { tokenDTO } from '@dtos/tokenDTO';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE } from '@storage/storageConfig';

export async function storageAuthTokenSave({ accessToken}: tokenDTO) {
  await AsyncStorage.setItem(AUTH_STORAGE, JSON.stringify({ accessToken }));
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_STORAGE);

  const { accessToken }: tokenDTO = response ? JSON.parse(response) : {}

  return { accessToken };
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}