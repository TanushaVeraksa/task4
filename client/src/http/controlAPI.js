import { $authHost, $host } from "./index";
const TIMEOUT = 500;

export const getUsers = async () => {
    const {data} = await $host.get('api/control')
    return data;
}

export const deleteUser = async (email) => {
    await $host.post('api/control/delete', {email});
    setTimeout(() => {
        window.location.reload();
    }, TIMEOUT)
}

export const blockUser = async (email, authEmail) => {
    await $host.post('api/control/block', {email, authEmail});
}

export const unblockUser = async (email) => {
    await $host.post('api/control/unblock', {email});
}