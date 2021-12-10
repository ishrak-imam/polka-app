import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout} from 'components/Layout';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AccountsStackParamList} from 'navigation/navigation';
import {verifyMnemonic, createAccount} from 'navigation/routeKeys';
import {View, Button, Caption, TextInput, Padder} from 'rnpaper';
import {useTheme} from 'context/Theme';
import {shuffle} from 'lodash';

type ScreenProps = {
  navigation: NavigationProp<AccountsStackParamList>;
  route: RouteProp<AccountsStackParamList, typeof verifyMnemonic>;
};

type Word = {
  id: number;
  text: string;
  isSelected: boolean;
};

export function VerifyMnemonic({navigation, route}: ScreenProps) {
  const {mnemonic} = route.params;

  const [selectedMnemonic, setSelectedMnemonic] = React.useState('');
  const [isMnemonicVerified, setIsMnemonicVerified] = React.useState(false);
  const [words, setWords] = React.useState<Word[]>(() => {
    return shuffle(mnemonic.split(' ')).map((word, index) => ({
      id: index,
      text: word,
      isSelected: false,
    }));
  });

  React.useEffect(() => {
    const _isMnemonicVerified = mnemonic === selectedMnemonic;
    setIsMnemonicVerified(_isMnemonicVerified);
  }, [selectedMnemonic, mnemonic]);

  const onSelect = (selectedWord: Word) => {
    const wordsSelected = words.map(word =>
      word.id === selectedWord.id
        ? {...word, isSelected: !word.isSelected}
        : word,
    );
    setWords(wordsSelected);

    const mnemonicSelected = !selectedWord.isSelected
      ? `${selectedMnemonic} ${selectedWord.text}`
      : selectedMnemonic
          .split(' ')
          .filter(word => word !== selectedWord.text)
          .join(' ');

    setSelectedMnemonic(mnemonicSelected.trim());
  };

  const onReset = () => {
    setWords(words.map(word => ({...word, isSelected: false})));
    setSelectedMnemonic(' ');
  };

  return (
    <Layout style={styles.layout}>
      <Caption>
        {'Verify your mnemonic by selecting the words in the correct order.'}
      </Caption>
      <Padder scale={1} />
      <TextInput
        style={styles.mnemonicInput}
        mode="outlined"
        disabled
        value={selectedMnemonic}
        multiline
      />
      <Padder scale={2} />
      <WordSelector words={words} onSelect={onSelect} />
      <Padder scale={2} />
      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onReset}>
          Reset
        </Button>
        <Button
          mode="outlined"
          disabled={!isMnemonicVerified && !__DEV__}
          onPress={() => navigation.navigate(createAccount, {mnemonic})}
        >
          Next
        </Button>
      </View>
    </Layout>
  );
}

type WordSelectorProps = {
  words: Word[];
  onSelect: (word: Word) => void;
};

function WordSelector({words, onSelect}: WordSelectorProps) {
  const {colors} = useTheme();

  return (
    <View style={styles.words}>
      {words.map(word => (
        <View style={styles.wordButton} key={word.id}>
          <Button
            color={`${word.isSelected ? colors.primary : colors.accent}`}
            onPress={() => onSelect(word)}
            mode="contained"
          >
            {word.text}
          </Button>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  words: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  wordButton: {
    margin: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
  },
  mnemonicInput: {
    height: 80,
  },
});
