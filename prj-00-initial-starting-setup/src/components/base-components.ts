
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;
        insertAtStart: boolean;
        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild! as U;
            this.insertAtStart = insertAtStart;
            if (newElementId) this.element.id = newElementId;

            this.attach(insertAtStart);

        }

        protected attach(insertAtStart: boolean) {
            this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
        }

        abstract configure?(): void;
        abstract renderContent(): void;
    }