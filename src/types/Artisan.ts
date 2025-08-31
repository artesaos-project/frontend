export type Artisan = {
    name: string;
    username: string;
    followers: number;
    products: number;
    profilePicture: string;
    description?: string;
    contactInfo?: string;
    isFollowing?: boolean;
    isShared?: boolean;
};