import { useState, useEffect } from "react";
import axios from "axios";

const useGetImage = (imageId: any) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(`/api/uploadthing?slug=imageUploader`);
        setImage(data.fileUrl);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

  return { image, loading, error };
};

export default useGetImage;
