import mongoose, { Document, Schema } from 'mongoose';
import { NoteDTO } from './note.class';

export interface I_UserDocument extends Document {
	_name: string;
	_password: string;
	_notes: NoteDTO[];
}

const UserSchema: Schema<I_UserDocument> = new Schema({
	_name: { type: 'string', unique: true, required: true },
	_password: { type: 'string', required: true },
	_notes: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.model<I_UserDocument>('User', UserSchema);
