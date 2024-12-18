import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LearnerQualEvalForm = () => {
	const [learners, setLearners] = useState([]);
	const [qualCards, setQualCards] = useState([]);
	const [evaluators, setEvaluators] = useState([]);

	const [selectedLearner, setSelectedLearner] = useState('');
	const [selectedQualCard, setSelectedQualCard] = useState('');
	const [selectedEvaluator, setSelectedEvaluator] = useState('');

	// Fetch learners on component mount
	useEffect(() => {
		const fetchLearners = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_LEARNERS_API, {
					headers: {
						Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
						'Content-Type': 'application/json',
					},
				});

				// Assuming the API returns an array of learners
				// You might need to adjust this based on the actual API response structure
				setLearners(response.data);
			} catch (error) {
				console.error(
					'Error fetching learners:',
					error.response ? error.response.data : error.message
				);
				// Optionally set an error state or show a user-friendly error message
			}
		};

		fetchLearners();
	}, []);

	// Fetch Qual Cards and Evaluators on component mount
	// Mock data approach
	useEffect(() => {
		// If API call fails or you're testing locally
		const mockLearners = [
			{ id: '1', name: 'John Doe' },
			{ id: '2', name: 'Jane Smith' },
			{ id: '3', name: 'Bob Johnson' },
		];

		const fetchLearners = async () => {
			try {
				// Uncomment when you have actual API access
				// const response = await axios.get(process.env.REACT_APP_LEARNERS_API, {
				//   headers: {
				//     'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
				//   }
				// });
				// setLearners(response.data);

				// Temporary mock data approach
				setLearners(mockLearners);
			} catch (error) {
				console.error('Error fetching learners:', error);
				// Fallback to mock data
				setLearners(mockLearners);
			}
		};

		fetchLearners();
	}, []);

	// Filter evaluators based on selected Qual Card (Smart Filter Option)
	const getFilteredEvaluators = () => {
		if (!selectedQualCard) return [];

		// Assuming the evaluators JSON has a structure like:
		// [{ qualCard: 'CardName', evaluators: ['Evaluator1', 'Evaluator2'] }]
		const filteredEvaluatorData = evaluators.find(
			(item) => item.qualCard === selectedQualCard
		);

		return filteredEvaluatorData ? filteredEvaluatorData.evaluators : [];
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({
			learner: selectedLearner,
			qualCard: selectedQualCard,
			evaluator: selectedEvaluator,
		});
	};

	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ minHeight: '100vh' }}
		>
			<Card style={{ width: '400px' }}>
				<Card.Header>Learner Qualification Evaluation</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						{/* Learner Dropdown */}
						<Form.Group className="mb-3">
							<Form.Label>Learner</Form.Label>
							<Form.Select
								value={selectedLearner}
								onChange={(e) => setSelectedLearner(e.target.value)}
							>
								<option value="">Select Learner</option>
								{learners.map((learner) => (
									<option key={learner.id} value={learner.id}>
										{learner.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Qual Card Dropdown */}
						<Form.Group className="mb-3">
							<Form.Label>Qual Card</Form.Label>
							<Form.Select
								value={selectedQualCard}
								onChange={(e) => setSelectedQualCard(e.target.value)}
							>
								<option value="">Select Qual Card</option>
								{qualCards.map((card) => (
									<option key={card.id} value={card.id}>
										{card.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Evaluator Dropdown */}
						<Form.Group className="mb-3">
							<Form.Label>Evaluator</Form.Label>
							<Form.Select
								value={selectedEvaluator}
								onChange={(e) => setSelectedEvaluator(e.target.value)}
								disabled={!selectedQualCard}
							>
								<option value="">Select Evaluator</option>
								{getFilteredEvaluators().map((evaluator) => (
									<option key={evaluator.id} value={evaluator.id}>
										{evaluator.name}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							className="w-100"
							disabled={
								!selectedLearner || !selectedQualCard || !selectedEvaluator
							}
						>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default LearnerQualEvalForm;
