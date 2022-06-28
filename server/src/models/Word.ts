import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    query: { type: String, required: true, unique: true},
    translation: {type: Array, required:true },
    l: {type: String, require: true },
    explains: {type: Array, require: true},
    phonetic: {type: String, require: true},
    enTozh: { type: Boolean, require: true, default: false},
    zhToen: { type: Boolean, require: true, default: false},
    voiceToen: { type: Boolean, require: true, default: false},
    isRemember: { type: Boolean, require: true, default: false},
})

export const Word = mongoose.model("Word", WordSchema)