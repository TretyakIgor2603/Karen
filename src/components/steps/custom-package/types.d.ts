export type Room = {
    value: number;
    label: string;
    is_public: boolean;
    icon_url: any,
    custom_label: string
}

export type Furniture = {
    icon_url: { url: null | string };
    is_public: boolean;
    label: string;
    value: number;
    style_design_categories_with_parent: FurnitureItem[];
}

export type FurnitureItem = {
    average_cost: string;
    icon_url: { url: null | string };
    is_backend: true;
    label: string;
    quantity: number;
    relation_id: number;
    remote_icon_url: string | null;
    value: number;
    variation: "essential" | "other" | "not_set";
    children: FurnitureItem[];
}

export type FilterFurniture = {
    label: string;
    category_room_id: number,
    essentials: FurnitureItem[];
    others: FurnitureItem[];
}

export type DesignStyle = {
    value: number;
    label: string;
    image_url: any;
    description: any;
    design_styles_colors: any;
    design_styles_rules: any;
    design_styles_textures: any;
};

export type DesignStyleRequest = {
    is_logged?: boolean;
    style_quiz?: boolean;
    design_styles?: DesignStyle[];
}

export type UserRegistration = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
    receive_email: boolean;
}
