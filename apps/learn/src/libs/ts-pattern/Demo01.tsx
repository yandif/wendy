import { match } from 'ts-pattern';

type Permission = 'editor' | 'viewer';
type Plan = 'basic' | 'pro';

const fn2 = (org: Plan, user: Permission) =>
  match([org, user])
    .with(['basic', 'viewer'], (...v) => {
      console.log(v);
      return 1;
    })
    .with(['basic', 'editor'], () => 2)
    .with(['pro', 'viewer'], () => 3)
    .with(['pro', 'editor'], () => 4)
    .exhaustive(); // Works!

export const Demo01 = () => {
  return (
    <>
      <div>'basic', 'editor':{fn2('basic', 'viewer')}</div>
      <div>'pro', 'viewer':{fn2('pro', 'viewer')}</div>
    </>
  );
};
