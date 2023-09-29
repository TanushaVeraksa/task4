import { $authHost, $host } from "./index";

export const getUsers = async () => {
    const {data} = await $host.get('api/control')
    return data;
}

export const deleteUser = async (email) => {
    await $host.post('api/control/delete', {email});
    window.location.reload();
}

export const blockUser = async (email, authEmail) => {
    await $host.post('api/control/block', {email, authEmail});
}

export const unblockUser = async (email) => {
    await $host.post('api/control/unblock', {email});
}