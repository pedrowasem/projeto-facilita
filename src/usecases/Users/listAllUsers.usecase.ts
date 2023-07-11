import User from '../../classes/users.class';

export type ListUserDTO = {
	_id: string;
	_name: string;
};

type ListReturn = {
	success: boolean;
	message: string;
	users: any;
};

export class ListAllUsers {
	public async execute(): Promise<ListReturn> {
		const users = await User.find();

		if (!users.length) {
			return {
				success: false,
				message: 'No users stored',
				users: [],
			};
		}
		return {
			success: true,
			message: 'Listed all users successfully',
			users: users,
		};
	}
}
