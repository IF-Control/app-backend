import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const newName = file.originalname.normalize("NFD").replace(/\s/g, '');
                    const fileName = `${fileHash}-${newName}`;

                    return callback(null, fileName);
                }
            }),
            fileFilter: (req: Request, file, callback) => {
                const acceptableExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];
                
                if (!(acceptableExtensions.includes(extname(file.originalname)))){
                  return callback(new Error('Extensão não permitida'));
                }
                
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 400000) { // 400Kb
                  return callback(new Error('Tamanho excedido: Envie arquivos apenas menores que 400Kb.'));
                }

                callback(null, true);
              }
        }
    }
}