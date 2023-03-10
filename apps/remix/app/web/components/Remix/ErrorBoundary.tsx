import ErrorMessage from '../ErrorMessage';
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <ErrorMessage label="Error" title={error.message} />;
}
