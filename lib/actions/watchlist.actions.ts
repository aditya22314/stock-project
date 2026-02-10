"use server";

import { connectToDatabase } from "@/database/mongoose";
import Watchlist from "@/database/models/watchlist.model";

export const getWatchlistSymbolsByEmail = async (email: string): Promise<string[]> => {
    if (!email) return [];

    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        
        if (!db) {
            throw new Error("Database connection not found");
        }

        // 1. Find the user by email to get their ID
        const user = await db.collection("user").findOne({ email });

        if (!user) {
            console.warn(`User not found for email: ${email}`);
            return [];
        }

        const userId = user.id || user._id.toString();

        // 2. Find watchlist items for this user
        const watchlistItems = await Watchlist.find({ userId }).select("symbol");

        // 3. Extract symbols strings
        return watchlistItems.map((item) => item.symbol);

    } catch (error) {
        console.error("Error fetching watchlist symbols:", error);
        return [];
    }
};
