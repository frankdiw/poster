export function calculateGradientCoordinate({
  left,
  top,
  width,
  height,
  direction,
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  direction: number | string;
}) {
  if (typeof direction === 'string') {
    if (direction === 'topRight') {
      return { x0: left, y0: height + top, x1: width + left, y1: top };
    } else if (direction === 'topLeft') {
      return { x0: left + width, y0: top + height, x1: left, y1: top };
    } else if (direction === 'bottomLeft') {
      return { x0: width + left, y0: top, x1: left, y1: height + top };
    } else {
      return { x0: left, y0: top, x1: width + left, y1: height + top };
    }
  }
  if (direction >= 360) direction = direction - 360;
  if (direction < 0) direction = direction + 360;
  direction = Math.round(direction);

  // 当渐变轴垂直于矩形水平边上的两种结果
  if (direction === 0) {
    return {
      x0: Math.round(width / 2) + left,
      y0: height + top,
      x1: Math.round(width / 2) + left,
      y1: top,
    };
  }
  if (direction === 180) {
    return {
      x0: Math.round(width / 2) + left,
      y0: top,
      x1: Math.round(width / 2) + left,
      y1: height + top,
    };
  }

  // 当渐变轴垂直于矩形垂直边上的两种结果
  if (direction === 90) {
    return {
      x0: left,
      y0: Math.round(height / 2) + top,
      x1: width + left,
      y1: Math.round(height / 2) + top,
    };
  }
  if (direction === 270) {
    return {
      x0: width + left,
      y0: Math.round(height / 2) + top,
      x1: left,
      y1: Math.round(height / 2) + top,
    };
  }

  // 从矩形左下角至右上角的对角线的角度
  const alpha = Math.round((Math.asin(width / Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))) * 180) / Math.PI);

  // 当渐变轴分别于矩形的两条对角线重合情况下的四种结果
  if (direction === alpha) {
    return {
      x0: left,
      y0: height + top,
      x1: width + left,
      y1: top,
    };
  }
  if (direction === 180 - alpha) {
    return {
      x0: left,
      y0: top,
      x1: width + left,
      y1: height + top,
    };
  }
  if (direction === 180 + alpha) {
    return {
      x0: width + left,
      y0: top,
      x1: left,
      y1: height + top,
    };
  }
  if (direction === 360 - alpha) {
    return {
      x0: width + left,
      y0: height + top,
      x1: left,
      y1: top,
    };
  }

  // 以矩形的中点为坐标原点，向上为Y轴正方向，向右为X轴正方向建立直角坐标系
  let x0 = 0,
    y0 = 0,
    x1 = 0,
    y1 = 0;

  // 当渐变轴与矩形的交点落在水平线上
  if (
    direction < alpha || // 处于第一象限
    (direction > 180 - alpha && direction < 180) || // 处于第二象限
    (direction > 180 && direction < 180 + alpha) || // 处于第三象限
    direction > 360 - alpha // 处于第四象限
  ) {
    // 将角度乘以（PI/180）即可转换为弧度
    const radian = (direction * Math.PI) / 180;
    // 当在第一或第四象限，y是height / 2，否则y是-height / 2
    const y = direction < alpha || direction > 360 - alpha ? height / 2 : -height / 2;
    const x = Math.tan(radian) * y;
    // 当在第一或第二象限，l是width / 2 - x，否则l是-width / 2 - x
    const l = direction < alpha || (direction > 180 - alpha && direction < 180) ? width / 2 - x : -width / 2 - x;
    const n = Math.pow(Math.sin(radian), 2) * l;
    x1 = x + n;
    y1 = y + n / Math.tan(radian);
    x0 = -x1;
    y0 = -y1;
  }

  // 当渐变轴与矩形的交点落在垂直线上
  if (
    (direction > alpha && direction < 90) || // 处于第一象限
    (direction > 90 && direction < 180 - alpha) || // 处于第二象限
    (direction > 180 + alpha && direction < 270) || // 处于第三象限
    (direction > 270 && direction < 360 - alpha) // 处于第四象限
  ) {
    // 将角度乘以（PI/180）即可转换为弧度
    const radian = ((90 - direction) * Math.PI) / 180;
    // 当在第一或第二象限，x是width / 2，否则x是-width / 2
    const x =
      (direction > alpha && direction < 90) || (direction > 90 && direction < 180 - alpha) ? width / 2 : -width / 2;
    const y = Math.tan(radian) * x;
    // 当在第一或第四象限，l是height / 2 - y，否则l是-height / 2 - y
    const l =
      (direction > alpha && direction < 90) || (direction > 270 && direction < 360 - alpha)
        ? height / 2 - y
        : -height / 2 - y;
    const n = Math.pow(Math.sin(radian), 2) * l;
    x1 = x + n / Math.tan(radian);
    y1 = y + n;
    x0 = -x1;
    y0 = -y1;
  }

  // 坐标系更改为canvas标准，Y轴向下为正方向
  x0 = Math.round(x0 + width / 2) + left;
  y0 = Math.round(height / 2 - y0) + top;
  x1 = Math.round(x1 + width / 2) + left;
  y1 = Math.round(height / 2 - y1) + top;

  return { x0: x0, y0: y0, x1, y1 };
}
