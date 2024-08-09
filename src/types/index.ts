import { z } from "zod";
import { responseSchema } from "../schema/schema";

/* just the object from the array of response Schema */
export type BankResponse = z.infer<typeof responseSchema>[0];

export type Bank = BankResponse & {
    id:number;
    date: string
};