import axios from 'axios';

export default axios.create({
	baseURL: process.env.REACT_APP_BASE_API_URL,
	headers: {
		'app-id': process.env.REACT_APP_API_KEY,
	},
});
