# react-native-collapsible-list
A ReactNative collapsible list component

![StretchyBatman](/demo.gif)

## Installation

You can install this package via `yarn`:
```bash
yarn add react-native-collapsible-list
```

or `npm`

```bash
npm install react-native-collapsible-list --save
```

## Basic Usage

```js
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import CollapsibleList from 'react-native-collapsible-list'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <CollapsibleList numberOfVisibleItems={1}>
          <View style={styles.collapsibleItem}>
            <Text>Hello Collapsable List :)</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
        </CollapsibleList>
      </View>
    )
  }
}

```


## Properties

| Prop          | Type    | Default  | Description|
|---------------|:-------:|:--------:|------------|
|animationType  |`String` |`'timing'`|You can use `timing` or `spring` animation
|animationConfig|`Object` |`{}`      | Standard config of [timing](https://facebook.github.io/react-native/docs/animated.html#timing)/[spring](https://facebook.github.io/react-native/docs/animated.html#spring) animation
|buttonContent  |`component`|`<Text>Collapse Button</Text>`| Content of collapse button
|numberOfVisibleItems |`number`|`1`|Number of visible items when lis is not collapsed
|onToggle       |`function`|`null`|Callback function for toggling the list with collapsed parameter which can be `true`(list is collapsed) or `false`(list is not collapsed)
|wrapperStyle   |`object`|`{}`|The style of the list wrapper

## Contribution
This project is a basic collapsible list and must be improve. 
You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :wink:


## License

Licensed under the [GPL-2.0](https://github.com/hamidhadi/react-native-collapsible-list/blob/master/LICENSE).
