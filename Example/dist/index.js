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
      calculationCompleted: false,
      //
      collapsed: false,
      initialized: false,
      animation: new Animated.Value()
    }
  }

  setMinHeight = (event) => {
    const { height: minHeight } = event.nativeEvent.layout

    this.state.animation.setValue(minHeight)
    this.setState({ minHeight }, () => {
      this.setState({ initialized: true })
    })
  }

  animate (toValue, callback) {
    const { animation } = this.state
    const { animationConfig, animationType } = this.props

    const type = animationType === 'spring' ? animationType : 'timing';
    Animated[type](animation, {...animationConfig, toValue}).start(callback)
  }

  setMaxHeight = (event) => {
    const { calculationCompleted } = this.state
    const { height: maxHeight } = event.nativeEvent.layout

    if (!calculationCompleted) {
      this.setState(prevState => ({ maxHeight }), () => {
        this.setState({ calculationCompleted: true })
      })
    }
  }

  toggle = () => {
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

    const childrenArr = React.Children.toArray(children);

    return (
      <View style={wrapperStyle}>
        <Animated.View style={{ overflow: 'hidden', height: animation }}>
          <View style={{flex: 1}} onLayout={this.setMinHeight}>
            {
              childrenArr.slice(0, numberOfVisibleItems)
            }
          </View>
          {
            initialized &&
            <View onLayout={this.setMaxHeight}>
              {
                childrenArr.slice(numberOfVisibleItems)
              }
            </View>
          }
        </Animated.View>
        {
          (numberOfVisibleItems < childrenArr.length) &&
          <View>
            <TouchableOpacity onPress={this.toggle} activeOpacity={0.8}>
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
