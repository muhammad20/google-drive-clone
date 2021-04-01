import { ThunkAction } from "redux-thunk";
import { FileModel } from "../../../viewmodels/file.model";
import { RootState } from "../../store";
import { CREATE_FILE, FileAction, GET_SHARED_FILES, GET_SHARERS, GET_USER_FILES, UPLOAD_FILE } from "./files.interface";
import firebase from '../../../firebase/app-config';

export const getFiles = (uid: string, currentParentFolderPath: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        try {
            if (uid == null) return;
            const userFiles = await firebase.firestore().collection('/file').where("ownerId", "==", uid)
                .where("parentFolder", "==", currentParentFolderPath).get();
            let files: FileModel[] = [];
            userFiles.forEach(file => {
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
            dispatch({
                type: GET_USER_FILES,
                files: [],
                success: false
            });
        }
    }
}

export const shareFile = (uid: string, file: FileModel, sharedWithUID: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        const fileRef = await firebase.firestore().collection('/file').where("ownerId", "==", uid)
            .where("parentFolder", "==", file.parentDirName).where("name", "==", file.name).get();
        try {
            let sharerRef = await firebase.firestore().collection('/sharers').doc(uid).get();
            if(!sharerRef.exists) {
                await firebase.firestore().collection('/sharers').doc(uid).set({
                    sharedWith: sharedWithUID,
                    ownerName: firebase.auth().currentUser?.displayName
                });
            }
            fileRef.forEach(async ref => {
                await firebase.firestore().collection('/sharedFiles').add({
                    ownerId: uid,
                    sharedWithUID: sharedWithUID,
                    name: ref.data().name,
                    downloadURL: file.downloadURL == null ? "" : file.downloadURL,
                    path: `${firebase.auth().currentUser?.displayName}/${file.name}`,
                    parentFolder: `${firebase.auth().currentUser?.displayName}/`,
                    type: ref.data().type
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export const getSharers = (uid: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        let refs = await firebase.firestore().collection('/sharers').where("sharedWith", "==", uid).get();
        let sharersFolders: { ownerName: string, ownerId: string }[] = [];
        refs.forEach(ref => {
            sharersFolders.push({
                ownerName: ref.data().ownerName,
                ownerId: ref.id
            });
        });
        dispatch({
            type: GET_SHARERS,
            sharers: sharersFolders
        });
    }
}

export const getSharedFiles = (uid: string, ownerId: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        let refs = await firebase.firestore().collection('/sharedFiles').where("sharedWithUID", "==", uid).where("ownerId", "==", ownerId).get();
        let files: FileModel[] = [];
        refs.forEach(ref => {
            files.push(new FileModel(
                ownerId, ref.data().type, ref.data().name, ref.data().parentFolder, ref.data().path, ref.data().downloadURL
            ));
        });
        dispatch({
            type: GET_SHARED_FILES,
            sharedFiles: files
        })
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
            await firebase.firestore().collection('/file').add(
                {
                    ownerId: uid,
                    parentFolder: currentFolder,
                    name: file.name,
                    path: folderPath,
                    type: 1
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
            const initialPath = `/users/${user?.uid}/myFiles`;
            const totalPath = `${initialPath}${currentFolderPath}${file.name}`;
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(totalPath);
            await fileRef.put(file);
            const downloadURL = await fileRef.getDownloadURL();
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
                type: 0
            }
        );
    } catch (e) {
        console.log(e);
    }
}