import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';

import './style.scss';

const LetterPopup = ({ setToggleModal, application, saveChanges, edit }) => {
	const [newApplication, setNewApplication] = useState({
		...application,
		letter: application.letter ? application.letter : '',
	});

	const onChange = (e) => {
		setNewApplication({
			...application,
			letter: e.target.value,
		});
	};

	return (
		<div className='popup'>
			<div className='popup-content'>
				<div className='popup-header'>
					<h4 className='popup-header-title'>Cover Letter</h4>
					<button
						type='button'
						className='btn close'
						onClick={(e) => {
							e.preventDefault();
							setToggleModal();
						}}
					>
						<ImCross />
					</button>
				</div>
				<div className='popup-text'>
					<textarea
						className='popup-text-input'
						name='letter'
						cols='30'
						value={newApplication.letter}
						disabled={!edit}
						placeholder='Cover letter'
						onChange={(e) => onChange(e)}
						rows='10'
					></textarea>
				</div>
				{edit && (
					<div className='text-centre'>
						<button
							type='button'
							className='btn add'
							onClick={(e) => {
								e.preventDefault();
								saveChanges(newApplication);
								setToggleModal();
							}}
						>
							<FiSave />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default LetterPopup;
