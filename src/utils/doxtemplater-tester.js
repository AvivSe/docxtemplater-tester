import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

async function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      resolve(result);
    });
    reader.readAsBinaryString(file);
  });
}

async function testTemplate(file) {
  const content = await readFile(file);
  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
  });
  doc.render({});
}

export default testTemplate;
