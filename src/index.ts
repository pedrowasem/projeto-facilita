import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';
import { NotesController, UsersController } from './controllers';
import {
	validateNoteId,
	validateNotesData,
	validateToken,
	validateUpdateNoteData,
	validateUserData,
} from './middlewares';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

const port = process.env.PORT;
const db = process.env.DB_CONNECTION;
const connectDB = async () => {
	try {
		await connect(db!);
		console.log('mongodb connected');
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

app.get('/', (req, res) => {
	return res.json('Hello World!');
});

app.listen(port, () => {
	connectDB();
	console.log(`listening on port ${port}!`);
});

// ===============================================

const usersController = new UsersController();

app.post('/users', validateUserData, usersController.create);

app.get('/users', usersController.listAllUsers);

app.post('/login', usersController.login);

const notesController = new NotesController();

app.post('/notes', validateToken, validateNotesData, notesController.create);

app.get('/notes', validateToken, notesController.listNotes);

app.put(
	'/notes/:id',
	validateToken,
	validateNoteId,
	validateUpdateNoteData,
	notesController.update,
);

app.delete('/notes/:id', validateToken, validateNoteId, notesController.delete);
