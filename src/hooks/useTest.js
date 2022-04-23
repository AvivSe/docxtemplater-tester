import { useEffect, useState } from 'react';
import testTemplate from '../utils/doxtemplater-tester';

export function useTest({ files }) {
  const [tested, setTested] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function test() {
      await Promise.all(
        files.map(async (file) => {
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
      setTested(files);
    }
    test();
  }, [files]);

  return {
    tested,
    testing: loading,
  };
}
