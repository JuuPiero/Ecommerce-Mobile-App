import { useState } from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ padding: 10, backgroundColor: 'white', marginTop: 20 }}>
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