import axios from 'axios';
import { useEffect, useState } from 'react';

type userType = {
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  id: string;
  updated: string;
};

export const useUpdateUser = (email: string) => {
  // // console.log('USER EMAIL-', email)
  // const setDetails = useUserDetailsStore(
  //   (state: unknown) => (state as useUserDetailsType).setUserDetails
  // );
  const [userList, setUserList] = useState<userType[] | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/auth-custom');
        return response.data.record;
      } catch (error) {
        return error;
      }
    }
    fetchData().then((res) => setUserList(res));
  }, []);

  // if (userList && userList.length > 0) {
  //   let check = userList.filter(
  //     (user) => user.email === email
  //   );
  //   // console.log(check);

  //   if (check.length > 0) {
  //     return setDetails({ email: check[0].email, id: check[0].id })
  //   }
  // }
  return userList?.filter((user) => user.email === email)[0].id;
};
