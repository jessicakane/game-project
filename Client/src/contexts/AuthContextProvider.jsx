import { createContext, useContext, useState } from 'react';
import { ScoreContext } from './ScoreContextProvider';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken || false);
  const storedUserName = localStorage.getItem('userName');
  const [userName, setUserName] = useState(storedUserName || false);
  const { userHighScore, setUserHighScore } = useContext(ScoreContext);
  const storedId = localStorage.getItem('userId');
  const [userId, setUserId] = useState(storedId || false);

  const signUserUp = async (userInfo, setSignupFormHolder) => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/users/signup',
        userInfo
      );
      if (res.data.ok) {
        setSignupFormHolder({
          username: '',
          email: '',
          password: '',
          rePassword: '',
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logUserIn = async (userInfo) => {
    console.log('logging user in');
    try {
      const res = await axios.post(
        'http://localhost:8080/api/users/login',
        userInfo
      );
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUserName(res.data.userName);
      localStorage.setItem('userName', res.data.userName);
      setUserHighScore(res.data.highScore);
      localStorage.setItem('highScore', res.data.highScore);
      setUserId(res.data.userId);
      localStorage.setItem('userId', res.data.userId);
      return res.data.token;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signUserUp,
        logUserIn,
        userId,
        token,
        userName,
      }}
    >
      {children}{' '}
    </AuthContext.Provider>
  );
};

export { AuthContext };
