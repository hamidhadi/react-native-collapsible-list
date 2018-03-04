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
        <CollapsibleList
          numberOfVisibleItems={1}
          items={[
            <View style={styles.collapsibleItem}>
              <Text>Hello Collapsable List :)</Text>
            </View>,
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>,
            <View style={styles.collapsibleItem}>
              <Text>Collapsable List Item</Text>
            </View>
          ]}
        />
      </View>
    )
  }
}

```


## Properties

| Prop          | Default | Description|
|---------------|:-------:|------------|
|animationConfig|`{}`     | Standard config of [timing animation](https://facebook.github.io/react-native/docs/animated.html#timing)
|buttonContent          |`<Text>Collapse Button</Text>`     | Content of collapse button
|items    |`[]`     | Your list items
|imageResizeMode|`'cover'`    | ResizeMode of the stretchy header image. [You can use one of these values](https://facebook.github.io/react-native/docs/image.html#resizemode)
|numberOfVisibleItems |`1`       |Number of visible items when lis is not collapse
|wrapperStyle     |`{}`     |The style of the list wrapper

## Contribution
This project is a basic collapsible list and must be improve. 
You can fork the repository, improve or fix some part of it and then send the pull requests back if you want to see them here. I really appreciate that. :wink:


## License

Licensed under the [GPL-2.0](https://github.com/hamidhadi/react-native-collapsible-list/blob/master/LICENSE).
