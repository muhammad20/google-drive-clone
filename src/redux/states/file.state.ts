import { FileModel } from "../../viewmodels/file.model";

// the current files being populated in the view

export enum CurrentScope {
    MY_FILES,
    SHARED_WITH_ME,
    SHARERS
}

export interface ISharer {
    ownerId: string,
    ownerName: string
}

export interface IFileState {
    currentFiles: FileModel[],
    currentParentFolderPath: string,
    currentParentFolderName: string,
    currentScope: CurrentScope,
    currentSharerId?: string,
    currentSharers: ISharer[]
    currentSharedParentFolderPath?: string
}