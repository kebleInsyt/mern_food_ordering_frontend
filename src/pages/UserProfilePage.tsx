import { useGetMyUser, useUpdateMyUser } from '@/api_integrations/MyUserApi';
import UserProfileform from '@/forms/user_profile_form/UserProfileForm';


const UserProfilePage = () => {
    const {currentUser, isPending: isGetLoading} = useGetMyUser();
    const {updateUser, isPending: isUpdateLoading} = useUpdateMyUser();
    
  if (isGetLoading) return <span className="flex justify-center">Loading...</span>;

  if(!currentUser) return <span className="flex justify-center">Unable to load user profile</span>;

  return (
    <UserProfileform 
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isUpdateLoading}
    /> 
  )
}

export default UserProfilePage