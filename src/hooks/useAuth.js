import axiosClient from '../utils/axios';

const useAuth = async (userInfo, setUserInfo, setLoading) => {
  try {
    if (userInfo === null) {
      const { data } = await axiosClient.get('/checkLogIn');
      setUserInfo(data);
      setLoading(false);
    }
  } catch (error) {
    console.log('Logout user');
    setUserInfo(null);
    setLoading(false);
  }
};

export default useAuth;
