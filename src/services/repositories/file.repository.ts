import app from '../../firebase/app-config';

const storageRef = app.storage().ref();

export const getUserFiles = () => {
    return null;
}

export const uploadFile = async (file: any) => {
    try {
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
    } catch(e) {
        console.log(e);
    }
}