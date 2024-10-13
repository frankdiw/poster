import swc from '@swc/core';
import vm from 'vm';
export const parse = (jsx: string, props: Record<string, any>) => {
  const { code } = swc.transformSync(jsx, {
    jsc: {
      parser: {
        syntax: 'ecmascript',
        jsx: true,
      },
      transform: {
        react: {
          pragma: 'h',
        },
      },
    },
  });
  return vm.runInNewContext(
    `
    function h(type, props, ...children) {
      if (typeof type === 'function') {
        return type({
          ...props,
          children,
        });
      }
      return { type, style: props?.style || void 0, children };
    }
    ${code};
    Poster(props)
  `,
    { props }
  );
};
