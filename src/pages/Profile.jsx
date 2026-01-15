import {useEffect} from 'react';
import { useProfileStore } from "../store/profileStore..js";

export default function Profile() {
    const {getProfile} = useProfileStore()

    useEffect(() => {
        getProfile()
    },[])

    return (
        <h2>My profile</h2>
    );
}
