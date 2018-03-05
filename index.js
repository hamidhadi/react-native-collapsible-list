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
      collapsed: false,
      initialized: false,
      animation: new Animated.Value()
    }
  }

  setMinHeight (event) {
    this.state.animation.setValue(event.nativeEvent.layout.height)
    this.setState({ minHeight: event.nativeEvent.layout.height }, () => {
      this.setState({ initialized: true })
    })
  }

  animate (toValue, callback) {
    const { animation } = this.state
    const { animationConfig, animationType } = this.props

    switch (animationType) {
      case 'spring':
        Animated.spring(animation, {...animationConfig, toValue}).start(callback)
        break
      case 'timing':
        Animated.timing(animation, {...animationConfig, toValue}).start(callback)
        break
    }
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

  toggle () {
    const { maxHeight, minHeight, collapsed } = this.state
    const { onToggle } = this.props
    let nextHeight

    if (collapsed) {
      nextHeight = minHeight
    } else {
      nextHeight = maxHeight
    }

    this.animate(nextHeight, () => this.setState({ collapsed: !collapsed }, () => {
      if (onToggle) onToggle(this.state.collapsed)
    }))
  }

  render () {
    const {
      animation,
      initialized
    } = this.state
    const { items, numberOfVisibleItems, buttonContent, wrapperStyle } = this.props

    return (
      <View style={wrapperStyle}>
        <Animated.View style={{ overflow: 'hidden', height: animation }}>
          <View style={{flex: 1}} onLayout={(event) => this.setMinHeight(event)}>
            {
              items.slice(0, numberOfVisibleItems).map((item, index) => <View key={index}>{item}</View>)
            }
          </View>
          {
            initialized &&
            <View>
              {
                items.slice(numberOfVisibleItems).map((item, index) => (
                  <View key={index} onLayout={(event) => this.onItemLayout(event, index)}>{item}</View>
                ))
              }
            </View>
          }
        </Animated.View>
        {
          (numberOfVisibleItems < items.length) &&
          <View>
            <TouchableOpacity onPress={() => this.toggle()} activeOpacity={0.8}>
              {buttonContent}
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}

CollapsibleList.propTypes = {
  animationConfig: PropTypes.object,
  animationType: PropTypes.oneOf(['spring', 'timing']),
  buttonContent: PropTypes.element,
  items: PropTypes.arrayOf(PropTypes.element),
  numberOfVisibleItems: PropTypes.number,
  onToggle: PropTypes.func,
  wrapperStyle: PropTypes.object
}

CollapsibleList.defaultProps = {
  animationConfig: {},
  animationType: 'timing',
  buttonContent: (<Text>Collapse Button</Text>),
  items: [],
  numberOfVisibleItems: 1,
  onToggle: null,
  wrapperStyle: {}
}
