import mongoose, { Document, Schema } from 'mongoose';

export type NoteDTO = {
	_id: string;
	_title: string;
	_description: string;
	_userId: string;
	_createdAt: Date;
};

export interface I_NoteDocument extends Document {
	_title: string;
	_description: string;
	_userId: string;
	_createdAt: Date;
}

const NoteSchema: Schema<I_NoteDocument> = new Schema({
	_title: { type: 'string', required: true },
	_description: { type: 'string', required: true },
	_userId: { type: 'string', required: true },
	_createdAt: { type: 'Date', required: true },
});

export default mongoose.model<I_NoteDocument>('Note', NoteSchema);
