import { FileModel } from "../../../services/viewmodels/file.model";

export const CREATE_FILE = 'CREATE_FILE';
// export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const SHARE_FILE = 'SHARE_FILE';
export const GET_USER_FILES = 'GET_USER_FILES';

interface ICreateFile {
    type: typeof CREATE_FILE,
    filename: string,
    parentFolder: string,
    uid: string,
    filetype: number,
    path: string,
    success: boolean
}

// interface IDownloadFile {
//     type: typeof DOWNLOAD_FILE,
//     success: boolean
// }

interface IGetUserFiles {
    type: typeof GET_USER_FILES,
    files: FileModel[],
    success: boolean
}

interface IDeleteFile {
    type: typeof DELETE_FILE,
    filename: string
}

interface IShareFile {
    type: typeof SHARE_FILE,
    ownerUID: string,
    sharedToUID: string[],
    filename: string
}

export type FileAction = ICreateFile | IDeleteFile | IShareFile | IGetUserFiles; 