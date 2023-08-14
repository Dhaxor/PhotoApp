import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { PhotoModel } from '../interfaces/project';
import { asset } from '../utils/assets';
import { formatDate } from '../utils/formatDate';
import toast from 'react-hot-toast';

export default function Photos() {
	const [photo, setPhoto] = useState<PhotoModel | null>(null);

    const { id } = useParams(); 

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await axiosClient.get(`/images/${id}`);
                setPhoto(response.data);
            } catch (error) {
                console.error("Error fetching photo:", error);
            }
        };

        fetchPhoto();
    }, [id]);

	const AddFavourite = async (id: number) => {
		const toastId = toast.loading('Loading.....')
		axiosClient.post(`/images/${id}/favourites`)
			.then(() => {
				toast.success('Added to favourites', {id: toastId})
			}).catch((error) => {
				toast.error(error.response.data.message, {id: toastId});
			})
	}

  return (
	<>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		
		{photo && (
			<div key={photo.id} className="rounded overflow-hidden shadow-lg">
			<img 
				src={asset(photo.path)}
				alt={photo.title} 
				className="w-full h-48 object-cover" 
			/>
			
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">Title: {photo.title}</div>
				<p className="text-gray-700 text-base mb-4">
					Description: {photo.description}
				</p>
				<p className='text-gray-700 text-base mb-4'> created At: { formatDate(photo.created_at) }</p>
				<button
				onClick={() => AddFavourite(photo.id)}
				className={`bg-indigo-500 text-white font-bold py-2 px-4 rounded block w-full 'hover:bg-indigo-600'`}>
				Add Favorite
				</button>
			</div>
			</div>
		)}
		
		</div>
	</>
  )
}