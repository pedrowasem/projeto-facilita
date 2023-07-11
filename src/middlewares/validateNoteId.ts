import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export function validateNoteId(request: Request, response: Response, next: NextFunction) {
	const { id } = request.params;

	if (!id) {
		return response.status(400).json({
			sucesso: false,
			mensagem: 'Id is required',
			dados: null,
		});
	}
	const isValisId = mongoose.isValidObjectId(id);

	if (!isValisId) {
		return response.status(400).json({
			sucesso: false,
			mensagem: 'Id is not valid',
			dados: null,
		});
	}

	next();
}
