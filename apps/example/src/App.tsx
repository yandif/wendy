import Editor from '@wendy/mantine-tiptap';

function App() {
  return (
    <div>
      <Editor
        onChange={function (val: string) {
          console.log(val);
        }}
      />
    </div>
  );
}

export default App;
