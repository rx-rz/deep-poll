export type Survey = {
    userId: string | null;
    title: string;
    description: string | null;
    requiresSignIn: boolean;
    showProgressBar: boolean;
    showLinkToSubmitAnother: boolean;
    isPublished: boolean;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}