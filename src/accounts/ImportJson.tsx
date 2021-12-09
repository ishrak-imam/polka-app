import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from 'components/Layout';
import Identicon from '@polkadot/reactnative-identicon/';
import {
  Caption,
  Padder,
  List,
  Button,
  View,
  TextInput,
  useTheme,
} from 'rnpaper';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useAccounts} from 'context/Accounts';
import {useNetwork} from 'context/Network';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {myAccounts} from 'navigation/routeKeys';

function tryParseJson(json: string) {
  try {
    return JSON.parse(json);
  } catch (_) {
    return undefined;
  }
}

async function pickFile() {
  let res: DocumentPickerResponse[] | undefined;
  try {
    res = await DocumentPicker.pick({type: DocumentPicker.types.allFiles});
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      return;
    } else {
      throw err;
    }
  }

  if (res) {
    const pickedFile = res[0];
    if (!pickedFile) {
      throw new Error('No file selected');
    }
    if (pickedFile.type !== 'application/json') {
      throw new Error('File is not json');
    }

    const file = await RNFS.readFile(pickedFile.uri, 'utf8');
    return file;
  }
}

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function ImportJson({navigation}: ScreenProps) {
  const {currentNetwork} = useNetwork();
  const {restoreAccount} = useAccounts();
  const {colors} = useTheme();
  const [jsonContent, setJsonContent] = React.useState<string>();
  const parsedJson = jsonContent ? tryParseJson(jsonContent) : undefined;

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [password, setPassword] = React.useState('');

  const isDisabled = !jsonContent || !password;

  const onSubmit = () => {
    restoreAccount({
      json: parsedJson,
      password,
      network: currentNetwork.key,
      isExternal: false,
      isFavorite: false,
    });
    navigation.navigate(myAccounts);
  };

  return (
    <Layout style={styles.layout}>
      <Caption>
        {
          'Supply a backed-up JSON file, encrypted with your account-specific password.'
        }
      </Caption>
      <Padder scale={0.5} />
      <View style={styles.filePicker}>
        {parsedJson ? (
          <List.Item
            title={<Caption>{parsedJson.meta.name}</Caption>}
            left={() => (
              <View style={styles.justifyCenter}>
                <Identicon value={parsedJson.address} size={40} />
              </View>
            )}
            description={parsedJson.address}
          />
        ) : (
          <>
            <Button
              mode="outlined"
              onPress={() =>
                pickFile()
                  .then(setJsonContent)
                  .catch((_: Error) => {
                    setJsonContent(undefined);
                  })
              }>
              <Caption>Pick the json file</Caption>
            </Button>
            <Padder scale={1} />
          </>
        )}
      </View>
      <TextInput
        secureTextEntry={!isPasswordVisible}
        label={'Password'}
        value={password}
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            name={`${isPasswordVisible ? 'eye' : 'eye-off'}-outline`}
            color={colors.disabled}
          />
        }
        mode="outlined"
      />
      <Padder scale={3} />
      <Button disabled={isDisabled} mode="outlined" onPress={onSubmit}>
        Restore Account
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  filePicker: {
    height: 90,
    justifyContent: 'center',
  },
});
