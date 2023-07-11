import { NoteDTO } from '../../classes';
import Note from '../../classes/note.class';

export type CreateNoteDTO = {
	title: string;
	description: string;
	userId: string;
};

type CreateNoteReturn = {
	success: boolean;
	message: string;
	note?: NoteDTO;
};

export class CreateNote {
	#data: CreateNoteDTO;

	constructor(data: CreateNoteDTO) {
		this.#data = data;
	}

	async execute(): Promise<CreateNoteReturn> {
		const newNote = new Note({
			_title: this.#data.title,
			_description: this.#data.description,
			_userId: this.#data.userId,
			_createdAt: new Date().toLocaleDateString('pt-Br', {
				dateStyle: 'short',
			}),
		});

		await newNote.save();

		return { success: true, message: 'Note created successfully', note: newNote };
	}
}
