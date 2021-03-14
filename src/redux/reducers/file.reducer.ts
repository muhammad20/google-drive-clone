import { FileModel } from "../../viewmodels/file.model";
import { CHANGE_CURRENT_FOLDER, CREATE_FILE, FileAction, GET_USER_FILES, UPLOAD_FILE } from "../actions/files/files.interface";
import { IFileState } from "../states/file.state";

const initialState: IFileState = {
    currentFiles: [],
    currentParentFolderName: '',
    currentParentFolderPath: '/'
}

export const fileReducer = (prevState = initialState, action: FileAction): IFileState => {
    switch (action.type) {
        case GET_USER_FILES: {
            return {
                ...prevState,
                currentFiles: action.files,
            }
        }
        case CREATE_FILE: {
            let files = prevState.currentFiles;
            let file = new FileModel(action.uid, action.filetype, action.filename, action.parentFolder, action.path);
            files.push(file);
            return {
                ...prevState,
                currentFiles: files
            }
        }
        case CHANGE_CURRENT_FOLDER: {
            return {
                ...prevState,
                currentParentFolderName: action.folderName,
                currentParentFolderPath: action.folderPath
            }
        }
        case UPLOAD_FILE: {
            let files = prevState.currentFiles;
            let file = new FileModel(action.uid, 0, action.filename, action.parentFolder, action.path);
            files.push(file);
            return {
                ...prevState,
                currentFiles: files
            }
        }
        default: return prevState;
    }
}