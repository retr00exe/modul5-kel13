import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';
import axios from '../utils/axios';

function AddUserDialog({ open, onClose, id, users, setUsers }) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const handleSubmit = () => {
		axios
			.put(`/user/${id}`, {
				firstName,
				lastName,
			})
			.then((res) => {
				setUsers(users.map((user) => (user.id !== res.data.id ? user : res.data)));
				onClose();
			})
			.catch((err) => console.log(err));
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Update user</DialogTitle>
			<DialogContent
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '.5rem',
					padding: '8px 20px',
				}}
			>
				<TextField
					name="firstName"
					label="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<TextField
					name="lastName"
					label="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
				<Button onClick={handleSubmit}>Update</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddUserDialog;
