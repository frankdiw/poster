import { parse } from '@babel/parser';
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { isJSXElement, isJSXExpressionContainer, isJSXIdentifier, isJSXMemberExpression } from '@babel/types';
import fs from 'fs';
const ast = parse(fs.readFileSync('./index.jsx', { encoding: 'utf-8' }), { plugins: ['jsx'] });
const __DEV = process.env.NODE_ENV === 'development';
type Element = {
  type: string;
  props?: { children?: string | Element | (Element | string)[]; style?: Record<string, string | number> };
}
let level = 0;
let result: Element = {} as Element;
traverse(ast, {
  JSXElement: {
    enter() {
      level++;
    },
    exit() {
      level--;
    }
  },
  JSXOpeningElement: {
    enter(path) {
      let type: string | undefined = void 0;
      if (isJSXIdentifier(path.node.name)) {
        type = path.node.name.name;
      } else if (isJSXMemberExpression(path.node.name)) {
        if (process.env.NODE_ENV === 'development') {
          throw Error('暂不支持JSXMemberExpression');
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          throw Error('暂不支持JSXNamespacedName');
        }
      }
      if (typeof type !== 'undefined') {
        if (level === 1) {
          result = { type};
          path.parent.extra = {
            elementObject: result,
            ...path.parent.extra
          };
        } else if (level > 1) {
          const parentObject = path.parentPath?.parentPath?.node.extra?.elementObject as Element;
          const elementObject: Element = { type }
          path.parent.extra = {
            ...path.parent.extra,
            elementObject
          }
          if (parentObject) {
            if (Array.isArray(parentObject.props?.children)) {
              parentObject.props.children.push(elementObject);
            } else {
              parentObject.props = {
                ...parentObject.props,
                children: [elementObject]
              }
            }
          }
        }
      }
    }
  },
  JSXAttribute(path) {
    const key = path.node.name.name;
    if (key === 'style') {
      const node = path.node.value;
      let value: Record<string, string | number> = {};
      if (isJSXExpressionContainer(node)) {
        const expression = node.expression;
        const code = generate(expression).code;
        value = eval('(' + code + ')');
      } else {
        if (__DEV) {
          throw Error('style属性值必须是JSXExpressionContainer');
        }
      }
      const parent = path.findParent(function (path) {
        return isJSXElement(path.node);
      });
      const parenetElementObject = parent?.node.extra?.elementObject as Element;
      if (!parenetElementObject.props) {
        parenetElementObject.props = {};
      }
      if (value) {
        parenetElementObject.props[key] = value;
      }
    }

  },
  JSXText(path) {
    let text = path.node.value;
    text = text.trim();
    if (text) {
      const parenetElementObject = path.parent.extra?.elementObject as Element;
      if (parenetElementObject) {
        if (Array.isArray(parenetElementObject.props?.children)) {
          parenetElementObject.props.children.push(text);
        } else {
          parenetElementObject.props = {
            children: [text]
          }
        }
      }
    }
  }
});
console.log(JSON.stringify(result, null, 2));
