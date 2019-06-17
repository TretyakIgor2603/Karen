export type UserRegistration = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    receive_email: boolean;
}

export type UserLogin = {
    email: string;
    password: string;
    remember_me: 0;
}

export type User = {
    admin: boolean;
    authentication_token: string;
    authentication_token_id: any;
    created_at: string;
    email_address: string;
    facebook: any;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
    photo: any;
    profile: null;
    receive_email: boolean;
    twitter: any;
    updated_at: string;
    url_photo: any;
}

