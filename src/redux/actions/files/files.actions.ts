import { ThunkAction } from "redux-thunk";
import { FileModel } from "../../../viewmodels/file.model";
import { RootState } from "../../store";
import { CREATE_FILE, FileAction, GET_USER_FILES, UPLOAD_FILE } from "./files.interface";
import firebase from '../../../firebase/app-config';

export const getFiles = (uid: string, currentParentFolderPath: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        try {
            if (uid == null) return;
            const userFiles = await firebase.firestore().collection('/file').where("ownerId", "==", uid)
                .where("parentFolder", "==", currentParentFolderPath).get();
            let files: FileModel[] = [];
            userFiles.forEach(file => {
                console.log(file.data())
                files.push(
                    new FileModel(
                        uid,
                        file.data().type,
                        file.data().name,
                        file.data().parentFolder,
                        file.data().path,
                        file.data().downloadURL
                    )
                )
            });
            dispatch({
                type: GET_USER_FILES,
                files: files,
                success: true
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: GET_USER_FILES,
                files: [],
                success: false
            });
        }
    }
}

export const createFolder = (file: FileModel, currentFiles: FileModel[], currentFolder: string): ThunkAction<void, RootState, null, FileAction> => {
    let filenameIsAvailable = true;
    currentFiles.forEach(currentFile => {
        if (currentFile.name === file.name && currentFile.path === file.path) {
            filenameIsAvailable = false;
        }
    });
    return async dispatch => {
        if (!filenameIsAvailable) {
            return;
        }
        const uid = firebase.auth().currentUser?.uid;
        if (uid == null) {
            return;
        }
        try {
            let folderPath = `${currentFolder}${file.name}`;
            console.log(file.name);
            await firebase.firestore().collection('/file').add(
                {
                    ownerId: uid,
                    parentFolder: currentFolder,
                    name: file.name,
                    path: folderPath,
                    type: 1,
                    shaerdWith: []
                }
            );
            dispatch({
                type: CREATE_FILE,
                filetype: 1,
                filename: file.name,
                parentFolder: file.parentDirName,
                success: true,
                uid: uid,
                path: file.path
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export const uploadFile = (file: any, currentFolderPath: string): ThunkAction<void, RootState, null, FileAction> => {
    let user = firebase.auth().currentUser;
    return async dispatch => {
        if (user == null || file.name == null) return;
        try {
            const initialPath = `/users/${user?.uid}/`;
            const totalPath = `${initialPath}${currentFolderPath}${file.name}`;
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(totalPath);
            console.log(file);
            const uploadTask = await fileRef.put(file);
            console.log(uploadTask.bytesTransferred);
            const downloadURL = await fileRef.getDownloadURL();
            console.log(downloadURL);
            const fileToBeSavedInDb = new FileModel(user.uid, 0, file.name, currentFolderPath, totalPath, downloadURL);
            await saveFileInfoToDb(fileToBeSavedInDb, currentFolderPath);
            dispatch({
                downloadURL: downloadURL,
                type: UPLOAD_FILE,
                filename: file.name,
                success: true,
                uid: user.uid,
                path: totalPath,
                parentFolderPath: currentFolderPath
            })
        } catch (e) {
            console.log(e);
        }
    }
}

const saveFileInfoToDb = async (file: FileModel, currentParentFolderPath: string) => {
    const uid = firebase.auth().currentUser?.uid;
    if (uid == null) {
        return;
    }
    try {
        await firebase.firestore().collection('/file').add(
            {
                downloadURL: file.downloadURL,
                name: file.name,
                path: file.path,
                parentFolder: currentParentFolderPath,
                ownerId: uid,
                type: 0,
                sharedWith: []
            }
        );
    } catch(e) {
        console.log(e);
    }
}