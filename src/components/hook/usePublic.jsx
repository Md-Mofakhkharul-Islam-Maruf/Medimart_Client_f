import axios from "axios";

const axiosPublic=axios.create({
    baseURL:'https://medimart-server-mu.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;