import { NoteDTO } from '../../classes';
import Note from '../../classes/note.class';

type DeleteNoteReturn = {
	success: boolean;
	message: string;
	deletedNote?: NoteDTO;
};

export class DeleteNote {
	#id: string;

	constructor(id: string) {
		this.#id = id;
	}

	public async execute(): Promise<DeleteNoteReturn> {
		const note = await Note.findByIdAndDelete({ _id: this.#id });

		if (!note) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		return {
			success: true,
			message: 'Note deleted successfully',
			deletedNote: note,
		};
	}
}
