import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3006/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getHousehold = async (): Promise<{ any: [] }> => {
  const response = await api.get("/household");
  return response.data;
};

const HouseholdService = {
  getHousehold,
};


export default HouseholdService