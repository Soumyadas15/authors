
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
            res.status(200).json(data.posts);
        break;

        case 'POST':
            const { author, body, reviews, views } = req.body;
            
            
            if (!author || !body) {
                return res.status(400).json({ message: 'Missing fields in request body' });
            }

            const newPost = {
                id: storeData.posts.length + 1,
                author,
                body,
                reviews,
                views,
            };

            storeData.posts.push(newPost);
            writeStoreFile(storeData);

            res.status(201).json(newPost);
        break;

        case 'DELETE':
            const { id } = req.query; 
            //@ts-ignore
            const postIndex = storeData.posts.findIndex(post => post.id === id);
            if (postIndex === -1) {
                return res.status(404).json({ message: 'Post not found' });
            }

            storeData.posts.splice(postIndex, 1);
            writeStoreFile(storeData);

            res.status(204).end();
            break;
        break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
