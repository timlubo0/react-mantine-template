import { useAuth } from "../hooks/auth";
import UserDetailsScreen from "./UserDetailsScreen";

function UserProfileScreen(){

    const { user } = useAuth();

    return <UserDetailsScreen user={user} />

}

export default UserProfileScreen;