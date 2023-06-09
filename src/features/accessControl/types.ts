export interface IRole{
    id?: string;
    uid?: string;
    name: string;
    slug?: string;
    description?: string;
    permissions?: IPermission[]
}

export interface IPermission{
    id?: string;
    uid?: string;
    feature: IFeature;
    role: IRole;
    canCreate: boolean;
    canRead: boolean;
    canUpdate: boolean;
    canDelete: boolean;
}

export interface IFeature{
    id?: string;
    uid?: string;
    name: string;
    description: string;
    slug: string;
    icon?: string;
    url?: string;
    subFeatures?: IFeature[]
}