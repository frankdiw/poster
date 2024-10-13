import { Node } from "yoga-layout";
import { ColorStopType } from "./draw/rect";

export type BorderType = {
  borderWidth: number;
  borderStyle: "solid" | "dashed";
  borderColor: string;
};

export type FontWeightType =
  | "normal"
  | "bold"
  | "bolder"
  | "lighter"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
export type TextAlignType = "left" | "right" | "center" | "justify";

export type ElementType = {
  type: string;
  children?: (ElementType | string)[];
  style?: {
    display?: "flex";
    position?: "relative" | "absolute";
    antialias?: "default" | "none";
    margin?: {
      marginTop?: number;
      marginRight?: number;
      marginBottom?: number;
      marginLeft?: number;
    };
    padding?: {
      paddingTop?: number;
      paddingRight?: number;
      paddingBottom?: number;
      paddingLeft?: number;
    };
    border?: {
      borderAll?: BorderType;
      borderTop?: BorderType;
      borderRight?: BorderType;
      borderBottom?: BorderType;
      borderLeft?: BorderType;
    };
    borderRadius?: {
      topLeft?: number;
      topRight?: number;
      bottomRight?: number;
      bottomLeft?: number;
    };
    background?: {
      color?: string;
      image?: string;
      linearGradient?: {
        direction: number;
        colorStops: ColorStopType[];
      };
    };
    opacity?: number;
    boxShadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
    height?: number;
    width?: number;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    aspectRatio?: number;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
    alignContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "stretch"
      | "space-between"
      | "space-around";
    alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch";
    justifyContent?:
      | "flex-start"
      | "flex-end"
      | "center"
      | "space-between"
      | "space-around"
      | "space-evenly";
    flex?: number;
    gap?: {
      row?: number;
      column?: number;
    };
    textAlign?: TextAlignType;
    fontSize?: number;
    lineHeight?: number;
    letterSpacing?: number;
    textOverflow?: "clip" | "ellipsis";
    lineClamp?: number;
    fontFamily?: string;
    fontWeight?: FontWeightType;
    fontStyle?: "normal" | "italic" | "oblique";
    color?: string;
    textDecoration?: "none" | "underline" | "line-through";
    textShadow?: {
      blur: number;
      color: string;
      offsetX: number;
      offsetY: number;
    };
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  node?: Node;
};

export type DrawElementType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  borderRadius?: Partial<{
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
  }>;
  border?: {
    borderAll?: BorderType;
    borderTop?: BorderType;
    borderRight?: BorderType;
    borderBottom?: BorderType;
    borderLeft?: BorderType;
  };
  background?: {
    color?: string;
    image?: string;
    linearGradient?: {
      direction: number;
      colorStops: string[];
    };
  };
  opacity?: number;
  boxShadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
  textAlign?: "left" | "right" | "center" | "justify";
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  textOverflow?: "clip" | "ellipsis";
  lineClamp?: number;
  fontFamily?: string;
  fontWeight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fontStyle?: "normal" | "italic" | "oblique";
  color?: string;
  textDecoration?: "none" | "underline" | "line-through";
  textShadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
  children?: DrawElementType[];
};

export type TextMeasureStyleType = {
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  fontStyle?: "normal" | "italic" | "oblique";
  fontWeight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  lineClamp?: number;
};

export type TextDrawStyleType = {
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
  fontFamily?: string;
  fontStyle?: "normal" | "italic" | "oblique";
  fontWeight?:
    | "normal"
    | "bold"
    | "bolder"
    | "lighter"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string;
  textShadow?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
};
