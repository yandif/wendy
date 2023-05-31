import {
  Component,
  ComponentType,
  lazy,
  PropsWithoutRef,
  PropsWithRef,
  ReactNode,
  RefAttributes,
  Suspense,
} from 'react';

type Fn<P> = () => Promise<{ default: ComponentType<P> }>;

type AsyncRouterProps<P> = JSX.IntrinsicAttributes &
  (
    | (PropsWithoutRef<P> & RefAttributes<Component<P, any, any>>)
    | PropsWithRef<P>
  );

/**
 * @description: 按需异步加载组件
 */
export default function asyncRouter<P>(fn: Fn<P>, fallback: ReactNode = null) {
  return function AsyncRoute(props: AsyncRouterProps<P>) {
    const { ...otherProps } = props;
    const Component = lazy(fn);
    return (
      <Suspense fallback={fallback}>
        <Component {...otherProps} />
      </Suspense>
    );
  };
}
