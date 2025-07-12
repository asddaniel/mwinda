export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
     flash: {
        success?: string;
        error?: string;
    };
     activeBooking?: Booking;
};

export interface Booking {
    id: number;
    user_id: number;
    passenger_name: string;
    passenger_phone: string;
    start_address: string;
    destination_address: string;
    start_latitude: number;
    start_longitude: number;
    destination_latitude: number;
    destination_longitude: number;
    status: 'pending' | 'searching' | 'confirmed' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}
