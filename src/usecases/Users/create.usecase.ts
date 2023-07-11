import bcrypt from 'bcrypt';
import { I_UserDocument } from '../../classes';
import User from '../../classes/users.class';

export type SignUserDTO = {
	name: string;
	password: string;
};

type SignUserReturn = {
	success: boolean;
	message: string;
	newUser?: Partial<I_UserDocument>;
};

export class SignUser {
	#data: SignUserDTO;

	constructor(data: SignUserDTO) {
		this.#data = data;
	}

	async execute(): Promise<SignUserReturn> {
		const userExist = await User.findOne({
			_name: this.#data.name,
		});

		if (userExist) {
			return {
				success: false,
				message: 'User already exists',
			};
		}
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(this.#data.password, salt);

		const newUser = new User({
			_name: this.#data.name,
			_password: hashedPassword,
			_notes: [],
		});

		console.log(newUser);

		await newUser.save();

		return {
			success: true,
			message: 'User created successfully',
			newUser,
		};
	}
}
