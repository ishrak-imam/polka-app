import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from 'components/Layout';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {useAccounts} from 'context/Accounts';
import {Padder, TextInput, Caption, View, Button} from 'rnpaper';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function Mnemonic({navigation}: ScreenProps) {
  const [mnemonic, setMnemonic] = React.useState('');
  const {setCallback, generateMnemonic} = useAccounts();

  React.useEffect(() => {
    generateMnemonic();
  }, []);

  const webviewOnMessage = (data: any) => {
    const {type, payload} = data;
    switch (type) {
      case 'GENERATE_MNEMONIC': {
        setMnemonic(payload.mnemonic);
      }
    }
  };
  setCallback(webviewOnMessage);

  return (
    <Layout style={styles.layout}>
      <TextInput label="Mnemonic seed" disabled value={mnemonic} multiline />
      <Padder scale={1} />
      <View style={styles.caption}>
        <Caption>
          {
            'Please write down the mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your account. keep it carefully to not lose your assets.'
          }
        </Caption>
      </View>
      <View style={styles.button}>
      <Button icon="skip-next" mode="outlined" onPress={() => console.log('Pressed')}>
          Next
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  caption: {
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
  }
});
