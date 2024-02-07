import { readDataFile, writeDataFile } from "@/utils/dataHelpers";

export default function handler(req : any, res : any) {
    const { id } = req.query;
    const data = readDataFile();
    
    switch (req.method) {

        case 'GET':

            //@ts-ignore
            const post = data.posts.find(post => post.id === parseInt(id));
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(post);

            break;

        case 'DELETE':

            //@ts-ignore
            const postIndex = data.posts.findIndex(post => post.id === parseInt(id));
            if (postIndex === -1) {
                return res.status(404).json({ message: 'Post not found' });
            }

            data.posts.splice(postIndex, 1);
            writeDataFile(data);

            res.status(200).json({ message: 'Post deleted successfully' });
            break;
        default:
            res.setHeader('Allow', ['GET', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}