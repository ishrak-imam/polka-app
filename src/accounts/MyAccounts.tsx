import React from 'react';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
// import {addressBook} from 'navigation/routeKeys';
import {Card, Title, Paragraph, Button} from 'rnpaper';
import {StyleSheet} from 'react-native';
import {useAccounts} from 'context/Accounts';
import {Layout} from 'components/Layout';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts() {
  const {accounts, setCallback, generateMnemonic, createAccount} =
    useAccounts();
  const [mnemonic, setMnemonic] = React.useState<String>('');
  console.log(mnemonic);

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
    <Layout>
      <Card style={styles.card}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});
