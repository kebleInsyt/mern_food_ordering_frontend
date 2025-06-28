import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserProp = {
    auth0Id: string,
    email: string
}

type UpdateUserProp = {
    name: string,
    addressLine1: string,
    city: string,
    country: string
}


export const useCreateUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest =  async (user: CreateUserProp) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if(!response.ok) throw new Error("failed to create user");
    };

    const {
         mutateAsync: createUser,
         isPending,
         isError,
         isSuccess
     } = useMutation({ mutationFn: createMyUserRequest });

     return { createUser, isPending, isError, isSuccess};
}
export const useGetMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest =  async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });

        if(!response.ok) throw new Error("failed to fetch user");

        return response.json();
    };

    const {
         data: currentUser,
         isPending,
         isError
    } = useQuery({ queryKey: ['currentuser'], queryFn: getMyUserRequest });

     return { currentUser, isPending, isError};
}

export const useUpdateMyUser = () => {

    const { getAccessTokenSilently } = useAuth0();

    const updateMyUserRequest = async (formData: UpdateUserProp) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok) throw new Error("failed to update user");

        return response.json();
    };

    const {
         mutateAsync: updateUser,
         isPending,
         isSuccess,
         error,
         reset
     } = useMutation({ mutationFn: updateMyUserRequest });

     if(isSuccess) toast.success('User profile updated');

     if(error) {
        toast.error(error.toString());
        reset();
     }

     return { updateUser, isPending };
}