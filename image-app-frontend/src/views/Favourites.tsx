import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import { asset } from '../utils/assets';
import { PhotoModel } from '../interfaces/project';

export default function Favourites() {
  const [images, setImages] = useState<PhotoModel[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await axiosClient.get('/images/favourites');
            setImages(response.data);
        } catch (error) {
            // Handle error
        }
    };

    fetchImages();
  }, []);

  const hasImages = Array.isArray(images) && images.length > 0;

  return (
	<>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {hasImages ? (images.map(image => (
        <div key={image.id} className="rounded overflow-hidden shadow-lg">
          <img 
            src={asset(image.path)}
            alt={image.title} 
            className="w-full h-48 object-cover" 
          />
          
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{image.title}</div>
            <p className="text-gray-700 text-base mb-4">
              {image.description}
            </p>
          </div>
        </div>
      ))) :
        (
          <div className="bg-gray-100 text-gray-500 text-center font-semibold rounded shadow-lg p-8">
            No Favourite images Added
          </div> 
        )
    }
      
    </div>
  </>
  )
}