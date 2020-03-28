declare module "react-native-collapsible-list" {
  import * as React from "react";
  import * as ReactNative from "react-native";

  export interface CollapsibleListProps extends ReactNative.ViewProps {
    /** You can override the default `animationConfig` via this prop */
    animationConfig?: ReactNative.LayoutAnimationConfig;
    buttonContent?: React.ReactNode;
    /** The possition of the button. Default value is `bottom` */
    buttonPosition?: 'top' | 'bottom';
    numberOfVisibleItems?: number;
    onToggle?: (collapsed: boolean) => void;
    wrapperStyle?: ReactNative.ViewStyle;
  }

  export class CollapsibleList extends React.Component<CollapsibleListProps> {}

  export default CollapsibleList;
}
