import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ links = [], onPageChange }) => {
  // Lọc ra các link có số trang thực sự
    const pageLinks = links.filter(link => !isNaN(link.label));
    const currentPage = pageLinks.find(link => link.active)?.label;

    if (pageLinks.length <= 1) return null; 

    const handlePress = (link) => {
        if (link.url && onPageChange) {
        const match = link.url.match(/page=(\d+)/);
            if (match) {
                const page = parseInt(match[1]);
                onPageChange(page);
            }
        }
    };

    const renderLink = (link, index) => {
        const label = link.label.replace(/&laquo;|&raquo;/g, '').trim();

        if (label.toLowerCase() === 'previous' && currentPage === '1') return null;
        if (label.toLowerCase() === 'next' && currentPage === String(pageLinks.length)) return null;

        return (
        <TouchableOpacity
            key={index}
            style={[styles.button, link.active && styles.activeButton]}
            onPress={() => handlePress(link)}
            disabled={!link.url}
        >
            <Text style={[styles.buttonText, link.active && styles.activeText]}>
            {decodeHtml(link.label)}
            </Text>
        </TouchableOpacity>
        );
    };

  const renderCompact = () => {
    const current = parseInt(currentPage);
    const total = pageLinks.length;
    const items = [];

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 || i === total ||
        i === current || i === current - 1 || i === current + 1
      ) {
        const link = links.find(l => l.label === i.toString());
        if (link) items.push(renderLink(link, i));
      } else if (
        (i === 2 && current > 4) ||
        (i === total - 1 && current < total - 3) ||
        (i === current - 2 || i === current + 2)
      ) {
        const last = items[items.length - 1];
        if (last !== '...') items.push('...');
      }
    }

    return items.map((item, idx) => {
      if (item === '...') {
        return <Text key={`dots-${idx}`} style={styles.dots}>...</Text>;
      }
      return item;
    });
  };

  return (
    <View style={styles.container}>
      {links[0].url && renderLink(links[0], 'prev')}
      {renderCompact()}
      {links[links.length - 1].url && renderLink(links[links.length - 1], 'next')}
    </View>
  );
};

const decodeHtml = (html) => {
  return html
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 16,
        flexWrap: 'wrap',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#ddd',
    },
    activeButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#333',
    },
    activeText: {
        color: '#fff',
    },
    dots: {
        paddingHorizontal: 6,
        paddingVertical: 6,
        fontSize: 16,
        color: '#999',
    },
});

export default Pagination;