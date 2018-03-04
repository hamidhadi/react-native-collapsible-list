import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Animated, TouchableOpacity, Text } from 'react-native'

export default class CollapsibleList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Animation stop points
      maxHeight: 0,
      minHeight: 0,
      //
      // Track items that was calculated their size
      calculatedItems: 0,
      calculationCompleted: false,
      //
      collapse: false,
      animation: new Animated.Value(0)
    }
  }

  animate (toValue, callback) {
    const { animation } = this.state
    const { animationConfig } = this.props

    Animated.timing(animation, {...animationConfig, toValue}).start(callback)
  }

  onItemLayout (event, index) {
    const { calculatedItems, calculationCompleted } = this.state
    const { items } = this.props
    const { height } = event.nativeEvent.layout

    // Generate maximum height of list based on height of the items
    if (!calculationCompleted) {
      this.setState(prevState => ({ maxHeight: prevState.maxHeight + height }), () => {
        if (calculatedItems <= items.length) {
          this.setState(prevState => ({ calculatedItems: prevState.calculatedItems + 1 }))
        }

        if (calculatedItems === items.length - 1) this.setState({ calculationCompleted: true })
      })
    }
  }

  toggleCollapse () {
    const { maxHeight, minHeight, collapse } = this.state
    let nextHeight

    if (collapse) {
      nextHeight = minHeight
    } else {
      nextHeight = maxHeight
    }

    this.animate(nextHeight, () => this.setState({ collapse: !collapse }))
  }

  render () {
    const {
      animation
    } = this.state
    const { items, numberOfVisibleItems, buttonContent, wrapperStyle } = this.props

    return (
      <View style={wrapperStyle}>
        <View style={{flex: 1}}>
          {
            items.slice(0, numberOfVisibleItems).map((item, index) => (
              <View
                key={index}
              >{item}</View>
            ))
          }
        </View>
        <Animated.View
          style={{ flex: 1, overflow: 'hidden', height: animation }}
        >
          <View style={{minHeight: items.length * 100}}>
            {
              items.slice(numberOfVisibleItems).map((item, index) =>
                <View
                  key={index}
                  onLayout={(event) => this.onItemLayout(event, index)}
                >{item}</View>)
            }
          </View>
        </Animated.View>
        <View>
          <TouchableOpacity onPress={() => this.toggleCollapse()} activeOpacity={0.8}>
            {buttonContent}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CollapsibleList.propTypes = {
  animationConfig: PropTypes.object,
  buttonContent: PropTypes.element,
  items: PropTypes.arrayOf(PropTypes.element),
  numberOfVisibleItems: PropTypes.number,
  wrapperStyle: PropTypes.object
}

CollapsibleList.defaultProps = {
  animationConfig: {},
  buttonContent: (<Text>Collapse Button</Text>),
  items: [],
  numberOfVisibleItems: 1,
  wrapperStyle: {}
}
