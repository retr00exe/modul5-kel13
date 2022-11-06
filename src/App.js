import { useState, useEffect } from 'react';
import { AddCircle } from '@mui/icons-material';
import { IconButton, List, Paper, Typography } from '@mui/material';
import axios from './utils/axios';
import ListItemUser from './components/ListItemUser';
import AddUserDialog from './components/AddUserDialog';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
	const [users, setUsers] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {
		(async () => {
			await axios
				.get('/user?limit=10')
				.then((res) => {
					const { data } = res.data;
					setUsers(data);
				})
				.catch((err) => {
					console.log(err);
					window.alert(err);
				});
		})();
	}, []);

	const getGender = (title) => (title === 'mr' ? 'Male' : 'Female');

	return (
		<div className="App">
			<div className="list-container">
				<div className="list-title-wrapper">
					<Typography variant="h4">List User</Typography>
					<IconButton onClick={() => setIsDialogOpen(true)}>
						<AddCircle />
					</IconButton>
				</div>
				<Paper elevation={4} style={{ maxHeight: '700px', overflow: 'auto' }}>
					<List>
						{users.map((d) => (
							<ListItemUser
								key={d.id}
								id={d.id}
								image={d.picture}
								primaryText={`${d.firstName} ${d.lastName}`}
								secondaryText={`Gender: ${getGender(d.title)}`}
								users={users}
								setUsers={setUsers}
							/>
						))}
					</List>
				</Paper>
			</div>
			{isDialogOpen && (
				<AddUserDialog
					open={isDialogOpen}
					onClose={() => setIsDialogOpen(false)}
					users={users}
					setUsers={setUsers}
				/>
			)}
		</div>
	);
}

export default App;

