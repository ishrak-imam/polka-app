import React from 'react';
import {SafeView} from 'components/SafeView';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
// import {addressBook} from 'navigation/routeKeys';
import {Card, Title, Paragraph, Button, Avatar} from 'rnpaper';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
};

export function MyAccounts({navigation}: ScreenProps) {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    // <SafeView style={{backgroundColor: 'green'}}>
      <Card style={{margin: 10}}>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
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
    // </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
