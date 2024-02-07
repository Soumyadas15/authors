
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


const readStoreFile = () => {
    const filePath = path.join(process.cwd(), 'public', 'store.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
};

const writeStoreFile = (data: any) => {
    const filePath = path.join(process.cwd(), 'public', 'store.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const storeData = readStoreFile();

    switch (req.method) {
        case 'GET':
            const data = readStoreFile();
            res.status(200).json(data.authors);
        break;

        case 'POST':
            const { firstName, lastName, posts } = req.body;
            
            if (!firstName || !lastName) {
                return res.status(400).json({ message: 'Missing fields in request body' });
            }
            const newUser = {
                id: storeData.authors.length + 1,
                firstName,
                lastName,
                posts,
            };

            storeData.authors = storeData.authors || []; 
            storeData.authors.push(newUser);
            writeStoreFile(storeData);

            res.status(201).json(newUser);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
