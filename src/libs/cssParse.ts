import type { ColorStopType } from '../type';

export const isColor = (value: string) => {
  return ['#', 'rgb', 'hsl'].some((item) =>
    value.toLowerCase().startsWith(item)
  );
};

export const getAngle = (value: string): string | number => {
  if (value.endsWith('deg')) {
    return Number(value.replace(/deg/g, ''));
  } else if (value.endsWith('rad')) {
    return (Number(value.replace(/rad/g, '')) / (Math.PI * 2)) * 360;
  } else if (value.endsWith('turn')) {
    return Number(value.replace(/turn/g, '')) * 360;
  } else if (value.endsWith('grad')) {
    return (Number(value.replace(/grad/g, '')) / 400) * 360;
  } else {
    switch (value) {
      case 'to top':
        return 0;
      case 'to right':
        return 90;
      case 'to bottom':
        return 180;
      case 'to left':
        return 270;
      case 'to top right':
      case 'to right top':
        return 'topRight';
      case 'to bottom right':
      case 'to right bottom':
        return 'bottomRight';
      case 'to bottom left':
      case 'to left bottom':
        return 'bottomLeft';
      case 'to left top':
      case 'to top left':
        return 'topLeft';
    }
    return 180;
  }
};

export const getPxValue = (value: string | number) => {
  if (typeof value === 'string') {
    return Number(value.replace(/px/g, ''));
  }
  return value;
};

export const parseFourValue = (value: string | number) => {
  let values = String(value).split(' ');
  if (values.length === 1) {
    values = new Array(4).fill(values[0], 0);
  } else if (values.length == 2) {
    values = values.concat(values);
  } else if (values.length == 3) {
    values.push(values[1]);
  }
  const [top, right, bottom, left] = values.map(getPxValue);
  return { top, right, bottom, left };
};

export const parseBorder = (border: string) => {
  const [borderWidth, borderStyle, borderColor] = border.split(' ');
  return { borderWidth: getPxValue(borderWidth), borderStyle, borderColor };
};

export const parseBackground = (background: string) => {
  // 处理背景颜色的情况
  if (
    ['#', 'rgb', 'hsl'].some((item) =>
      background.toLowerCase().startsWith(item)
    )
  ) {
    return {
      background: {
        color: background,
      },
    };
  }
  // 处理渐变的情况
  if (background.startsWith('linear-gradient')) {
    const { direction, colorStops } = parseLinearGradient(background);
    return {
      background: {
        linearGradient: {
          direction: getAngle(direction),
          colorStops,
        },
      },
    };
  }
  // 处理背景图
  if (background.startsWith('url(')) {
    return {
      background: { image: background.slice(4, -1).replace(/"|'/g, '') },
    };
  }
};

export const parseShadow = (shadow: string) => {
  const [offsetX, offsetY, blur, color] = shadow.split(' ');
  return {
    offsetX: getPxValue(offsetX),
    offsetY: getPxValue(offsetY),
    blur: getPxValue(blur),
    color,
  };
};

export const parsePadding = (padding: string | number) => {
  const {
    top: paddingTop,
    right: paddingRight,
    bottom: paddingBottom,
    left: paddingLeft,
  } = parseFourValue(padding);
  return { paddingTop, paddingBottom, paddingLeft, paddingRight };
};

export const parseMargin = (margin: string | number) => {
  const {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  } = parseFourValue(margin);
  return { marginTop, marginBottom, marginLeft, marginRight };
};

export const parseBorderRadius = (borderRadius: string | number) => {
  const {
    top: topLeft,
    right: topRight,
    bottom: bottomRight,
    left: bottomLeft,
  } = parseFourValue(borderRadius);
  return {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  };
};

export const parseGap = (gap: string | number) => {
  const values = String(gap).split(' ');
  const [row, column] = values.map(getPxValue);
  return { row, column: column || row };
};

export const parseStyle = (style?: Record<string, any>) => {
  if (!style) {
    return {};
  }
  for (let key in style) {
    if (key === 'padding') {
      style = {
        ...style,
        padding: parsePadding(style[key]),
      };
    }
    if (
      ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].includes(
        key
      )
    ) {
      style = {
        ...style,
        padding: {
          ...style.padding,
          [key]: style[key],
        },
      };
    }
    if (key === 'margin') {
      style = {
        ...style,
        margin: parseMargin(style[key]),
      };
    }
    if (
      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].includes(key)
    ) {
      style = {
        ...style,
        margin: {
          ...style.margin,
          [key]: style[key],
        },
      };
    }
    if (key === 'borderRadius') {
      style = {
        ...style,
        borderRadius: parseBorderRadius(style[key]),
      };
    }
    if (key === 'boxShadow') {
      style = {
        ...style,
        boxShadow: parseShadow(style[key]),
      };
    }
    if (key === 'border') {
      style = {
        ...style,
        border: { borderAll: parseBorder(style[key]) },
      };
    }
    if (
      ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'].includes(key)
    ) {
      style = {
        ...style,
        border: {
          ...style.border,
          [key]: parseBorder(style[key]),
        },
      };
    }
    if (key === 'background') {
      style = {
        ...style,
        ...parseBackground(style[key]),
      };
    }
    if (key === 'gap') {
      style = {
        ...style,
        gap: parseGap(style[key]),
      };
    }
  }
  return style;
};

export function parseLinearGradient(cssGradient: string) {
  const gradient = cssGradient.match(/linear-gradient\((.*)\)/)?.[1];
  if (!gradient) {
    throw Error(`Invalid gradient: ${cssGradient}`);
  }
  const colorStops = [];
  let colorStop = '';
  for (let char of gradient) {
    if (colorStop.includes('(') && !colorStop.includes(')')) {
      colorStop += char;
    } else {
      if (char !== ',') {
        colorStop += char;
      } else {
        colorStops.push(colorStop.trim());
        colorStop = '';
      }
    }
  }
  if (colorStop) {
    colorStops.push(colorStop.trim());
  }
  let direction = 'to bottom';
  if (!isColor(colorStops[0])) {
    direction = colorStops.shift() as string;
  }
  const result: ColorStopType[] = [];
  for (let i = 0; i < colorStops.length; i++) {
    let [color, position] = colorStops[i].split(' ').map((item) => item.trim());
    result.push({
      color,
      position: position
        ? Number(position.slice(0, -1)) / 100
        : i / (colorStops.length - 1),
    });
  }
  return {
    direction,
    colorStops: result,
  };
}
