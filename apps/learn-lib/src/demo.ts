type Demo = {
  title: string;
  component: React.FC;
};

export const demos: Demo[] = [];

export const register = (demo: Demo) => {
  demos.push(demo);
};
