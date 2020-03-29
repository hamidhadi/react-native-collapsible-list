# react-native-collapsible-list

A ReactNative collapsible list component

![react-native-collapsible-list example](/demo.gif)

## Installation

You can install this package via `yarn`:

```
yarn add react-native-collapsible-list
```

or `npm`

```bash
npm install react-native-collapsible-list --save
```

## Basic Usage

```js
import React, { Component } from "react";
import { Text, View } from "react-native";
import CollapsibleList from "react-native-collapsible-list";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CollapsibleList
          numberOfVisibleItems={1}
          wrapperStyle={styles.wrapperCollapsibleList}
          buttonContent={
            <View style={styles.button}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
          }
        >
          <View style={styles.collapsibleItem}>
            <Text>Hello Collapsable List :)</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Another Collapsable List Item</Text>
          </View>
        </CollapsibleList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "#FFF",
    borderRadius: 5
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#CCC",
    padding: 10
  }
});
```

## Properties

| Prop                 | Type                                                                                                         | Default                                                                                | Description                                                                                                                               |
| :------------------- | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| animationConfig      | [ReactNative.LayoutAnimationConfig](https://facebook.github.io/react-native/docs/layoutanimation#parameters) | `{duration: 700, update: { type: "spring", springDamping: 0.7, property: "scaleXY" }}` | Overrides each property of the default value if specified                                                                                 |
| buttonContent        | `React.ReactNode`                                                                                            | `null`                                                                                 | Content of collapse button                                                                                                                |
| buttonPosition       | `string` (`top` or `bottom`)                                                                                 | `bottom`                                                                               | Position of collapse button                                                                                                               |
| numberOfVisibleItems | `number`                                                                                                     | `1`                                                                                    | Number of visible items when lis is not collapsed                                                                                         |
| onToggle             | `function`                                                                                                   | `null`                                                                                 | Callback function for toggling the list with collapsed parameter which can be `true`(list is collapsed) or `false`(list is not collapsed) |
| wrapperStyle         | `ReactNative.ViewStyle`                                                                                      | `null`                                                                                 | The style of the list wrapper                                                                                                             |

## Contribution

You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :wink:

## License

Licensed under the [MIT](https://github.com/hamidhadi/react-native-collapsible-list/blob/master/LICENSE).
