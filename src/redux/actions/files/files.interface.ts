import { FileModel } from "../../../viewmodels/file.model";

export const CREATE_FILE = 'CREATE_FILE';
// export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
// export const DELETE_FILE = 'DELETE_FILE';
export const SHARE_FILE = 'SHARE_FILE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const GET_USER_FILES = 'GET_USER_FILES';
export const CHANGE_CURRENT_FOLDER = 'CHANGE_CURRENT_FOLDER';

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

interface IChangeCurrentFolder {
    type: typeof CHANGE_CURRENT_FOLDER,
    folderPath: string,
    folderName: string
}

interface IUploadFile {
    type: typeof UPLOAD_FILE,
    filename: string,
    parentFolderPath: string,
    success: boolean,
    uid: string,
    path: string,
    downloadURL: string
}

interface IGetUserFiles {
    type: typeof GET_USER_FILES,
    files: FileModel[],
    success: boolean
}

// interface IDeleteFile {
//     type: typeof DELETE_FILE,
//     filename: string
// }

interface IShareFile {
    type: typeof SHARE_FILE,
    ownerUID: string,
    sharedToUID: string[],
    filename: string
}

export type FileAction = ICreateFile | IUploadFile | IShareFile | IGetUserFiles | IChangeCurrentFolder; 