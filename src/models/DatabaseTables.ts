export interface IDatabaseData {
    kids: IDbChild[];
    contacts: IDbContact[];
    entries: IDbEntry[];
}
export interface IDbChild {
    pk: number;
    newpk: string; //guid
    name: string;
    birthdate?: string;
    sex: number;
    heightCM?: string;
    weightKG?: string;
    head_circumferenceCM?: string;
    bloodtype?: string;
}

export interface IDbContact {
    pk: string;
    type: number;
    first_name?: string;
    last_name: string;
    doctor_specialty?: string;
    company_name?: string;
    phone1?: string;
    phone2?: string;
    street?: string;
    street2?: string;
    city?: string;
    zip?: string;
    state?: string;
    country?: string;
    notes?: string;
}

export interface IDbEntry {
    pk: string;
    child_id: number;
    dateInteger: number;
    start_time: string;
    type: number;
    extraType?: number;
    title?: string;
    notes?: string;
    image_thumbnail?: number;
    image_saved_date?: string;
    audio_length?: string;
    audio_saved_date?: string;
    contact_id?: string;
    weightKG?: string;
    heightCM?: string;
    headCM?: string;
    other_txt?: string;
    other_int?: number;
    entry_locked?: number;
    birth_record?: number;
    imageFile: string|null;
    thumbnailFile: string|null;
}
