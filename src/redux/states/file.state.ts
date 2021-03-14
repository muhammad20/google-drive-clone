import { FileModel } from "../../services/viewmodels/file.model";

// the current files being populated in the view
export interface IFileState {
    currentFiles: FileModel[],
    currentFolderPath: string,
    currentFolderName: string
}