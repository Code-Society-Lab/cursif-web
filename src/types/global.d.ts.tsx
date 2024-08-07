// Desc: Global types for the Cursif
export { };

declare global {
  interface AuthContextType {
    user: User | null;
  }
  
  interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    profilePicture: string
  }

  interface PartialUser {
    id: string
    username: string
  }

  interface Page {
    id: string
    title: string
    content: string
    parentId?: number
    parentType?: string
    parent: Parent
    children: Page[]
    updatedAt: string
  }

  interface Collaborator {
    id: string
    notebookId: string
    userId: string
    email: string
    username: string
  }

  interface Notebook {
    id: string
    title?: string
    description?: string
    owner?: PartialUser
    pages?: Page[]
    updatedAt: string
    collaborators: Collaborator[]
  }

  interface Parent {
    pages: Page[]
    notebooks: Notebook[]
  }
}
