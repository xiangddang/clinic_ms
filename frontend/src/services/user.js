import axios from "axios";

class UserDataService {
  getUser(username) {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/${username}`);
  }

  updateUser(username, data) {
    return axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/user/${username}`,
      data
    );
  }

  async createUser(data) {
    try {
      console.log('Sending registration request:', data);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/register`,
        data
      );
      return response;
    } catch (error) {
      console.error('Error during user creation:', error);
      throw new Error('Failed to create user. Please try again.');
    }
  }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new UserDataService();
