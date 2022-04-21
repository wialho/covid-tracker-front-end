import feathersClient from "../Api";
import { User } from "../Models/User";

interface FeathersAuthInterface{ 
  email: string;
  password: string;
}

const feathersAuthProvider = {
    async signin(loginInfo: FeathersAuthInterface, callback:(user: User) => void) {
      const result = await feathersClient.authenticate({
        strategy: 'local',
        email: loginInfo.email,
        password: loginInfo.password
      });
      callback(result.user);
    },
    async signout(callback: VoidFunction) {
      await feathersClient.logout();
      callback();
    },
    async autoSignin(callback: (loginVal: any) => void){
      try 
      {
        const result = await feathersClient.reAuthenticate();
        callback(result.user);
      }
      catch{
        callback(null);
      }
    }
  };
  
  export { feathersAuthProvider };
  