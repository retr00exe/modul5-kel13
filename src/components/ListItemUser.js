import React, { useState } from 'react';
import {
	Avatar,
	Stack,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Button,
} from '@mui/material';
import axios from '../utils/axios';
import UpdateUserDialog from './UpdateUserDialog';

function ListItemUser({ id, image, primaryText, secondaryText, users, setUsers }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDelete = () => {
		axios
			.delete(`/user/${id}`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<Stack spacing={1.5} sx={{ px: 3, py: 1.5 }}>
			<ListItem>
				<ListItemAvatar sx={{ marginRight: 2 }}>
					<Avatar alt="avatar" src={image} sx={{ width: 75, height: 75 }} />
				</ListItemAvatar>
				<ListItemText
					sx={{ cursor: 'pointer' }}
					onClick={() => setIsDialogOpen(true)}
					primary={<Typography variant="h6">{primaryText}</Typography>}
					secondary={<Typography variant="p">{secondaryText}</Typography>}
				/>
				{isDialogOpen && (
					<UpdateUserDialog
						open={isDialogOpen}
						onClose={() => setIsDialogOpen(false)}
						id={id}
						users={users}
						setUsers={setUsers}
					/>
				)}
			</ListItem>
			<Button variant="contained" size="small" onClick={handleDelete}>
				Delete
			</Button>
		</Stack>
	);
}

export default ListItemUser;
