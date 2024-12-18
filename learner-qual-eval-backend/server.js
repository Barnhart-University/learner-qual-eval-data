const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// API proxy endpoint
app.get('/api/learners', async (req, res) => {
	try {
		const response = await axios.get(process.env.LEARNERS_API_URL, {
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
			},
		});
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching learners:', error);
		res.status(500).json({ error: 'Failed to fetch learners' });
	}
});

// Add more proxy endpoints as needed

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
