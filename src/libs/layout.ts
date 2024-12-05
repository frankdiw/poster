import type { ElementType } from '../type';
import Yoga, {
  Align,
  Direction,
  Edge,
  FlexDirection,
  Gutter,
  Node,
  PositionType,
  Wrap,
} from 'yoga-layout';
import { parseStyle } from './cssParse';
import { measureText } from '../draw/text';

export function createLayoutTree(
  element: ElementType,
  parent?: Node,
  index?: number
) {
  const node = Yoga.Node.create();
  node.setAlwaysFormsContainingBlock(true);
  const style = parseStyle(element.style);
  // 处理宽高
  const {
    width,
    height,
    margin,
    padding,
    border,
    position,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    aspectRatio,
    gap,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    bottom,
    left,
    right,
    top,
    flex,
    alignItems,
    alignContent,
  } = style;
  width && node.setWidth(width);
  height && node.setHeight(height);
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    padding || {};

  // 处理内边距
  paddingTop && node.setPadding(Edge.Top, paddingTop);
  paddingBottom && node.setPadding(Edge.Bottom, paddingBottom);
  paddingLeft && node.setPadding(Edge.Left, paddingLeft);
  paddingRight && node.setPadding(Edge.Right, paddingRight);

  // 处理边框
  const { borderAll, borderTop, borderBottom, borderRight, borderLeft } =
    border || {};
  borderAll && node.setBorder(Edge.All, borderAll.borderWidth);
  borderTop && node.setBorder(Edge.Top, borderTop.borderWidth);
  borderBottom && node.setBorder(Edge.Bottom, borderBottom.borderWidth);
  borderRight && node.setBorder(Edge.Right, borderRight.borderWidth);
  borderLeft && node.setBorder(Edge.Left, borderLeft.borderWidth);

  // 处理定位
  position &&
    node.setPositionType(
      position === 'absolute' ? PositionType.Absolute : PositionType.Relative
    );

  // 处理外边距
  const { marginTop, marginRight, marginBottom, marginLeft } = margin || {};
  marginBottom && node.setMargin(Edge.Bottom, marginBottom);
  marginRight && node.setMargin(Edge.Right, marginRight);
  marginLeft && node.setMargin(Edge.Left, marginLeft);
  marginTop && node.setMargin(Edge.Top, marginTop);

  // 处理最大宽高
  maxWidth && node.setMaxWidth(maxWidth);
  maxHeight && node.setMaxHeight(maxHeight);
  // 处理最小宽高
  minWidth && node.setMinWidth(minWidth);
  minHeight && node.setMinHeight(minHeight);
  // 处理宽高比
  aspectRatio && node.setAspectRatio(aspectRatio);
  // 处理gap
  const { row: rowGap, column: columnGap } = gap || {};
  rowGap && node.setGap(Gutter.Row, rowGap);
  columnGap && node.setGap(Gutter.Column, columnGap);
  // 处理flex
  flexBasis && node.setFlexBasis(flexBasis);
  flexDirection &&
    node.setFlexDirection(
      flexDirection === 'row' ? FlexDirection.Row : FlexDirection.Column
    );
  flexGrow && node.setFlexGrow(flexGrow);
  flexShrink && node.setFlexShrink(flexShrink);
  flexWrap && node.setFlexWrap(Wrap.Wrap);
  flex && node.setFlex(flex);

  switch (alignItems) {
    case 'flex-start':
      node.setAlignItems(Align.FlexStart);
      break;
    case 'flex-end':
      node.setAlignItems(Align.FlexEnd);
      break;
    case 'center':
      node.setAlignItems(Align.Center);
      break;
    case 'stretch':
      node.setAlignItems(Align.Stretch);
      break;
    case 'baseline':
      node.setAlignItems(Align.Baseline);
  }
  switch (alignContent) {
    case 'flex-start':
      node.setAlignContent(Align.FlexStart);
      break;
    case 'flex-end':
      node.setAlignContent(Align.FlexEnd);
      break;
    case 'center':
      node.setAlignContent(Align.Center);
      break;
    case 'stretch':
      node.setAlignContent(Align.Stretch);
      break;
    case 'space-between':
      node.setAlignContent(Align.SpaceBetween);
      break;
    case 'space-around':
      node.setAlignContent(Align.SpaceAround);
      break;
    case 'space-evenly':
      node.setAlignContent(Align.SpaceEvenly);
      break;
  }
  // 处理位置
  left && node.setPosition(Edge.Left, left);
  right && node.setPosition(Edge.Right, right);
  top && node.setPosition(Edge.Top, top);
  bottom && node.setPosition(Edge.Bottom, bottom);

  const children = element?.children?.filter(item=> typeof item !== 'boolean') || [];
  for (let i = 0; i < children.length; i++) {
    let item = children[i];
    if (typeof item === 'object' && item !== null) {
      createLayoutTree(item, node, i);
    } else {
      let str = String(item);
      // 处理文本
      const childNode = Yoga.Node.create();
      const child: ElementType = {
        node: childNode,
        type: 'text',
        style: {
          fontSize: element.style?.fontSize,
          fontWeight: element.style?.fontWeight,
          lineHeight: element.style?.lineHeight,
          color: element.style?.color,
          letterSpacing: element.style?.letterSpacing,
        },
      };
      childNode.setMeasureFunc((boxWidth) => {
        const { height, width, lines } = measureText(str, boxWidth, {
          fontSize: element.style?.fontSize,
          fontWeight: element.style?.fontWeight,
          lineClamp: element?.style?.lineClamp,
          letterSpacing: element.style?.letterSpacing,
          lineHeight: element.style?.lineHeight,
        });
        child.children = lines;
        return { height, width };
      });
      node.insertChild(childNode, i);
      children[i] = child;
    }
  }
  if (parent && index !== void 0) {
    parent.insertChild(node, index);
  }
  element.node = node;
  element.style = style;
}

export function layout(element: ElementType) {
  createLayoutTree(element);
  element.node?.calculateLayout(
    element?.style?.width,
    element?.style?.height,
    Direction.LTR
  );
  return element;
}
