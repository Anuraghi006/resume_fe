import axiosService from "../api/axiosService";

export const addResumeAPI=async(resumeDetails)=>{
  
  return await axiosService('POST','/resumes',resumeDetails) 
}

export const viewResumeAPI=async(id)=>{
   return await axiosService('GET',`/resumes/${id}`,{}) 

}

export const getAllResumeAPI=async()=>{
  return await axiosService('GET',`/resumes`,{})
}
export const deleteResumeAPI=async(id)=>{
  return await axiosService('DELETE',`/resumes/${id}`)
}

export const updateResumeAPI=async(id,resumeDetails)=>{
  return await axiosService('PUT',`/resumes/${id}`,resumeDetails)
}
// downloaded resume to history
 export const addToHistoryResumeAPI=async(resumeDetails)=>{
  return await axiosService('POST',`/history`,resumeDetails)
 }
// download resume from history
 export const getAllHistoryResumeAPI=async(resumeDetails)=>{
  return await axiosService('GET',`/history`,resumeDetails)
 }

//  cloudinary
 export const uploadToCloudinary = async (imgData) => {

  const formData = new FormData();

  formData.append("file", imgData);

  formData.append(
    "upload_preset",
    "Resume_Builder"
  );

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/mvywp0s3/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  return response.json();
};

// delete resume from downloads
export const deleteDownloadedResumeAPI=async(id)=>{
  return await axiosService('DELETE',`/history/${id}`)
}