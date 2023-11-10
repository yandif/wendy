'use server';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '@/components/Welcome/Welcome';

export default async function BlogPage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
