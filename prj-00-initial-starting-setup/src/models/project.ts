
// Project type
export enum ProjectStatus { Active, Finished }

export class Project {
    constructor(public id: string, public status: ProjectStatus, public title: string, public description: string, public people: number) { }
}


