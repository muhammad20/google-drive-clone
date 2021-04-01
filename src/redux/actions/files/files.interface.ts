import { FileModel } from "../../../viewmodels/file.model";
import { ISharer } from "../../states/file.state";

export const CREATE_FILE = 'CREATE_FILE';
export const SHARE_FILE = 'SHARE_FILE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const GET_USER_FILES = 'GET_USER_FILES';
export const CHANGE_CURRENT_FOLDER = 'CHANGE_CURRENT_FOLDER';
export const CHANGE_SCOPE = 'CHANGE_SCOPE';
export const GET_SHARED_FILES = 'GET_SHARED_FILES';
export const GET_SHARERS = 'GET_SHARERS';

interface ICreateFile {
    type: typeof CREATE_FILE,
    filename: string,
    parentFolder: string,
    uid: string,
    filetype: number,
    path: string,
    success: boolean
}

interface IChangeCurrentFolder {
    type: typeof CHANGE_CURRENT_FOLDER,
    folderPath: string,
    folderName: string
}

interface IGetSharers {
    type: typeof GET_SHARERS
    sharers: ISharer[] 
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
interface IChangeScope {
    type: typeof CHANGE_SCOPE
}

interface IGetUserFiles {
    type: typeof GET_USER_FILES,
    files: FileModel[],
    success: boolean,
}

interface IGetSharedFiles {
    type: typeof GET_SHARED_FILES,
    sharedFiles: FileModel[]
}

interface IShareFile {
    type: typeof SHARE_FILE,
    ownerUID: string,
    sharedToUID: string[],
    filename: string
}

export type FileAction = ICreateFile | IUploadFile | IShareFile | IGetUserFiles | IChangeCurrentFolder | IChangeScope | IGetSharedFiles | IGetSharers; 