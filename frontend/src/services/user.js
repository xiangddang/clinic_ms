import axios from 'axios';

class UserDataService {
    getUser(username) {
        return axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user/${username}`
        );
      }

    updateUser(username, data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/user/${username}`,
            data
        );
    }

    createUser(data) {
        return axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/user/register`,
            data
        );
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new UserDataService();