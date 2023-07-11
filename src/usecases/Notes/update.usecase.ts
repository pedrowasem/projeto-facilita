import Note from '../../classes/note.class';

export type UpdateNoteDTO = {
	id: string;
	title: string;
	description: string;
};

type UpdateReturn = {
	success: boolean;
	message: string;
	updatedData?: any;
};

export class UpdateNote {
	#data: UpdateNoteDTO;

	constructor(data: UpdateNoteDTO) {
		this.#data = data;
	}

	public async execute(): Promise<UpdateReturn> {
		console.log(this.#data);

		const note = await Note.findByIdAndUpdate(
			{ _id: this.#data.id },
			{
				_title: this.#data.title,
				_description: this.#data.description,
			},
		);
		const UpdateNote = await Note.findById(this.#data.id);

		if (!UpdateNote) {
			return {
				success: false,
				message: 'Id does not exist',
			};
		}

		return {
			success: true,
			message: 'Note updated successfully',
			updatedData: UpdateNote,
		};
	}
}
