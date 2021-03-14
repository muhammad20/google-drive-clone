export class FileModel {
    constructor(
        public uid: string,
        public type: number,
        public name: string,
        public parentDirName: string,
        public path: string,
        public modifiedAt?: Date,
        public createdAt?: Date,
    ) {}
}