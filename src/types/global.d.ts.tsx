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
    updated_at: string
  }

  interface Notebook {
    id: string
    title?: string
    description?: string
    owner?: PartialUser
    pages?: Page[]
    updated_at: string
    collaborators: PartialUser[]
  }

  interface Parent {
    pages: Page[]
    notebooks: Notebook[]
  }
}
