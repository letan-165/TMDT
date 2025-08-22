import axios from "axios";

const cloudName = "dmw3znlow";
const uploadPreset = "TMDT001";

const CloudinaryService = {
  upload: async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return res.data.secure_url as string;
    } catch (err) {
      console.error("Upload failed:", err);
      return null;
    }
  },
};

export default CloudinaryService;
