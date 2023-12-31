import React, { useRef } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useTheme, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Text from './Text';
import Book from './Book';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// horizontal flatlist of books
function BookList({ books, title, cameFromDetails }) {
  const { width, margin, colors } = useTheme();
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);

  // handle horizontal scroll
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollX.value = contentOffset.x;
    },
  });

  // go to search screen
  const searchScreen = () => {
    navigation.push('BookSearch');
  };

  // all styles
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.card,
      paddingTop: (title === 'Reading' ? margin : 0),
    },
    heading: {
      paddingTop: margin,
      paddingHorizontal: margin,
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
    },
    headingText: {
      fontSize: 18,
      fontWeight: 600,
    },
    listContainer: {
      padding: margin,
    },
    emptyContainer: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: width - margin * 2,
      paddingVertical: margin * 3,
      backgroundColor: colors.background,
    },
    emptyText: {
      padding: margin,
    },
  });

  // empty list placeholder
  const EmptyList = () => (
    <Pressable onPress={searchScreen} style={styles.emptyContainer}>
      <AntDesign color={colors.text} size={27} name="book" />
      <Text size={16} center style={styles.emptyText}>
        {'I\'m lonely. \n Add something here.'}
      </Text>
    </Pressable>
  );

  // render book list
  return (
    <View style={styles.list}>
      <View style={styles.heading}>
        <Text size={17} style={styles.headingText} >{title}</Text>
        <Text size={17} style={styles.headingText}>{books.length}</Text>
      </View>
      <AnimatedFlatList
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(i) => i.bookId}
        renderItem={({ item, index }) => (
            <Book book={item} index={index} scrollX={scrollX} cameFromDetails={cameFromDetails}/>
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

export default React.memo(BookList);
