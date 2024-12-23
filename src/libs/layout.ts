import type { ElementType } from '../type';
import Yoga, {
  Align,
  Direction,
  Edge,
  FlexDirection,
  Gutter,
  Justify,
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
  const layoutNode = Yoga.Node.create();
  layoutNode.setAlwaysFormsContainingBlock(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const style: any = parseStyle(element.style);
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
    justifyContent,
  } = style;
  // 处理宽高
  layoutNode.setWidth(width);
  layoutNode.setHeight(height);
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } =
    padding || {};

  // 处理内边距
  layoutNode.setPadding(Edge.Top, paddingTop);
  layoutNode.setPadding(Edge.Bottom, paddingBottom);
  layoutNode.setPadding(Edge.Left, paddingLeft);
  layoutNode.setPadding(Edge.Right, paddingRight);

  // 处理边框
  const { borderAll, borderTop, borderBottom, borderRight, borderLeft } =
    border || {};
  layoutNode.setBorder(Edge.All, borderAll?.borderWidth);
  layoutNode.setBorder(Edge.Top, borderTop?.borderWidth);
  layoutNode.setBorder(Edge.Bottom, borderBottom?.borderWidth);
  layoutNode.setBorder(Edge.Right, borderRight?.borderWidth);
  layoutNode.setBorder(Edge.Left, borderLeft?.borderWidth);

  // 处理定位
  layoutNode.setPositionType(
    position === 'absolute' ? PositionType.Absolute : PositionType.Relative
  );

  // 处理外边距
  const { marginTop, marginRight, marginBottom, marginLeft } = margin || {};
  layoutNode.setMargin(Edge.Bottom, marginBottom);
  layoutNode.setMargin(Edge.Right, marginRight);
  layoutNode.setMargin(Edge.Left, marginLeft);
  layoutNode.setMargin(Edge.Top, marginTop);

  // 处理最大宽高
  layoutNode.setMaxWidth(maxWidth);
  layoutNode.setMaxHeight(maxHeight);
  // 处理最小宽高
  layoutNode.setMinWidth(minWidth);
  layoutNode.setMinHeight(minHeight);
  // 处理宽高比
  layoutNode.setAspectRatio(aspectRatio);
  // 处理gap
  const { row: rowGap, column: columnGap } = gap || {};
  layoutNode.setGap(Gutter.Row, rowGap);
  layoutNode.setGap(Gutter.Column, columnGap);
  // 处理flex
  layoutNode.setFlexBasis(flexBasis);
  layoutNode.setFlexGrow(flexGrow);
  layoutNode.setFlexShrink(flexShrink);
  layoutNode.setFlex(flex);

  switch (flexWrap) {
    case 'nowrap':
      layoutNode.setFlexWrap(Wrap.NoWrap);
      break;
    case 'wrap':
      layoutNode.setFlexWrap(Wrap.Wrap);
      break;
    case 'wrap-reverse':
      layoutNode.setFlexWrap(Wrap.WrapReverse);
      break;
  }

  switch (flexDirection) {
    case 'row':
      layoutNode.setFlexDirection(FlexDirection.Row);
      break;
    case 'column':
      layoutNode.setFlexDirection(FlexDirection.Column);
      break;
    case 'row-reverse':
      layoutNode.setFlexDirection(FlexDirection.RowReverse);
      break;
    case 'column-reverse':
      layoutNode.setFlexDirection(FlexDirection.ColumnReverse);
  }

  switch (alignItems) {
    case 'flex-start':
      layoutNode.setAlignItems(Align.FlexStart);
      break;
    case 'flex-end':
      layoutNode.setAlignItems(Align.FlexEnd);
      break;
    case 'center':
      layoutNode.setAlignItems(Align.Center);
      break;
    case 'stretch':
      layoutNode.setAlignItems(Align.Stretch);
      break;
    case 'baseline':
      layoutNode.setAlignItems(Align.Baseline);
  }
  switch (alignContent) {
    case 'flex-start':
      layoutNode.setAlignContent(Align.FlexStart);
      break;
    case 'flex-end':
      layoutNode.setAlignContent(Align.FlexEnd);
      break;
    case 'center':
      layoutNode.setAlignContent(Align.Center);
      break;
    case 'stretch':
      layoutNode.setAlignContent(Align.Stretch);
      break;
    case 'space-between':
      layoutNode.setAlignContent(Align.SpaceBetween);
      break;
    case 'space-around':
      layoutNode.setAlignContent(Align.SpaceAround);
      break;
    case 'space-evenly':
      layoutNode.setAlignContent(Align.SpaceEvenly);
      break;
  }
  switch (justifyContent) {
    case 'flex-start':
      layoutNode.setJustifyContent(Justify.FlexStart);
      break;
    case 'flex-end':
      layoutNode.setJustifyContent(Justify.FlexEnd);
      break;
    case 'center':
      layoutNode.setJustifyContent(Justify.Center);
      break;
    case 'space-between':
      layoutNode.setJustifyContent(Justify.SpaceBetween);
      break;
    case 'space-around':
      layoutNode.setJustifyContent(Justify.SpaceAround);
      break;
    case 'space-evenly':
      layoutNode.setJustifyContent(Justify.SpaceEvenly);
      break;
  }
  // 处理位置
  layoutNode.setPosition(Edge.Left, left);
  layoutNode.setPosition(Edge.Right, right);
  layoutNode.setPosition(Edge.Top, top);
  layoutNode.setPosition(Edge.Bottom, bottom);

  element.children = element?.children?.filter(
    (item) => typeof item !== 'boolean'
  );
  const children = element?.children || [];
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    if (typeof item !== 'string') {
      createLayoutTree(item, layoutNode, i);
    } else {
      const str = item;
      // 处理文本
      const childLayoutNode = Yoga.Node.create();
      const child: ElementType = {
        layoutNode: childLayoutNode,
        type: 'text',
        style: {
          fontSize: element.style?.fontSize,
          fontWeight: element.style?.fontWeight,
          lineHeight: element.style?.lineHeight,
          color: element.style?.color,
          letterSpacing: element.style?.letterSpacing,
          lineClamp: element?.style?.lineClamp,
          textAlign: element.style?.textAlign,
          textOverflow: element?.style?.textOverflow,
          textShadow: element?.style?.textShadow,
          opacity: element?.style?.opacity,
        },
      };
      childLayoutNode.setMeasureFunc((boxWidth) => {
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
      layoutNode.insertChild(childLayoutNode, i);
      children[i] = child;
    }
  }
  if (parent && index !== void 0) {
    parent.insertChild(layoutNode, index);
  }
  element.layoutNode = layoutNode;
  element.style = style;
}

export function layout(element: ElementType) {
  createLayoutTree(element);
  element.layoutNode?.calculateLayout(
    element?.style?.width,
    element?.style?.height,
    Direction.LTR
  );
  return element;
}
