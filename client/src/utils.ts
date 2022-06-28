export const isEmpty = (obj: object) => Object.keys(obj).length === 0;

export const getAudioUrl = (query: string) => `https://dict.youdao.com/dictvoice?audio=${query}&type=2`

export const fixExplains = (explains: Array<string>) => explains.map((v: string) => v.split("；")[0])

export const getRadomNumber = (num: number) => Math.floor(Math.random() * num)

export const disorganizeArray = (array:Array<any>) => array.sort(() => 0.5-Math.random()) 

export const generateRememberList = (wordList: Array<any>) => {
    if (wordList.length < 1) {
        return []
    }
    let result: Array<object> = []
    wordList.forEach((v, i) => {

        let withoutOptionList: any[] = []
        Object.assign(withoutOptionList, wordList)
        withoutOptionList.splice(i, 1)
        const sortOptionList = disorganizeArray(withoutOptionList)
        let optionList = sortOptionList.slice(0, 3).concat([v])
        optionList =optionList.sort(() => 0.5 - Math.random())
        let enOption = optionList.map(item => item.explains.join(" "))
        let zhOption = optionList.map(item => item.query)
        
        if (!v.enTozh) {
            result.push({
                type: "enTozh",
                word: v.query,
                options: enOption,
                correct: v.explains.join(" "),
                query: v.query
            })
        }
        if (!v.zhToen) {
            result.push({
                type: "zhToen",
                word: v.explains.join(" "),
                options: zhOption,
                correct: v.query,
                query: v.query
                
            })
        }

        if (!v.voiceToen) {
            result.push({
                type: "voiceToen",
                word: v.query,
                options: enOption,
                correct: v.explains.join(" "),
                query: v.query
            })
        }
    })
    return disorganizeArray(result)
} 