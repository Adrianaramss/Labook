export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public getContent(): string {
        return this.content
    }

    public setContent(newContent: string): void {
        this.content = newContent
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(newLikes: number): void {
        this.likes = newLikes
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(newDislikes: number): void {
        this.dislikes = newDislikes
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(newCreatedAt: string): void {
        this.createdAt = newCreatedAt
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(newUpdatedAt: string): void {
        this.updatedAt = newUpdatedAt
    }
}