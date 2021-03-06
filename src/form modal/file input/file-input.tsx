import React from 'react';
import { Field } from '../form-modal'
import UploadIcon from '@material-ui/icons/Backup';
import { useStyles } from './styles'

export interface FileFieldStructure extends Field {
	type: 'file';
	fileTypes?: string[];
}

interface FileInputProps {
	fieldStructure: FileFieldStructure;
	name: string
	value?: string | File | null;
	error?: string;
	handleChange: (name: string, value: File | string | null) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ fieldStructure, name, value, error, handleChange }) => {
	const classes = useStyles()

	const previewFile = (image?: string | File | null) => {
		const reader = new FileReader()
		const imagePreview = document.querySelector(`#${name}-preview`)! as HTMLImageElement

		reader.onload = e => {
			imagePreview.src = typeof e.target?.result === 'string' ? e.target?.result : ''
		}

		const filePreviews = {
			audio: 'https://baldwindesign.co/images/audio-preview.png',
			file: 'https://baldwindesign.co/images/file-preview.png'
		}

		if (image && typeof image !== 'string') {
			if (image.type.includes('image')) {
				reader.readAsDataURL(image)
			} else if (image.type.includes('audio')) {
				imagePreview.src = filePreviews.audio
			} else {
				imagePreview.src = filePreviews.file
			}
		}
		if (typeof image === 'string') imagePreview.src = image
	}

	return (
		<div>
			<input
				type="file"
				id={name + '-input'}
				accept={fieldStructure.fileTypes?.join()}
				style={{ display: 'none' }}
				onChange={e => {
					handleChange(name, e.target.files ? e.target.files[0] : null)
					previewFile(e.target.files ? e.target.files[0] : null)
				}}
			/>

				<label
					id={name + '-label'}
					htmlFor={name + '-input'}
					className={`${classes.file_upload} ${error && classes.error}`}
					tabIndex={0}
				>
					<div className={`${classes.upload_overlay} ${error && classes.error}`}>
						<UploadIcon />
						<label>{fieldStructure.label || name}</label>
					</div>

					<img
						id={`${name}-preview`}
						src={typeof value === 'string' ? value : undefined}
						className={classes.image_preview}
					/>
				</label>

			{fieldStructure.helpText || error ? (
				<p className={`${classes.help_text} ${error && classes.error}`}>
					{error || fieldStructure.helpText}
				</p>
			) : null}
		</div>
	);
}
