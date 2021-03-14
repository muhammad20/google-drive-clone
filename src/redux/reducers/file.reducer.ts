import { FileModel } from "../../services/viewmodels/file.model";
import { CREATE_FILE, DELETE_FILE, FileAction, GET_USER_FILES } from "../actions/files/files.interface";
import { IFileState } from "../states/file.state";

const initialState: IFileState = {
    currentFiles: [],
    currentFolderName: '',
    currentFolderPath: '/'
}

export const fileReducer = (prevState = initialState, action: FileAction): IFileState => {
    switch (action.type) {
        case GET_USER_FILES: {
            console.log(action.files);
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
        case DELETE_FILE: {
            let files = prevState.currentFiles;
            files = files.filter(file => file.name === action.filename);
            return {
                ...prevState,
                currentFiles: files
            }
        }
        // case SHARE_FILE: {

        // }
        default: return prevState;
    }
}