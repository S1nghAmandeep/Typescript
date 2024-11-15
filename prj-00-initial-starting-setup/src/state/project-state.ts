import { Project, ProjectStatus } from "../models/project";

    type Listner<T> = (items: T[]) => void;

    class State<T> {
        protected listeners: Listner<T>[] = [];

        addListener(listenerFn: Listner<T>) {
            this.listeners.push(listenerFn);
        }

    }

    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }
        addProject(title: string, description: string, numOfPeople: number) {
            const newProject = new Project(
                Math.random().toString(),
                ProjectStatus.Active,
                title,
                description,
                numOfPeople
            );
            this.projects.push(newProject);
            this.updateListners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListners();
            }
        }

        private updateListners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }

        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

    }

    export const projectState = ProjectState.getInstance();