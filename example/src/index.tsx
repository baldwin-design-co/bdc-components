import React from 'react';
import ReactDOM from 'react-dom';
import { FormModal } from 'bdc-components';

const App = () => {
	return (
		<FormModal
			name="Sign Up"
			fieldStructures={{
				name: { type: 'text', helpText: 'is this helpful' },
				dob: { type: 'date' },
				'favorite food': {
					type: 'option',
					options: [ 'pizza', 'salad', 'cookies', 'macaroni', 'chicken' ]
				},
				headshot: { type: 'file', helpText: 'is this helpful?' },
				bio: { type: 'text', multiline: true }
			}}
			initialValues={{
				name: 'Ben Baldwin'
			}}
			handleSubmit={console.log}
			handleClose={() => console.log('close')}
		/>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
