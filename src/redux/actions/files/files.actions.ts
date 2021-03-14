import { ThunkAction } from "redux-thunk";
import { FileModel } from "../../../services/viewmodels/file.model";
import { RootState } from "../../store";
import { CREATE_FILE, FileAction, GET_USER_FILES } from "./files.interface";
import firebase from '../../../firebase/app-config';

export const getUserFilesOnLogin = (uid: string): ThunkAction<void, RootState, null, FileAction> => {
    return async dispatch => {
        try {
            if (uid == null) return;
            console.log(uid);
            const userFiles = await firebase.firestore().collection('/file').where("ownerId", "==", uid).get();
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