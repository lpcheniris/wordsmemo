import { NextFunction, Request, Response, Router } from 'express';
import { translateWords} from '../config/youdaoAPI';

// import data from './document.json'
export const QueryController: Router = Router();

QueryController.get('/:word', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await translateWords(req.params.word)
        res.status(200).send({ data });
    } catch (e) {
        next(e);
    }
});



