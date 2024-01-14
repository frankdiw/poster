import { Parser, Program } from "acorn";
import acornJsx from "acorn-jsx";
Parser.extend(acornJsx());

const ast = Parser.extend(acornJsx()).parse(
  `
  <div>
    {a.c.height}
  </div>

  `,
  {
    ecmaVersion: 2023,
  }
);

const data: any = {
  a: { b: "CESHIWENBEN", width: 200, c: { height: 2000 } },
  width: 200,
};

function extractTagsAndAttributes(node: any): any {
  // 处理字面量
  if (node.type === "Literal") {
    return node.value;
  }
  // 处理标识符
  if (node.type === "Identifier") {
    return node.name;
  }

  if (node.type === "JSXIdentifier") {
    return node.name;
  }

  // 处理文本
  if (node.type === "JSXText") {
    if (node.value.trim() !== "") {
      return node.value;
    }
    // 预处理文本
    return null;
  }
  // 处理JSXElement
  if (node.type === "JSXElement") {
    const type = node.openingElement.name.name;
    const props: Record<string, any> = {};
    for (let attribute of node.openingElement.attributes) {
      const key = attribute.name.name;
      const value = extractTagsAndAttributes(attribute.value);
      props[key] = value;
    }
    const children = node.children
      .map((item: any) => extractTagsAndAttributes(item))
      .filter(Boolean);
    if (children.length === 0) {
      return {
        type,
        props,
      };
    }
    if (children.length === 1 && typeof children[0] === "string") {
      return {
        type,
        props: { ...props, children: children[0] },
      };
    }
    return {
      type,
      props: { ...props, children },
    };
  }
  if (node.type === "JSXExpressionContainer") {
    return parseJSXExpressionContainer(node.expression, data);
    // return extractTagsAndAttributes(node.expression);
  }
  // 处理对象表达式
  if (node.type == "ObjectExpression") {
    const object: Record<string, any> = {};
    for (let property of node.properties) {
      object[extractTagsAndAttributes(property.key)] = extractTagsAndAttributes(
        property.value
      );
    }
    return object;
  }
  if (node.type === "MemberExpression") {
    // 处理变量
    return `${extractTagsAndAttributes(node.object)}.${extractTagsAndAttributes(
      node.property
    )}`;
  }
  // 处理属性节点
  if (node.type === "JSXAttribute") {
    const attributeKey = extractTagsAndAttributes(node.name);
    if (["style", "src"].includes(attributeKey)) {
      return {
        [attributeKey]: extractTagsAndAttributes(node.value),
      };
    }
    return null;
  }
  return null;
}

function parseJSXExpressionContainer(node: any, data?: any): any {
  switch (node.type) {
    case "Identifier": {
      return data ? data[node.name] : node.name;
    }
    case "Literal": {
      return node.value;
    }
    case "MemberExpression": {
      return parseJSXExpressionContainer(node.object, data)[
        parseJSXExpressionContainer(node.property)
      ];
    }
    case "ObjectExpression": {
      const object: Record<string, any> = {};
      for (let property of node.properties) {
        object[parseJSXExpressionContainer(property.key, data)] =
          parseJSXExpressionContainer(property.value, data);
      }
      return object;
    }
  }
}

// 提取标签名和属性
const json = extractTagsAndAttributes((ast.body[0] as any).expression);

console.log(JSON.stringify(json, null, 2));
