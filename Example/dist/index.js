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
    const { height: minHeight } = event.nativeEvent.layout

    this.state.animation.setValue(minHeight)
    this.setState({ minHeight }, () => {
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

  onItemLayout (event) {
    const { calculatedItems, calculationCompleted } = this.state
    const { children, numberOfVisibleItems } = this.props
    const { height } = event.nativeEvent.layout

    // Generate maximum height of list based on height of the items
    if (!calculationCompleted) {
      this.setState(prevState => ({ maxHeight: prevState.maxHeight + height }), () => {
        if (calculatedItems < React.Children.count(children)) {
          this.setState(prevState => ({ calculatedItems: prevState.calculatedItems + 1 }))
        }

        if (calculatedItems === (React.Children.count(children) - 1) - numberOfVisibleItems) {
          this.setState({ calculationCompleted: true })
        }
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
      nextHeight = minHeight + maxHeight
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
    const { numberOfVisibleItems, buttonContent, wrapperStyle, children } = this.props

    return (
      <View style={wrapperStyle}>
        <Animated.View style={{ overflow: 'hidden', height: animation }}>
          <View style={{flex: 1}} onLayout={(event) => this.setMinHeight(event)}>
            {
              React.Children.toArray(children).slice(0, numberOfVisibleItems)
            }
          </View>
          {
            initialized &&
            <View>
              {
                React.Children.toArray(children).slice(numberOfVisibleItems).map((item, index) => (
                  <View key={index} onLayout={(event) => this.onItemLayout(event)}>{item}</View>
                ))
              }
            </View>
          }
        </Animated.View>
        {
          (numberOfVisibleItems < React.Children.count(children)) &&
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
  numberOfVisibleItems: PropTypes.number,
  onToggle: PropTypes.func,
  wrapperStyle: PropTypes.object
}

CollapsibleList.defaultProps = {
  animationConfig: {},
  animationType: 'timing',
  buttonContent: (<Text>Collapse Button</Text>),
  numberOfVisibleItems: 1,
  onToggle: null,
  wrapperStyle: {}
}
