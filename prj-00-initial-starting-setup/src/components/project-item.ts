import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';
import { AutoBind } from '../decorators/autobind';
import { Component } from './base-components';

    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
        private project: Project;

        get persons() {
            if (this.project.people === 1) {
                return '1 person assinged';
            } else {
                return `${this.project.people} persons assigned`;
            }
        }

        constructor(hostId: string, project: Project) {
            super(
                'single-project',
                hostId,
                false,
                project.id
            );
            this.project = project;
            this.configure();
            this.renderContent();
        }

        @AutoBind
        dragStartHandler(event: DragEvent): void {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }

        dragEndHandler(event: DragEvent): void {
            event.dataTransfer!.clearData();
        }

        configure(): void {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }

        renderContent(): void {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.persons;
            this.element.querySelector('p')!.textContent = this.project.description;
        }

    }