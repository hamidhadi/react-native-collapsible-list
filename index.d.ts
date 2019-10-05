declare module "react-native-collapsible-list" {
  import * as React from "react";
  import * as ReactNative from "react-native";

  export interface CollapsibleListProps extends ReactNative.ViewProps {
    animationConfig?: ReactNative.LayoutAnimationConfig;
    buttonContent?: React.ReactNode;
    numberOfVisibleItems?: number;
    onToggle?: (collapsed: boolean) => void;
    wrapperStyle?: ReactNative.ViewStyle;
  }

  export class CollapsibleList extends React.Component<CollapsibleListProps> {}

  export default CollapsibleList;
}
