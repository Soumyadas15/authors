import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'store.json');

export const readDataFile = () => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};

export const writeDataFile = (data : any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};