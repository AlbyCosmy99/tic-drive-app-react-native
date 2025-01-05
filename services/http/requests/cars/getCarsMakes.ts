import axiosClient from "../../axiosClient";

const getCarsMakes = async () => {
    try {
        const response = await axiosClient.get("cars/makes")
        return response.data
    } catch(error) {
        console.error('Error:', error)
    }
}

export default getCarsMakes