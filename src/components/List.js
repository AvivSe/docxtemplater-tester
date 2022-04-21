import useFiles from '../hooks/useFiles';
import { useEffect, useState } from 'react';
import testTemplate from '../utils/doxtemplater-tester';

function List() {
  const files = useFiles();
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function test() {
      await Promise.all(
        files.list.map(async (file) => {
          try {
            setLoading(true);
            await testTemplate(file);
            file.error = undefined;
          } catch (e) {
            file.error = e;
          } finally {
            setLoading(false);
          }
        })
      );
      setChecked(files.list);
    }
    test();
  }, [files.list]);

  if (loading) {
    return 'Loading...';
  }
  return (
    <ul>
      {checked.map((file, i) => (
        <li key={i} style={{ color: file.error ? 'red' : 'green' }}>
          {file.path}
        </li>
      ))}
    </ul>
  );
}

export default List;
