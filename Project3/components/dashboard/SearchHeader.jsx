import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
    // marginTop: 20,
    paddingBottom: 10
  }
})

const SearchHeader = () => {
  const navigation = useNavigation()
  const [keywords, setKeywords] = useState('');

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        onSubmitEditing={e => {
          navigation.navigate('Dashboard', {
            screen: 'Search',
            params: { keywords },
          })
        }}
        placeholder="Tìm kiếm..." 
        value={keywords} 
        onChangeText={text => setKeywords(text)} 
        style={{ borderRadius: 8 }}
      />
    </View>
  );
};

export default SearchHeader