import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';

const App = () => {
  const [buttonText, setButtonText] = useState<string>('Show More');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <CollapsibleList
            numberOfVisibleItems={2}
            wrapperStyle={styles.wrapperCollapsibleList}
            onToggle={collapsed =>
              collapsed
                ? setButtonText('Show Less')
                : setButtonText('Show More')
            }
            buttonContent={
              <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            }>
            <View style={styles.collapsibleItem}>
              <Text>Hello Collapsable List :)</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>
                Collapsable List Item Multi line is also supported: Lorem ipsum
                dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                commodo consequat. Duis autem vel eum iriure dolor in hendrerit
                in vulputate velit esse molestie consequat, vel illum dolore eu
                feugiat nulla facilisis at vero eros et accumsan et iusto odio
                dignissim qui blandit praesent luptatum zzril delenit augue duis
                dolore te feugait nulla facilisi.
              </Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Hello Collapsable List :)</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
          </CollapsibleList>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#c2185b',
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default App;
