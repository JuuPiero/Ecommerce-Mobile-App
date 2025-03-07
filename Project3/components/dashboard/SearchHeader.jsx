import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: 'transparent',
    // marginTop: 20,
    paddingBottom: 10
  }
})

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.searchContainer}>
      <Searchbar 
        placeholder="Tìm kiếm..." 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
        style={{ borderRadius: 50 }}
      />
    </View>
  );
};

export default SearchHeader