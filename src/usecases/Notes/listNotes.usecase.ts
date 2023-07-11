import Note from '../../classes/note.class';

export type ListNotesDTO = {
	id: string;
	title: string;
	description: string;
};

type ListNotesReturn = {
	success: boolean;
	message: string;
	notes: any;
};

export class ListAllNotes {
	#userId: string;

	constructor(userId: string) {
		this.#userId = userId;
	}
	public async execute(): Promise<ListNotesReturn> {
		const notes = await Note.find({ _userId: this.#userId });

		if (!notes.length) {
			return {
				success: false,
				message: 'No notes stored',
				notes: [],
			};
		}
		return {
			success: true,
			message: 'Listed all notes successfully',
			notes: notes,
		};
	}
}
