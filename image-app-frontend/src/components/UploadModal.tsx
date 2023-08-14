import React from 'react';
import { uploadModalData } from '../interfaces/project';

const UploadModal = ({
	isOpen,
	onClose,
	onFileChange,
	title,
	onTitleChange,
	description,
	onDescriptionChange,
	onUpload
}: uploadModalData) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* <div className="bg-white p-5 rounded shadow-lg relative"> */}
                <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
					<div className="bg-white p-5 rounded shadow-lg relative z-10">
						<button className="absolute top-0 right-0 m-2" onClick={onClose}>&times;</button>
							<form onSubmit={onUpload}>
							<input 
								type="file" 
								accept="image/*" 
								onChange={onFileChange} 
								className="border p-2 rounded w-full mb-2" 
							/>
							<input 
								type="text" 
								placeholder="Title" 
								value={title}
								onChange={(e) => onTitleChange(e.target.value)}
								className="border p-2 rounded w-full mb-2" 
							/>
							<textarea 
								placeholder="Description" 
								value={description}
								onChange={(e) => onDescriptionChange(e.target.value)}
								className="border p-2 rounded w-full mb-2"
							></textarea>
							<button 
								type="submit" 
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
							>
								Upload
							</button>
						</form>
					</div>
            </div>
        )
    );
};

export default UploadModal;