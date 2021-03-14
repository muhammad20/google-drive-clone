import { FileModel } from "../../viewmodels/file.model";

// the current files being populated in the view
export interface IFileState {
    currentFiles: FileModel[],
    currentParentFolderPath: string,
    currentParentFolderName: string
}