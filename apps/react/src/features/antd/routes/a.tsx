import { Button, Toaster, toast } from '@kitten-ui/core';

export const A = () => {
  return (
    <div className="bg-red-500">
      <Toaster />B
      <Button
        onClick={() => {
          toast({ message: '123132' });
        }}>
        按钮
      </Button>
    </div>
  );
};
