import axios from 'axios' ;
const axiosInstance =  axios.create({
    baseURL: 'http://localhost:5001/api',
});
axiosInstance.interceptors.request.use(
    (config) => {
      // Retrieve access token from local storage
      const accessToken = localStorage.getItem('accessToken');
      // If token exists, add it to the request headers
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const loginapi = async (email, password ) =>{
    try{
       const response = await axiosInstance.post ('/users/login', email, password);
        if (response.status  == 200){
            console.log (response.data)
            localStorage.setItem('accessToken', response.data.accessToken);

            return response.data
        }
        else {
            console.log("login faild")

        }

    }
    catch(error){
        console.log('Error', error);
    }
};

//phvalue function 
export const getphapi = async (month) =>{
    try{
       const response = await axiosInstance.get (`/sensor/getphvalue/${month}`);
        if (response.status  == 200){
            console.log (response.data)
            return response.data
        }
        else {
            console.log("login faild")

        }

    }
    catch(error){
        console.log('Error', error);
    }
};
//temperature function 
export const gettemp = async (id) =>{
    try{
       const response = await axiosInstance.get ('/gettempvalue/${id}',);
        if (response.status  == 200){
            console.log (response.data)
            return response.data
        }
        else {
            console.log("login faild")

        }

    }
    catch(error){
        console.log('Error', error);
    }
};


//turbidity function 
export const getturb = async (id) =>{
    try{
       const response = await axiosInstance.get ('//getturbvalue/${id}',);
        if (response.status  == 200){
            console.log (response.data)
            return response.data
        }
        else {
            console.log("login faild")

        }

    }
    catch(error){
        console.log('Error', error);
    }
};



//dissolved oxygen function 
export const getoxygen = async (id) =>{
    try{
       const response = await axiosInstance.get ('/getoxygenvalue/${id}',);
        if (response.status  == 200){
            console.log (response.data)
            return response.data
        }
        else {
            console.log("login faild")

        }

    }
    catch(error){
        console.log('Error', error);
    }
};

//dissolved oxygen function 

export const getLastValues = async (id) => {
    try {
        console.log('Response:') // Log the entire response object

      const response = await axiosInstance.get(`/sensor/`);
      console.log('Response:', response); // Log the entire response object
  
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Failed to fetch data"); // Throw an error if response status is not 200
      }
    } catch (error) {
      console.log('Error', error);
      throw error; // Rethrow the error to be caught by the calling code
    }
  };


