## poster

> poster是基于 jsx 搭建，使用 node-canvas 绘制的海报生成库

## 使用方式

通过 jsx 进行编辑，采用行内样式进行布局，支持 flex 布局。可以给 jsx 传入 props.

## 样式支持情况

<table>
<thead>
<tr>
  <th>Property</th>
  <th>Property Expanded</th>
  <th>Supported Values</th>
</tr>
</thead>
<tbody>

<tr>
  <td colSpan="2">
    <code>display</code>
  </td>
  <td>
    <code>none</code> and <code>flex</code>, default to <code>flex</code>
  </td>
</tr>

<tr>
  <td colSpan="2">
    <code>position</code>
  </td>
  <td>
    <code>relative</code> and <code>absolute</code>, default to{' '}
    <code>relative</code>
  </td>
</tr>

<tr>
  <td colSpan="2">
    <code>color</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="5">
    <code>margin</code>
  </td>
</tr>
<tr>
  <td>
    <code>marginTop</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>marginRight</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>marginBottom</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>marginLeft</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="5">Position</td>
</tr>
<tr>
  <td>
    <code>top</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>right</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>bottom</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>left</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="3">Size</td>
</tr>
<tr>
  <td>
    <code>width</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>height</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="5">Min & max size</td>
</tr>
<tr>
  <td>
    <code>minWidth</code>
  </td>
  <td>
    Supported except for <code>min-content</code>, <code>max-content</code> and{' '}
    <code>fit-content</code>
  </td>
</tr>
<tr>
  <td>
    <code>minHeight</code>
  </td>
  <td>
    Supported except for <code>min-content</code>, <code>max-content</code> and{' '}
    <code>fit-content</code>
  </td>
</tr>
<tr>
  <td>
    <code>maxWidth</code>
  </td>
  <td>
    Supported except for <code>min-content</code>, <code>max-content</code> and{' '}
    <code>fit-content</code>
  </td>
</tr>
<tr>
  <td>
    <code>maxHeight</code>
  </td>
  <td>
    Supported except for <code>min-content</code>, <code>max-content</code> and{' '}
    <code>fit-content</code>
  </td>
</tr>

<tr>
  <td rowSpan="5">
    <code>border</code>
  </td>
</tr>
<tr>
  <td>
    Width (<code>borderWidth</code>, <code>borderTopWidth</code>, ...)
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    Style (<code>borderStyle</code>, <code>borderTopStyle</code>, ...)
  </td>
  <td>
    <code>solid</code> and <code>dashed</code>, default to <code>solid</code>
  </td>
</tr>
<tr>
  <td>
    Color (<code>borderColor</code>, <code>borderTopColor</code>, ...)
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    Shorthand (<code>border</code>, <code>borderTop</code>, ...)
  </td>
  <td>
    Supported, i.e. <code>1px solid #000</code>
    <br />
  </td>
</tr>

<tr>
  <td rowSpan="6">
    <code>borderRadius</code>
  </td>
</tr>
<tr>
  <td>
    <code>borderTopLeftRadius</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>borderTopRightRadius</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>borderBottomLeftRadius</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>borderBottomRightRadius</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>Shorthand</td>
  <td>
    Supported, i.e. <code>5px</code>
  </td>
</tr>

<tr>
  <td rowSpan="11">Flex</td>
</tr>
<tr>
  <td>
    <code>flexDirection</code>
  </td>
  <td>
    <code>column</code>, <code>row</code>, <code>row-reverse</code>,{' '}
    <code>column-reverse</code>, default to <code>row</code>
  </td>
</tr>
<tr>
  <td>
    <code>flexWrap</code>
  </td>
  <td>
    <code>wrap</code>, <code>nowrap</code>, <code>wrap-reverse</code>, default
    to <code>wrap</code>
  </td>
</tr>
<tr>
  <td>
    <code>flexGrow</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>flexShrink</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>flexBasis</code>
  </td>
  <td>
    Supported except for <code>auto</code>
  </td>
</tr>
<tr>
  <td>
    <code>alignItems</code>
  </td>
  <td>
    <code>stretch</code>, <code>center</code>, <code>flex-start</code>,{' '}
    <code>flex-end</code>, <code>baseline</code>, <code>normal</code>, default
    to <code>stretch</code>
  </td>
</tr>
<tr>
  <td>
    <code>alignContent</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>alignSelf</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>justifyContent</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>gap</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="4">Font</td>
</tr>
<tr>
  <td>
    <code>fontSize</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>fontWeight</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>fontStyle</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="6">Text</td>
</tr>
<tr>
  <td>
    <code>textAlign</code>
  </td>
  <td>
    <code>left</code>, <code>right</code>, <code>center</code>,, default to{' '}
    <code>left</code>
  </td>
</tr>
<tr>
  <td>
    <code>textOverflow</code>
  </td>
  <td>
    <code>clip</code>, <code>ellipsis</code>, defaults to <code>clip</code>
  </td>
</tr>
<tr>
  <td>
    <code>textShadow</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>lineHeight</code>
  </td>
  <td>Supported</td>
</tr>
<tr>
  <td>
    <code>letterSpacing</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td rowSpan="1">Background</td>
  <td colSpan="2">
    Support <code>color</code>、<code>linear-gradient</code>、<code>url</code>
  </td>
</tr>
<tr>
  <td rowSpan="1">color</td>
  <td colSpan="2">
    Support <code>rgba</code>、<code>16进制</code>、<code>hsla</code>
  </td>
</tr>
<tr>
  <td colSpan="2">
    <code>opacity</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
  <td colSpan="2">
    <code>boxShadow</code>
  </td>
  <td>Supported</td>
</tr>

<tr>
<td colSpan="2"><code>lineClamp</code></td>
<td>Supported</td>
</tr>
</tbody>
</table>

## 海报服务接口使用方式

```javascript
import poster from '@frankdiw/poster';
export async function POST(request: NextRequest) {
  const data = await request.json();
  const base64 = await poster({ ...data, returnType: 'base64' });
  return Response.json({
    url: base64
  });
}

```
