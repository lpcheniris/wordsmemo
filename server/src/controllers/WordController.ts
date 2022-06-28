import { NextFunction, Request, Response, Router } from 'express';


import { Word } from '../models/Word'

export const WordController: Router = Router();

WordController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    let result = {}
    try {
        let isExist = await Word.exists({ query: data.query })
        if (!isExist) {
            await new Word(data).save()
            result = {
                text: "This word is saved"
            }
        } else {
          result = {
              text: "This word is exist"
          }
        }
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.get('/:query', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.findOne({ query: req.params.query }).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.delete('/:query', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.remove({ query: req.params.query }).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});
WordController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.find().exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});
WordController.get('/queryByCondition/:condition', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params)
    try {
        let queryCondition:object = {}
        if(req.params.condition === "checkRemember") {
            queryCondition = {isRemember: false}
        } else if (req.params.condition === "remember"){
            queryCondition = {$or:[{enTozh: false}, {voiceToen: false}, { zhToen: false }]}
        } else {
            queryCondition = {}
        }
        const result = await Word.find(queryCondition).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.put('/uptateRememberStatus/:word/:status', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { word, status } = req.params
        console.log(word, status)
        let updataData = {}
        if(status === "yes") {
            updataData = {isRemember: true}
        } else if(status === "no"){
            updataData = {isRemember: false,enTozh: false,voiceToen: false,zhToen: false }
        }
        console.log(updataData)
        const data = await Word.findOneAndUpdate({query: word},updataData, {new: true, useFindAndModify: false}) // 
        res.status(200).send({ data });
    } catch (e) {
        next(e);
    }
});

WordController.put('/:word', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const data = await Word.findOneAndUpdate({query: req.params.word}, req.body, {new: true, useFindAndModify: false}) // 
        res.status(200).send({ data });
    } catch (e) {
        next(e);
    }
});